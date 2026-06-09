
import json
from app.services.llm_service import get_llm


def parse_job_description_text(jd_text: str):
    llm = get_llm()

    prompt = f"""
You are an information extraction system.

Extract details from the job description below.

Return valid JSON only.
Do not use markdown.
Do not add explanation.
Use exactly this schema:
{{
  "role": "string",
  "required_skills": ["string"],
  "preferred_skills": ["string"],
  "responsibilities": ["string"]
}}

Job Description:
{jd_text}
"""

    response = llm.invoke(prompt)
    content = response.content.strip()

    try:
        return json.loads(content)
    except json.JSONDecodeError:
        raise ValueError(f"Model did not return valid JSON. Raw output: {content}")