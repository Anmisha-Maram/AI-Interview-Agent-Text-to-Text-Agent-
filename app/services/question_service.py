import json
from app.services.llm_service import get_llm


def generate_questions(candidate_skills, required_skills, gap_map):
    llm = get_llm()

    prompt = f"""
You are an AI technical interviewer.

Generate 5 personalized interview questions based on:
- candidate skills
- required job skills
- skill gap map

Prioritize missing skills first, then present skills.

Return valid JSON only.
Do not use markdown.
Do not wrap the JSON in backticks.
Do not add explanation.
Use exactly this schema:
{{
  "questions": [
    {{
      "question": "string",
      "skill": "string"
    }}
  ]
}}

Candidate Skills: {candidate_skills}
Required Skills: {required_skills}
Gap Map: {gap_map}
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