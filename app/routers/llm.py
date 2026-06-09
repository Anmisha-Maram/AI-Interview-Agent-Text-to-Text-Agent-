
from fastapi import APIRouter
from app.services.llm_service import get_llm

router = APIRouter(prefix="/llm", tags=["llm"])


@router.get("/test")
async def test_llm():
    llm = get_llm()
    response = llm.invoke("Reply with exactly: Groq connection successful")
    return {"response": response.content}