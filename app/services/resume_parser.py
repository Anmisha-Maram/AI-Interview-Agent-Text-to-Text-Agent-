
import json
from app.services.llm_service import get_llm


def parse_resume_text(resume_text: str):
    llm = get_llm()

    prompt = f"""
You are an information extraction system.

Extract details from the resume below.

Return valid JSON only.
Do not use markdown.
Do not add explanation.
Use exactly this schema:
{{
  "name": "string",
  "skills": ["string"],
  "projects": ["string"],
  "education": ["string"]
}}

Resume:
{resume_text}
"""

    response = llm.invoke(prompt)
    content = response.content.strip()

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        raise ValueError(f"Model did not return valid JSON. Raw output: {content}")