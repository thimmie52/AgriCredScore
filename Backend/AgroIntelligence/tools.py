import requests

def weather_tool(location: str) -> dict[str]:
    """Gets the current weather of a state.

    Args:
        Location: A pick from the different states in Nigeria 
       

    Returns:
        A dictionary containing the weather conditions of said state
    """
    api_key = "f85c963d90dc4bfd904225900252605"



    # Construct the API URL
    url = f"http://api.weatherapi.com/v1/current.json?key={api_key}&q={location}"

    # Make the request
    response = requests.get(url)

    # Check if the request was successful
    if response.status_code == 200:
        data = response.json()
        return data
    else:
        return data

