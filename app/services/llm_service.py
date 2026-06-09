
from langchain_groq import ChatGroq
from app.core.config import settings

def get_llm():
    return ChatGroq(
        model =settings.llm_model,
        api_key=settings.groq_api_key
    )
