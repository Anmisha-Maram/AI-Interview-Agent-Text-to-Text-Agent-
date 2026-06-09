import uuid

from app.services.question_service import generate_questions
from app.services.evaluation_service import evaluate_answer
from app.services.followup_service import generate_follow_up_question


sessions = {}


def start_interview(candidate_skills, required_skills, gap_map):
    session_id = str(uuid.uuid4())
    result = generate_questions(candidate_skills, required_skills, gap_map)
    questions = result["questions"]

    sessions[session_id] = {
        "questions": questions,
        "answers": [],
        "current_index": 0,
        "asked_follow_up_for_current": False,
    }

    return {
        "session_id": session_id,
        "questions": questions,
        "current_question": questions[0]
    }


def submit_answer(session_id, question, skill, answer):
    if session_id not in sessions:
        raise ValueError("Invalid session_id")

    session = sessions[session_id]

    evaluation = evaluate_answer(question, skill, answer)

    follow_up_question = None
    next_question = None
    interview_complete = False

    session["answers"].append(
        {
            "question": question,
            "skill": skill,
            "answer": answer,
            "evaluation": evaluation
        }
    )

    if evaluation["follow_up_needed"] and not session["asked_follow_up_for_current"]:
        follow_up = generate_follow_up_question(
            question,
            skill,
            answer,
            evaluation["feedback"]
        )
        follow_up_question = follow_up["follow_up_question"]
        next_question = {
            "question": follow_up_question,
            "skill": skill
        }
        session["asked_follow_up_for_current"] = True
    else:
        session["current_index"] += 1
        session["asked_follow_up_for_current"] = False

        if session["current_index"] < len(session["questions"]):
            next_question = session["questions"][session["current_index"]]
        else:
            interview_complete = True

    return {
        "score": evaluation["score"],
        "feedback": evaluation["feedback"],
        "follow_up_needed": evaluation["follow_up_needed"],
        "follow_up_question": follow_up_question,
        "next_question": next_question,
        "interview_complete": interview_complete
    }