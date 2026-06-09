from pydantic import BaseModel
from typing import List, Dict, Optional


class QuestionItem(BaseModel):
    question: str
    skill: str


class StartInterviewRequest(BaseModel):
    candidate_skills: List[str]
    required_skills: List[str]
    gap_map: Dict[str, str]


class StartInterviewResponse(BaseModel):
    session_id: str
    questions: List[QuestionItem]
    current_question: QuestionItem


class SubmitAnswerRequest(BaseModel):
    session_id: str
    question: str
    skill: str
    answer: str


class SubmitAnswerResponse(BaseModel):
    score: int
    feedback: str
    follow_up_needed: bool
    follow_up_question: Optional[str] = None
    next_question: Optional[QuestionItem] = None
    interview_complete: bool