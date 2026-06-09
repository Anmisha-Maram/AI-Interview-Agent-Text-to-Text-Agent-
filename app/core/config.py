
from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "AI Interview Agent"
    app_version: str = "0.1.0"
    groq_api_key: str
    llm_model: str = "llama-3.3-70b-versatile"

    model_config = SettingsConfigDict(env_file = ".env", extra = "ignore")


settings = Settings()

