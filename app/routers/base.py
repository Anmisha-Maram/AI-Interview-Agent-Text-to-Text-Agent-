
from fastapi import APIRouter

router = APIRouter(tags=["base"])

@router.get("/")
async def root():
    return {"message": "AI Interview Agent backend is running"}

@router.get("/health")
async def health():
    return {"status": "ok"}
