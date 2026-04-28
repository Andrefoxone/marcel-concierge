import { useState, useEffect, useRef } from "react";

const HEARTBEAT_KEYFRAMES = `
@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.6; }
  14% { transform: scale(1.15); opacity: 1; }
  28% { transform: scale(1); opacity: 0.6; }
  42% { transform: scale(1.12); opacity: 0.9; }
  56% { transform: scale(1); opacity: 0.6; }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes lineGrow {
  from { width: 0; }
  to { width: 60px; }
}
@keyframes gentlePulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.6; }
}
@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

const FONTS_LINK = "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap";

// API endpoint — in production use a serverless function as proxy
const API_URL = "/api/generate";

function HeartIcon({ size = 20, style = {} }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" style={style}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  );
}

export default function App() {
  const [view, setView] = useState("home");
  const [userText, setUserText] = useState("");
  const [generatedStory, setGeneratedStory] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [wallStories, setWallStories] = useState([]);
  const [revealedChars, setRevealedChars] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const saved = localStorage.getItem("tachicardia-wall");
    if (saved) setWallStories(JSON.parse(saved));
  }, []);

  useEffect(() => {
    if (view === "result" && generatedStory && revealedChars < generatedStory.length) {
      const speed = 25 + Math.random() * 20;
      const timer = setTimeout(() => setRevealedChars(prev => prev + 1), speed);
      return () => clearTimeout(timer);
    }
  }, [view, generatedStory, revealedChars]);

  function saveStory(original, generated) {
    const newStory = {
      id: Date.now(),
      original: original.substring(0, 100),
      generated,
      date: new Date().toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" })
    };
    const updated = [newStory, ...wallStories].slice(0, 50);
    setWallStories(updated);
    localStorage.setItem("tachicardia-wall", JSON.stringify(updated));
  }

  async function generateStory() {
    if (!userText.trim() || userText.trim().length < 10) {
      setError("Scrivi almeno qualche parola in più. Il cuore ha bisogno di spazio.");
      return;
    }
    setError("");
    setIsGenerating(true);
    setRevealedChars(0);

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userText })
      });

      const data = await res.json();
      
      if (data.story) {
        setGeneratedStory(data.story);
        saveStory(userText, data.story);
        setView("result");
      } else {
        setError(data.error || "Qualcosa è andato storto. Riprova.");
      }
    } catch (err) {
      setError("Connessione interrotta. Il cuore a volte salta un battito.");
    }
    setIsGenerating(false);
  }

  const navStyle = {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "24px 32px",
    borderBottom: "1px solid rgba(232,224,214,0.06)"
  };

  const btnBase = {
    background: "transparent",
    border: "1px solid rgba(184,64,64,0.5)",
    color: "#e8e0d6",
    padding: "14px 40px",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "16px",
    fontWeight: 500,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.3s",
    borderRadius: "0"
  };

  return (
    <>
      <style>{HEARTBEAT_KEYFRAMES}</style>
      <link href={FONTS_LINK} rel="stylesheet" />
      <div style={{
        minHeight: "100vh",
        background: "#0a0a0a",
        color: "#e8e0d6",
        fontFamily: "'DM Sans', sans-serif",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Grain overlay */}
        <div style={{
          position: "fixed", inset: 0, opacity: 0.04, zIndex: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px"
        }} />

        {/* Red glow */}
        <div style={{
          position: "fixed", top: "30%", left: "50%",
          width: "600px", height: "600px",
          transform: "translate(-50%, -50%)", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(180,40,40,0.08) 0%, transparent 70%)",
          animation: "gentlePulse 3s ease-in-out infinite", zIndex: 0
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>

          {/* NAV */}
          <nav style={navStyle}>
            <div onClick={() => { setView("home"); setUserText(""); setGeneratedStory(""); setError(""); }}
              style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "10px" }}>
              <HeartIcon size={16} style={{ color: "#b84040", animation: "pulse 1.5s ease-in-out infinite" }} />
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: 500, letterSpacing: "0.05em" }}>
                La mia Tachicardia
              </span>
            </div>
            <div style={{ display: "flex", gap: "24px", fontSize: "13px", fontWeight: 300, letterSpacing: "0.08em", textTransform: "uppercase" }}>
              <span onClick={() => setView("write")} style={{ cursor: "pointer", opacity: view === "write" ? 1 : 0.5, transition: "opacity 0.3s" }}>Scrivi</span>
              <span onClick={() => setView("wall")} style={{ cursor: "pointer", opacity: view === "wall" ? 1 : 0.5, transition: "opacity 0.3s" }}>Muro</span>
            </div>
          </nav>

          {/* HOME */}
          {view === "home" && (
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              minHeight: "calc(100vh - 80px)", padding: "40px 24px", textAlign: "center",
              animation: "fadeInUp 0.8s ease-out"
            }}>
              <div style={{
                width: "80px", height: "80px", borderRadius: "50%",
                border: "1px solid rgba(184,64,64,0.3)",
                display: "flex", alignItems: "center", justifyContent: "center",
                marginBottom: "40px", animation: "pulse 1.5s ease-in-out infinite"
              }}>
                <HeartIcon size={32} style={{ color: "#b84040" }} />
              </div>

              <h1 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(36px, 7vw, 64px)", fontWeight: 300,
                lineHeight: 1.1, marginBottom: "12px", fontStyle: "italic"
              }}>La mia Tachicardia</h1>

              <div style={{ width: "0", height: "1px", background: "#b84040", animation: "lineGrow 1s ease-out 0.5s forwards", marginBottom: "32px" }} />

              <p style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 300,
                lineHeight: 1.7, maxWidth: "520px", opacity: 0.7, marginBottom: "16px"
              }}>
                Racconta il tuo momento di tachicardia.<br/>
                Quello in cui il cuore andava più veloce del pensiero.
              </p>
              <p style={{ fontSize: "14px", fontWeight: 300, opacity: 0.4, maxWidth: "420px", lineHeight: 1.6, marginBottom: "48px" }}>
                Lo trasformeremo in un micro-racconto,<br/>nello stile del libro di Andrea Fino.
              </p>

              <button onClick={() => setView("write")} style={btnBase}>Inizia a scrivere</button>

              <div style={{ position: "absolute", bottom: "32px", fontSize: "12px", fontWeight: 300, opacity: 0.3, letterSpacing: "0.05em" }}>
                Ispirato al libro{" "}
                <a href="https://amzn.eu/d/0bqAXEFI" target="_blank" rel="noopener noreferrer"
                  style={{ color: "#b84040", textDecoration: "none", borderBottom: "1px solid rgba(184,64,64,0.3)" }}>
                  Tachicardia
                </a>{" "}di Andrea Fino
              </div>
            </div>
          )}

          {/* WRITE */}
          {view === "write" && (
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              padding: "60px 24px", minHeight: "calc(100vh - 80px)",
              animation: "fadeInUp 0.6s ease-out"
            }}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 300,
                fontStyle: "italic", marginBottom: "8px"
              }}>Il tuo battito</h2>
              <p style={{ fontSize: "14px", fontWeight: 300, opacity: 0.4, marginBottom: "40px", textAlign: "center", lineHeight: 1.6 }}>
                Un ricordo. Una paura. Un'accelerazione. Scrivi quello che senti.
              </p>

              <div style={{ width: "100%", maxWidth: "560px" }}>
                <textarea
                  value={userText}
                  onChange={e => { setUserText(e.target.value); setError(""); }}
                  placeholder="Quella volta che..."
                  style={{
                    width: "100%", minHeight: "200px",
                    background: "rgba(232,224,214,0.03)",
                    border: "1px solid rgba(232,224,214,0.1)",
                    color: "#e8e0d6",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "18px", fontWeight: 300, lineHeight: 1.8,
                    padding: "24px", resize: "vertical", outline: "none",
                    transition: "border-color 0.3s", boxSizing: "border-box"
                  }}
                  onFocus={e => e.target.style.borderColor = "rgba(184,64,64,0.4)"}
                  onBlur={e => e.target.style.borderColor = "rgba(232,224,214,0.1)"}
                />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" }}>
                  <span style={{ fontSize: "12px", opacity: 0.3 }}>{userText.length} caratteri</span>
                  {error && <span style={{ fontSize: "13px", color: "#b84040", fontStyle: "italic" }}>{error}</span>}
                </div>

                <button onClick={generateStory} disabled={isGenerating}
                  style={{
                    ...btnBase, width: "100%", marginTop: "24px",
                    background: "rgba(184,64,64,0.15)",
                    cursor: isGenerating ? "wait" : "pointer"
                  }}>
                  {isGenerating ? (
                    <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                      <HeartIcon size={16} style={{ animation: "pulse 0.8s ease-in-out infinite" }} />
                      Il cuore sta scrivendo...
                    </span>
                  ) : "Trasforma in racconto"}
                </button>
              </div>
            </div>
          )}

          {/* RESULT */}
          {view === "result" && (
            <div style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              padding: "60px 24px", minHeight: "calc(100vh - 80px)",
              animation: "fadeInUp 0.6s ease-out"
            }}>
              <div style={{
                width: "6px", height: "6px", borderRadius: "50%",
                background: "#b84040", marginBottom: "32px",
                animation: "pulse 1.5s ease-in-out infinite"
              }} />
              <h2 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "14px", fontWeight: 400,
                letterSpacing: "0.15em", textTransform: "uppercase",
                opacity: 0.4, marginBottom: "40px"
              }}>La tua tachicardia, riscritta</h2>

              <div style={{
                maxWidth: "520px", width: "100%",
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(18px, 3vw, 22px)", fontWeight: 300,
                lineHeight: 1.9, fontStyle: "italic", textAlign: "center",
                minHeight: "200px"
              }}>
                {generatedStory.substring(0, revealedChars)}
                {revealedChars < generatedStory.length && (
                  <span style={{ opacity: 0.4, animation: "pulse 1s infinite" }}>|</span>
                )}
              </div>

              {revealedChars >= generatedStory.length && (
                <div style={{ animation: "fadeInUp 0.8s ease-out", textAlign: "center", marginTop: "48px" }}>
                  <div style={{ width: "40px", height: "1px", background: "rgba(184,64,64,0.4)", margin: "0 auto 32px" }} />
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "15px", fontWeight: 300, opacity: 0.5,
                    lineHeight: 1.7, marginBottom: "28px"
                  }}>
                    Questa è la tua storia. Ce ne sono altre.<br/>Ce n'è una intera, in un libro.
                  </p>

                  <a href="https://amzn.eu/d/0bqAXEFI" target="_blank" rel="noopener noreferrer"
                    style={{
                      display: "inline-block", padding: "14px 36px",
                      background: "rgba(184,64,64,0.15)",
                      border: "1px solid rgba(184,64,64,0.5)",
                      color: "#e8e0d6",
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "15px", fontWeight: 500,
                      letterSpacing: "0.1em", textTransform: "uppercase",
                      textDecoration: "none"
                    }}>
                    Leggi Tachicardia →
                  </a>

                  <div style={{ display: "flex", gap: "16px", marginTop: "24px", justifyContent: "center", flexWrap: "wrap" }}>
                    <button onClick={() => { setView("write"); setUserText(""); setGeneratedStory(""); }}
                      style={{ ...btnBase, padding: "10px 24px", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(232,224,214,0.15)" }}>
                      Scrivi un altro
                    </button>
                    <button onClick={() => setView("wall")}
                      style={{ ...btnBase, padding: "10px 24px", fontSize: "12px", fontFamily: "'DM Sans', sans-serif", border: "1px solid rgba(232,224,214,0.15)" }}>
                      Vedi il muro
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* WALL */}
          {view === "wall" && (
            <div style={{ padding: "60px 24px", minHeight: "calc(100vh - 80px)", animation: "fadeInUp 0.6s ease-out" }}>
              <div style={{ textAlign: "center", marginBottom: "48px" }}>
                <h2 style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 300,
                  fontStyle: "italic", marginBottom: "12px"
                }}>Il muro dei battiti</h2>
                <p style={{ fontSize: "14px", fontWeight: 300, opacity: 0.4, lineHeight: 1.6 }}>
                  Ogni cuore ha la sua storia. Queste sono alcune.
                </p>
              </div>

              {wallStories.length === 0 ? (
                <div style={{ textAlign: "center", padding: "80px 0" }}>
                  <HeartIcon size={24} style={{ color: "#b84040", opacity: 0.3, marginBottom: "16px" }} />
                  <p style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "18px", fontWeight: 300, fontStyle: "italic", opacity: 0.4
                  }}>Nessun battito ancora. Sii il primo.</p>
                  <button onClick={() => setView("write")}
                    style={{ ...btnBase, marginTop: "24px", padding: "12px 32px", fontSize: "14px" }}>
                    Scrivi
                  </button>
                </div>
              ) : (
                <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", flexDirection: "column" }}>
                  {wallStories.map((story, i) => (
                    <div key={story.id} style={{
                      padding: "36px 0",
                      borderBottom: "1px solid rgba(232,224,214,0.06)",
                      animation: `slideIn 0.5s ease-out ${i * 0.1}s both`
                    }}>
                      <p style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "18px", fontWeight: 300, fontStyle: "italic",
                        lineHeight: 1.8, marginBottom: "16px"
                      }}>"{story.generated}"</p>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <HeartIcon size={10} style={{ color: "#b84040", opacity: 0.5 }} />
                        <span style={{ fontSize: "11px", fontWeight: 300, opacity: 0.3, letterSpacing: "0.05em" }}>{story.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ textAlign: "center", marginTop: "60px", paddingBottom: "40px" }}>
                <div style={{ width: "40px", height: "1px", background: "rgba(184,64,64,0.3)", margin: "0 auto 24px" }} />
                <p style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "15px", fontWeight: 300, fontStyle: "italic",
                  opacity: 0.4, marginBottom: "20px"
                }}>Tutte queste storie sono nate da una sola.</p>
                <a href="https://amzn.eu/d/0bqAXEFI" target="_blank" rel="noopener noreferrer"
                  style={{
                    display: "inline-block", padding: "12px 32px",
                    background: "rgba(184,64,64,0.1)",
                    border: "1px solid rgba(184,64,64,0.4)",
                    color: "#e8e0d6",
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "14px", fontWeight: 500,
                    letterSpacing: "0.1em", textTransform: "uppercase",
                    textDecoration: "none"
                  }}>
                  Leggi Tachicardia →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
