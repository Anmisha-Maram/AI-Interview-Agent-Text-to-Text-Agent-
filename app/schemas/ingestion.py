
from pydantic import BaseModel
from typing import List
from typing import Dict

class ResumeTextRequest(BaseModel):
    text: str


class ResumeTextResponse(BaseModel):
    message: str
    preview: str

class ParsedResumeResponse(BaseModel):
    name: str
    skills: List[str]
    projects: List[str]
    education: List[str]

class JobDescriptionResponse(BaseModel):
    role: str
    required_skills: List[str]
    preferred_skills: List[str]
    responsibilities: List[str]

class SkillGapResponse(BaseModel):
    candidate_skills: List[str]
    required_skills:List[str]
    gap_map: Dict[str,str]

class QuestionItem(BaseModel):
    question: str
    skill: str


class QuestionGenerationRequest(BaseModel):
    candidate_skills: List[str]
    required_skills: List[str]
    gap_map: Dict[str, str]


class QuestionGenerationResponse(BaseModel):
    questions: List[QuestionItem]

class AnswerEvaluationRequest(BaseModel):
    question: str
    skill: str
    answer: str


class AnswerEvaluationResponse(BaseModel):
    score: int
    feedback: str
    follow_up_needed: bool

class FollowUpQuestionRequest(BaseModel):
    question: str
    skill: str
    answer: str
    feedback: str


class FollowUpQuestionResponse(BaseModel):
    follow_up_question: str