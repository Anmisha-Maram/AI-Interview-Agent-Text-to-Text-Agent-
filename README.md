# AI Interview Agent

A full-stack AI-powered interview practice platform built with **FastAPI** and **React (Vite)**. It analyzes a candidate's resume and job description, generates tailored interview questions, evaluates answers in real time, and adapts the flow with follow-up questions.

## Overview

This project simulates a technical interview experience with a clean AI-themed interface. The current implementation supports a complete **text-to-text interview loop**: resume parsing, job description parsing, skill-gap analysis, personalized question generation, answer evaluation, and adaptive follow-up questioning.

## Features

- Resume parsing from pasted text
- Job description parsing from pasted text
- Skill-gap analysis between candidate and role requirements
- Personalized interview question generation
- Text-based answer submission
- Real-time answer evaluation with score and feedback
- Adaptive follow-up questions based on answer quality
- Multi-question interview flow with session handling
- Attractive AI-style frontend with a robot visual and modern card layout

## Tech Stack

| Layer | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript |
| Backend | FastAPI, Python |
| AI/LLM flow | LLM-driven question generation, evaluation, and follow-up logic |
| Styling | Custom React UI styling |

## Project Structure

```text
AI-Interview-Agent-Text-to-Text-Agent-/
├── app/
│   ├── routers/
│   ├── schemas/
│   ├── services/
│   └── main.py
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── .gitignore
├── main.py
└── requirements.txt
```

## Workflow

1. Paste resume text and job description text into the UI.
2. The backend parses both inputs and computes the skill gap.
3. The system generates personalized interview questions.
4. The candidate answers each question in text form.
5. The AI evaluates the answer and returns score and feedback.
6. If needed, the system asks a follow-up question.
7. The session continues until the interview is complete.


If your screenshots are already uploaded in the repository, replace the example paths above with the correct ones.

## Setup

### Backend

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

Backend runs on:

```text
http://127.0.0.1:8000
```

## API Flow

Main interview endpoints:

- `POST /ingestion/parse-resume`
- `POST /ingestion/parse-jd`
- `POST /ingestion/skill-gap`
- `POST /sessions/start`
- `POST /sessions/answer`

## Current Stage

### Stage 1 Complete

The current version is a **text-to-text AI interview agent**.

Implemented:
- Resume + JD ingestion
- Skill gap analysis
- Personalized question generation
- Text answer evaluation
- Follow-up question generation
- Polished frontend interview experience

Planned next stages:
- Stage 2: Candidate voice input -> speech-to-text -> answer evaluation
- Stage 3: AI voice output for asking questions
- Stage 4: Real-time two-way voice interview experience

## Future Improvements

- Voice-based candidate answers
- AI voice interviewer
- Interview summary report
- Persistent database-backed sessions
- Authentication and user dashboards
- Deployment to cloud platforms

## Author

**Anmisha Maram**

## License

This project is for learning, experimentation, and portfolio use.
