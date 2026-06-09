
def compute_skill_gap(candidate_skills: list[str], required_skills: list[str]):
    candidate_set = {skill.strip().lower() for skill in candidate_skills}
    gap_map = {}

    for skill in required_skills:
        normalized = skill.strip().lower()
        if normalized in candidate_set:
            gap_map[skill] = "present"
        else:
            gap_map[skill] = "missing"

    return gap_map