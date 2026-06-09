from fastapi import FastAPI
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

from app.routers.base import router as base_router
from app.routers.ingestion import router as ingestion_router
from app.routers.llm import router as llm_router
from app.routers.sessions import router as sessions_router

load_dotenv()

app = FastAPI(title="AI Interview Agent")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(base_router)
app.include_router(ingestion_router)
app.include_router(llm_router)
app.include_router(sessions_router)