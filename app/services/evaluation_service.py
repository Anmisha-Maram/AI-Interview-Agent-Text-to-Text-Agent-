
import json
from app.services.llm_service import get_llm


def evaluate_answer(question: str, skill: str, answer: str):
    llm = get_llm()

    prompt = f"""
You are an AI technical interviewer.

Evaluate the candidate's answer.

Return valid JSON only.
Do not use markdown.
Do not wrap the JSON in backticks.
Use exactly this schema:
{{
  "score": 0,
  "feedback": "string",
  "follow_up_needed": true
}}

Question: {question}
Skill: {skill}
Candidate Answer: {answer}
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
    