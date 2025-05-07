import sys
from google import genai
from google.genai import types
from google.genai.types import FunctionDeclaration, GenerateContentConfig, Tool
import os
from dotenv import load_dotenv
from prompts.prompts import instruction_str
from google.genai.types import Content, Part
from pypdf import PdfReader
import pathlib
import httpx

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")

client = genai.Client(api_key=api_key)
config = types.GenerateContentConfig(system_instruction=instruction_str)
chat = client.chats.create(model="gemini-2.0-flash", config=config)




#my_file = client.files.upload(file="data/DefaultRiskAnalysisofSmallScaleAgriculturalLoanSchemeinNigeria.pdf")
with open("data/DefaultRiskAnalysisofSmallScaleAgriculturalLoanSchemeinNigeria.pdf", "rb") as f:
    pdf_data1 = f.read()
filepath1 = Part.from_bytes(
        data=pdf_data1,
        mime_type='application/pdf')

with open("data/ajol-file-journals_16_articles_125504_submission_proof_125504-181-341943-1-10-20151111.pdf", "rb") as f:
    pdf_data2 = f.read()
filepath2 = Part.from_bytes(
        data=pdf_data2,
        mime_type='application/pdf')

with open("data/ssrn-4773497.pdf", "rb") as f:
    pdf_data3 = f.read()
filepath3 = Part.from_bytes(
        data=pdf_data3,
        mime_type='application/pdf')

print("💬 AgroIntellect Chat (type 'exit' to quit)\n")
while True:
    user_input = input("You: ")

    if user_input.lower() in ['exit', 'quit']:
        print("Exiting chat...")
        break

    # Send user message to Gemini
    response = chat.send_message([filepath1,filepath2, filepath3, user_input])

    # If Gemini wants to call a function
    if response.function_calls:
        for func_call in response.function_calls:
            print(f"📦 Tool Function Detected: {func_call.name}")
            print("Arguments:", func_call.args)

            if func_call.name == "get_loan":
                # Call your Python tool
                continue

                # Create the Part from the tool result
                function_response_part = Part.from_function_response(
                    name=func_call.name,
                    response=result
                )

                response = chat.send_message(function_response_part, config=config)

    # Print Gemini's final response
    print("AgroIntelligence:", response.text)

    