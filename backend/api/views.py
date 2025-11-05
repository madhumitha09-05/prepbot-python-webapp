from rest_framework.decorators import api_view
from rest_framework.response import Response
import os
import requests
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

HF_API_URL = "https://router.huggingface.co/v1/chat/completions"
HF_API_KEY = os.getenv("HF_API_KEY")

@api_view(['POST'])
def generate_questions(request):
    """
    Takes a job title or job description and returns AI-generated interview Q&A
    using the Hugging Face chat-completion API.
    """
    user_input = request.data.get("job_description", "").strip()
    question_type = request.data.get("question_type", "Both").strip()

    if not user_input:
        return Response({"error": "Please provide a job title or description."}, status=400)

    # Add dynamic focus depending on selection
    if question_type.lower() == "technical":
        focus = (
            "Focus only on *technical* interview questions "
            "that test coding, frameworks, design patterns, or technical skills related to the job."
        )
    elif question_type.lower() == "behavioral":
        focus = (
            "Focus only on *behavioral* or *HR-style* questions "
            "that explore teamwork, leadership, problem-solving, communication, and adaptability."
        )
    else:
        focus = (
            "Include a balanced mix of both *technical* and *behavioral* questions "
            "to give a well-rounded interview experience."
        )

    # System message combines your original + dynamic focus
    system_prompt = (
        "You are an expert HR interviewer. Generate 5 to 10 likely interview questions "
        "with strong sample answers. Keep it ATS-friendly and professional. "
        f"{focus} "
        "Only answer questions related to interview preparation. "
        "If the user asks about anything else, respond politely: "
        "\"I'm sorry, I can only help with interview questions.\""
    )

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"Job Description / Title:\n{user_input}"}
    ]

    payload = {
        "model": "mistralai/Mistral-7B-Instruct-v0.2:featherless-ai",
        "messages": messages,
        "temperature": 0.7,
        "max_new_tokens": 400
    }

    headers = {
        "Authorization": f"Bearer {HF_API_KEY}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(HF_API_URL, headers=headers, json=payload, timeout=60)
        try:
            data = response.json()
        except Exception:
            return Response({"error": "Non-JSON response from Hugging Face", "raw": response.text}, status=500)

        ai_text = data.get("choices", [{}])[0].get("message", {}).get("content", "")
        if not ai_text:
            ai_text = "No response from model. Please try again."

        return Response({"response": ai_text})

    except requests.exceptions.RequestException as e:
        return Response({"error": f"Request failed: {str(e)}"}, status=500)
