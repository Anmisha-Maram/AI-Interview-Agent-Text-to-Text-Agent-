
from fastapi import APIRouter
from app.schemas.session import (
    StartInterviewRequest,
    StartInterviewResponse,
    SubmitAnswerRequest,
    SubmitAnswerResponse,
)
from app.services.session_service import start_interview, submit_answer

router = APIRouter(prefix="/sessions", tags=["sessions"])


@router.post("/start", response_model=StartInterviewResponse)
async def start_interview_session(request: StartInterviewRequest):
    result = start_interview(
        request.candidate_skills,
        request.required_skills,
        request.gap_map
    )
    return StartInterviewResponse(**result)


@router.post("/answer", response_model=SubmitAnswerResponse)
async def submit_interview_answer(request: SubmitAnswerRequest):
    result = submit_answer(
        request.session_id,
        request.question,
        request.skill,
        request.answer
    )
    return SubmitAnswerResponse(**result)