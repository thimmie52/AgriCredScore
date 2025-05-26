from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import sys
from google import genai
from google.genai import types
from google.genai.types import Part
import os
from dotenv import load_dotenv
from tools import weather_tool

# Load API key and environment variables
load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

# Init Google GenAI client
client = genai.Client(api_key=api_key)
from prompts.prompts import instruction_str


# Load PDF files only once at startup
def load_pdf_parts():
    pdf_parts = []
    pdf_files = [
        "data/DefaultRiskAnalysisofSmallScaleAgriculturalLoanSchemeinNigeria.pdf",
        "data/ajol-file-journals_16_articles_125504_submission_proof_125504-181-341943-1-10-20151111.pdf",
        "data/ssrn-4773497.pdf"
    ]
    for file_path in pdf_files:
        with open(file_path, "rb") as f:
            data = f.read()
            part = Part.from_bytes(data=data, mime_type="application/pdf")
            pdf_parts.append(part)
    return pdf_parts

pdf_parts = load_pdf_parts()

# FastAPI app
app = FastAPI()

# CORS (optional for frontend requests)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Define a function that the model can call to control smart lights
check_weather_condition = {
    "name": "weather_condition",
    "description": "Gets the weather condition of states in Nigeria",
    "parameters": {
        "type": "object",
        "properties": {
            "location": {
                "type": "string",
                "description": "The state in which you want to find the weather conditions",
            },
            
        },
        "required": ["location"],
    },
}

# Generation Config with Function Declaration
tools = types.Tool(function_declarations=[check_weather_condition])
config = types.GenerateContentConfig(tools=[tools], system_instruction=instruction_str)
chat = client.chats.create(model="gemini-2.0-flash", config=config)



# Request model
class MessageInput(BaseModel):
    message: str
    profile: dict

# Route to handle chat
@app.post("/chat")
async def chat_with_bot(payload: MessageInput):
    user_input = payload.message
    user_profile = payload.profile

    if user_input.lower() in ["exit", "quit"]:
        return {"response": "Exiting chat..."}

    # Convert profile dict to readable text
    profile_text = f"User Profile: {user_profile}"
    combined_input = f"{user_input}\n\n{profile_text}"

    # Send message to Gemini with PDFs + profile + message
    response = chat.send_message([*pdf_parts, combined_input])

    # Optional tool function handling
    if response.function_calls:
        for func_call in response.function_calls:
            print(f"📦 Tool Function Detected: {func_call.name}")
            print("Arguments:", func_call.args)

            if func_call.name == "weather_condition":
                result = weather_tool(**func_call.args)
                function_response_part = Part.from_function_response(
                        name=func_call.name,
                        response=result
                    )
                response = chat.send_message(function_response_part, config=config)


    return {"response": response.text}