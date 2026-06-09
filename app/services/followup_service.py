import json
from app.services.llm_service import get_llm


def generate_follow_up_question(question: str, skill: str, answer: str, feedback: str):
    llm = get_llm()

    prompt = f"""
You are an AI technical interviewer.

Generate one follow-up interview question based on the original question, candidate answer, and feedback.

Return valid JSON only.
Do not use markdown.
Do not wrap the JSON in backticks.
Use exactly this schema:
{{
  "follow_up_question": "string"
}}

Original Question: {question}
Skill: {skill}
Candidate Answer: {answer}
Feedback: {feedback}
"""

    response = llm.invoke(prompt)
    content = response.content.strip()

    if content.startswith("```json"):
        content = content.removeprefix("```json").strip()
    if content.startswith("```"):
        content = content.removeprefix("```").strip()
    if content.endswith("```"):
        content = content.removesuffix("```").strip()

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        raise ValueError(f"Model did not return valid JSON. Raw output: {content}")