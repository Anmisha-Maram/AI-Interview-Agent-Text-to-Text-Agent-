
from fastapi import APIRouter
from app.schemas.ingestion import(
     ResumeTextRequest, 
     ResumeTextResponse, 
     ParsedResumeResponse,
     JobDescriptionResponse,
     SkillGapResponse,
     QuestionGenerationRequest,
     QuestionGenerationResponse,
     AnswerEvaluationRequest,
     AnswerEvaluationResponse,
     FollowUpQuestionRequest,
     FollowUpQuestionResponse,
     )

from app.services.resume_parser import parse_resume_text
from app.services.jd_parser import parse_job_description_text
from app.services.profile_service import compute_skill_gap
from app.services.question_service import generate_questions
from app.services.evaluation_service import evaluate_answer
from app.services.followup_service import generate_follow_up_question

router = APIRouter(prefix="/ingestion", tags=["ingestion"])


@router.post("/resume-text", response_model = ResumeTextResponse)
async def ingest_resume_text(request: ResumeTextRequest):
    return ResumeTextResponse(
        message="Resume text received successfully",
        preview=request.text[:200]
    )

@router.post("/parse-resume", response_model=ParsedResumeResponse)
async def parse_resume(request: ResumeTextRequest):
    parsed = parse_resume_text(request.text)
    return ParsedResumeResponse(**parsed)

@router.post("/parse-jd", response_model=JobDescriptionResponse)
async def parse_jd(request: ResumeTextRequest):
    parsed = parse_job_description_text(request.text)
    return JobDescriptionResponse(**parsed)

@router.post("/skill-gap", response_model=SkillGapResponse)
async def skill_gap(payload: dict):
    candidate_skills = payload.get("candidate_skills", [])
    required_skills = payload.get("required_skills", [])

    gap_map = compute_skill_gap(candidate_skills, required_skills)

    return SkillGapResponse(
        candidate_skills=candidate_skills,
        required_skills=required_skills,
        gap_map=gap_map
    )

@router.post("/generate-questions", response_model=QuestionGenerationResponse)
async def generate_interview_questions(request: QuestionGenerationRequest):
    result = generate_questions(
        request.candidate_skills,
        request.required_skills,
        request.gap_map
    )
    return QuestionGenerationResponse(**result)

@router.post("/evaluate-answer", response_model=AnswerEvaluationResponse)
async def evaluate_candidate_answer(request: AnswerEvaluationRequest):
    result = evaluate_answer(
        request.question,
        request.skill,
        request.answer
    )
    return AnswerEvaluationResponse(**result)

@router.post("/generate-followup", response_model=FollowUpQuestionResponse)
async def generate_followup(request: FollowUpQuestionRequest):
    result = generate_follow_up_question(
        request.question,
        request.skill,
        request.answer,
        request.feedback
    )
    return FollowUpQuestionResponse(**result)
