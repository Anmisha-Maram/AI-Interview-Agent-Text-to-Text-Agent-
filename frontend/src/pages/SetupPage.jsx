import { useState } from "react";
import {
  parseResume,
  parseJD,
  computeSkillGap,
  startSession,
  submitAnswer,
} from "../services/api";
import robotImg from "../assets/robot.png";

function SetupPage() {
  const [resumeText, setResumeText] = useState("");
  const [jdText, setJdText] = useState("");
  const [sessionData, setSessionData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [answerText, setAnswerText] = useState("");
  const [answerResult, setAnswerResult] = useState(null);
  const [interviewComplete, setInterviewComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleStart = async () => {
    try {
      setLoading(true);
      setAnswerResult(null);
      setAnswerText("");
      setInterviewComplete(false);

      const resumeData = await parseResume(resumeText);
      const jdData = await parseJD(jdText);
      const gapData = await computeSkillGap(
        resumeData.skills,
        jdData.required_skills
      );

      const startedSession = await startSession(
        resumeData.skills,
        jdData.required_skills,
        gapData.gap_map
      );

      setSessionData(startedSession);
      setCurrentQuestion(startedSession.current_question);
    } catch (error) {
      console.error(error);
      alert("Something went wrong while starting the interview.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!sessionData || !currentQuestion || !answerText.trim()) {
      alert("Please enter an answer first.");
      return;
    }

    try {
      setSubmitting(true);

      const result = await submitAnswer(
        sessionData.session_id,
        currentQuestion.question,
        currentQuestion.skill,
        answerText
      );

      setAnswerResult(result);
      setAnswerText("");

      if (result.interview_complete) {
        setInterviewComplete(true);
        setCurrentQuestion(null);
      } else if (result.next_question) {
        setCurrentQuestion(result.next_question);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while submitting the answer.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRestart = () => {
    setResumeText("");
    setJdText("");
    setSessionData(null);
    setCurrentQuestion(null);
    setAnswerText("");
    setAnswerResult(null);
    setInterviewComplete(false);
    setLoading(false);
    setSubmitting(false);
  };

  const styles = {
    page: {
      minHeight: "100vh",
      background:
        "linear-gradient(135deg, #0f172a 0%, #111827 35%, #1e3a8a 100%)",
      color: "#e5eefc",
      padding: "32px 20px",
      fontFamily:
        "Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    },
    container: {
      maxWidth: "1180px",
      margin: "0 auto",
    },
    hero: {
      display: "grid",
      gridTemplateColumns: "1.2fr 0.8fr",
      gap: "24px",
      alignItems: "center",
      marginBottom: "28px",
    },
    heroCard: {
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.14)",
      borderRadius: "24px",
      padding: "32px",
      boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
      backdropFilter: "blur(10px)",
    },
    badge: {
      display: "inline-block",
      padding: "8px 14px",
      borderRadius: "999px",
      background: "linear-gradient(90deg, #22c55e, #14b8a6)",
      color: "#08111f",
      fontWeight: 700,
      fontSize: "0.85rem",
      marginBottom: "18px",
    },
    title: {
      fontSize: "2.8rem",
      lineHeight: 1.1,
      fontWeight: 800,
      marginBottom: "14px",
      color: "#ffffff",
    },
    subtitle: {
      fontSize: "1.05rem",
      color: "#cbd5e1",
      lineHeight: 1.7,
      maxWidth: "58ch",
    },
    heroImageWrap: {
      background: "rgba(255,255,255,0.08)",
      border: "1px solid rgba(255,255,255,0.14)",
      borderRadius: "24px",
      minHeight: "280px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 20px 60px rgba(0,0,0,0.28)",
      backdropFilter: "blur(10px)",
      padding: "20px",
    },
    heroImage: {
      width: "220px",
      maxWidth: "100%",
      objectFit: "contain",
      filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.35))",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "24px",
    },
    card: {
      background: "#ffffff",
      color: "#0f172a",
      borderRadius: "22px",
      padding: "24px",
      boxShadow: "0 20px 50px rgba(15, 23, 42, 0.22)",
    },
    sectionTitle: {
      fontSize: "1.2rem",
      fontWeight: 800,
      marginBottom: "14px",
      color: "#0f172a",
    },
    label: {
      display: "block",
      fontSize: "0.95rem",
      fontWeight: 700,
      marginBottom: "8px",
      color: "#1e293b",
    },
    textarea: {
      width: "100%",
      minHeight: "170px",
      borderRadius: "16px",
      border: "1px solid #dbe4f0",
      padding: "14px 16px",
      fontSize: "0.98rem",
      lineHeight: 1.6,
      resize: "vertical",
      outline: "none",
      background: "#f8fafc",
      color: "#0f172a",
      boxSizing: "border-box",
    },
    button: {
      border: "none",
      borderRadius: "14px",
      padding: "14px 22px",
      fontSize: "1rem",
      fontWeight: 700,
      cursor: "pointer",
      background: "linear-gradient(90deg, #2563eb, #7c3aed)",
      color: "#ffffff",
      boxShadow: "0 12px 30px rgba(37, 99, 235, 0.35)",
      marginTop: "16px",
    },
    secondaryButton: {
      border: "none",
      borderRadius: "14px",
      padding: "13px 20px",
      fontSize: "0.98rem",
      fontWeight: 700,
      cursor: "pointer",
      background: "#e2e8f0",
      color: "#0f172a",
      marginTop: "18px",
    },
    questionCard: {
      background: "linear-gradient(135deg, #eff6ff, #eef2ff)",
      border: "1px solid #c7d2fe",
      borderRadius: "18px",
      padding: "18px",
      marginBottom: "18px",
    },
    skillPill: {
      display: "inline-block",
      padding: "7px 12px",
      borderRadius: "999px",
      background: "#dbeafe",
      color: "#1d4ed8",
      fontWeight: 700,
      fontSize: "0.85rem",
      marginTop: "10px",
    },
    metaCard: {
      background: "linear-gradient(135deg, #0f172a, #1e293b)",
      color: "#f8fafc",
      borderRadius: "22px",
      padding: "24px",
      boxShadow: "0 20px 50px rgba(15, 23, 42, 0.22)",
      marginBottom: "24px",
    },
    metaText: {
      color: "#cbd5e1",
      marginTop: "8px",
      lineHeight: 1.7,
    },
    resultCard: {
      marginTop: "22px",
      padding: "22px",
      borderRadius: "18px",
      background: "linear-gradient(135deg, #f0fdf4, #ecfeff)",
      border: "1px solid #bbf7d0",
    },
    scoreChip: {
      display: "inline-block",
      padding: "8px 14px",
      borderRadius: "999px",
      background: "#16a34a",
      color: "#ffffff",
      fontWeight: 800,
      marginBottom: "12px",
    },
    completeCard: {
      background: "linear-gradient(135deg, #dcfce7, #dbeafe)",
      border: "1px solid #86efac",
      borderRadius: "18px",
      padding: "20px",
      marginTop: "18px",
      color: "#14532d",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.hero}>
          <div style={styles.heroCard}>
            <div style={styles.badge}>AI Interview Experience</div>
            <h1 style={styles.title}>Practice interviews with an intelligent AI panel</h1>
            <p style={styles.subtitle}>
              Upload your resume content and job description, generate tailored
              technical questions, answer them step by step, and receive instant
              feedback in a polished interview workspace.
            </p>
          </div>

          <div style={styles.heroImageWrap}>
            <img src={robotImg} alt="AI Interview Robot" style={styles.heroImage} />
          </div>
        </div>

        {!sessionData && (
          <div style={styles.grid}>
            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>Candidate Profile</h2>
              <label style={styles.label}>Resume Text</label>
              <textarea
                rows="10"
                style={styles.textarea}
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                placeholder="Paste the candidate resume here..."
              />
            </div>

            <div style={styles.card}>
              <h2 style={styles.sectionTitle}>Role Requirements</h2>
              <label style={styles.label}>Job Description Text</label>
              <textarea
                rows="10"
                style={styles.textarea}
                value={jdText}
                onChange={(e) => setJdText(e.target.value)}
                placeholder="Paste the job description here..."
              />
            </div>

            <div style={{ gridColumn: "1 / -1", textAlign: "center" }}>
              <button onClick={handleStart} disabled={loading} style={styles.button}>
                {loading ? "Starting Interview..." : "Start AI Interview"}
              </button>
            </div>
          </div>
        )}

        {sessionData && (
          <div>
            <div style={styles.metaCard}>
              <h2 style={{ margin: 0 }}>Interview Session Live</h2>
              <p style={styles.metaText}>
                <strong>Session ID:</strong> {sessionData.session_id}
              </p>
              <p style={styles.metaText}>
                Your answers are being evaluated in real time to simulate a
                technical interview flow with adaptive questioning.
              </p>
            </div>

            {!interviewComplete && currentQuestion && (
              <div style={styles.grid}>
                <div style={styles.card}>
                  <h2 style={styles.sectionTitle}>Current Question</h2>

                  <div style={styles.questionCard}>
                    <p style={{ margin: 0, lineHeight: 1.8, fontSize: "1rem" }}>
                      {currentQuestion.question}
                    </p>
                    <div style={styles.skillPill}>{currentQuestion.skill}</div>
                  </div>

                  <label style={styles.label}>Your Answer</label>
                  <textarea
                    rows="10"
                    style={styles.textarea}
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    placeholder="Type your response like you are speaking in a real interview..."
                  />

                  <button
                    onClick={handleSubmitAnswer}
                    disabled={submitting}
                    style={styles.button}
                  >
                    {submitting ? "Submitting Answer..." : "Submit Answer"}
                  </button>
                </div>

                <div style={styles.card}>
                  <h2 style={styles.sectionTitle}>Evaluation Panel</h2>
                  {!answerResult ? (
                    <p style={{ color: "#475569", lineHeight: 1.8 }}>
                      Once you submit an answer, the AI interviewer will score it,
                      generate feedback, and decide the next interview step.
                    </p>
                  ) : (
                    <div style={styles.resultCard}>
                      <div style={styles.scoreChip}>Score: {answerResult.score}/10</div>
                      <p style={{ lineHeight: 1.8, color: "#14532d" }}>
                        <strong>Feedback:</strong> {answerResult.feedback}
                      </p>
                      <p style={{ lineHeight: 1.8, color: "#14532d" }}>
                        <strong>Follow-up Needed:</strong>{" "}
                        {answerResult.follow_up_needed ? "Yes" : "No"}
                      </p>

                      {!answerResult.interview_complete && answerResult.next_question && (
                        <p style={{ lineHeight: 1.8, color: "#14532d" }}>
                          <strong>Upcoming Question:</strong>{" "}
                          {answerResult.next_question.question}
                        </p>
                      )}

                      {answerResult.interview_complete && (
                        <div style={styles.completeCard}>
                          <strong>Status:</strong> Interview complete
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {interviewComplete && (
              <div style={styles.card}>
                <h2 style={styles.sectionTitle}>Interview Completed</h2>
                <p style={{ color: "#334155", lineHeight: 1.8 }}>
                  Great work — your AI interview session has ended. You can now
                  restart and try another role, another resume, or a stronger set
                  of answers for more practice.
                </p>

                <button onClick={handleRestart} style={styles.secondaryButton}>
                  Start New Interview
                </button>
              </div>
            )}

            {!interviewComplete && (
              <div style={{ marginTop: "20px" }}>
                <button onClick={handleRestart} style={styles.secondaryButton}>
                  Reset Interview
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SetupPage;