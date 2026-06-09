const API_BASE_URL = "http://127.0.0.1:8000";

async function handleResponse(response) {
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || "Request failed");
  }
  return response.json();
}

export async function parseResume(text) {
  const response = await fetch(`${API_BASE_URL}/ingestion/parse-resume`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  return handleResponse(response);
}

export async function parseJD(text) {
  const response = await fetch(`${API_BASE_URL}/ingestion/parse-jd`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
  });

  return handleResponse(response);
}

export async function computeSkillGap(candidate_skills, required_skills) {
  const response = await fetch(`${API_BASE_URL}/ingestion/skill-gap`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      candidate_skills,
      required_skills,
    }),
  });

  return handleResponse(response);
}

export async function startSession(candidate_skills, required_skills, gap_map) {
  const response = await fetch(`${API_BASE_URL}/sessions/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      candidate_skills,
      required_skills,
      gap_map,
    }),
  });

  return handleResponse(response);
}

export async function submitAnswer(session_id, question, skill, answer) {
  const response = await fetch(`${API_BASE_URL}/sessions/answer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      session_id,
      question,
      skill,
      answer,
    }),
  });

  return handleResponse(response);
}