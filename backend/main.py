from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import requests
import uuid
import re  # To detect options A, B, C

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5173", "https://67e00b1bfa57693ffb1a10ec--magical-squirrel-c50b5b.netlify.app"],  # Adjust if needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Command(BaseModel):
    command: str

# Set up Gemini API Key
GEMINI_API_KEY = "AIzaSyC0D0ggzyoAhBBAp4hyZQ7QDTY1fOtOPZc"  # Replace with your actual API key
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={GEMINI_API_KEY}"

# Store game sessions
game_sessions = {}

@app.get("/new_session/")
async def new_session():
    session_id = str(uuid.uuid4()) 
    game_sessions[session_id] = {
        "history": [
            {"role": "system", "content": "You are an AI text adventure game. The player types commands, and you narrate dynamically with some humor and simple English. Always ask a question to guide the game and provide three options in the format: <A> Option 1, <B> Option 2, <C> Option 3. Also provide dangerous options that reduces players health and only response with the following format 'Health -40'. Only decrease health when dangerous option is selected. Also add emojis to response. "},
            {"role": "assistant", "content": "Welcome to the adventure! You find yourself in a dark cave. A path leads left and right. What do you do? \n\n<A> Go left\n<B> Go right\n<C> Stay still"}
        ],
        "health": 100  # Player starts with 100 health
    }
    return {"session_id": session_id, "response": game_sessions[session_id]["history"][-1]["content"], "health": 100, "options": extract_options(game_sessions[session_id]["history"][-1]["content"])}

def extract_options(text):
    """Extracts A, B, C options from AI response."""
    pattern = r"<([A-C])>\s*(.*?)\n"
    matches = re.findall(pattern, text)
    return [{"key": match[0], "text": match[1]} for match in matches]

def extract_health_change(text):
    """Extracts health change from AI response like 'Health -10'"""
    match = re.search(r"Health\s*-\s*(\d+)", text)  # Match "Health -10" format
    if match:
        return -int(match.group(1))  # Return negative value for health reduction
    return 0  # No change if no match found


@app.post("/play/")
async def play(command: Command, session_id: str):
    try:
        if session_id not in game_sessions:
            return {"error": "Invalid session ID. Start a new game."}

        session = game_sessions[session_id]
        history = session["history"]
        health = session["health"]

        # Add player input to history
        history.append({"role": "user", "content": command.command})

        # Send request to Gemini API
        payload = {
            "contents": [{"parts": [{"text": "\n".join([msg['content'] for msg in history])}]}]
        }

        headers = {"Content-Type": "application/json"}
        response = requests.post(GEMINI_URL, json=payload, headers=headers)

        # Parse response
        result = response.json()
        ai_response = result.get("candidates", [{}])[0].get("content", {}).get("parts", [{}])[0].get("text", "I don't understand that action.")

        # Store AI response
        history.append({"role": "assistant", "content": ai_response})

        # Extract options from AI response
        options = extract_options(ai_response)

        # **NEW: Extract health change from AI response**
        health_change = extract_health_change(ai_response)
        if health_change:
            session["health"] = max(0, session["health"] + health_change)

        # Add health update to response
        if health_change:
            ai_response += f" Your health is now {session['health']}."

        # Check if player has lost all health
        if session["health"] <= 0:
            ai_response += " You have perished in your adventure. Game over!"

        return {"response": ai_response, "health": session["health"], "options": options}

    except Exception as e:
        return {"error": str(e)}
