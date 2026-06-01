import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { Sparkles } from "lucide-react";
import "./styles.css";
import Quiz from "./components/Quiz";

function App() {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <main className="app-shell">
      {!showQuiz && (
        <section className="hero-card">
          <div className="intro fade-in">
            <div className="badge">
              <Sparkles size={16} /> Kit de sensibilisation IA
            </div>
            <h1>IA dans le sport</h1>
            <p className="lead">
              Ce kit d’introduction est conçu pour les clubs sportifs locaux.
              Découvrez comment l’intelligence artificielle peut aider votre
              club et découvrez ses opportunités, ses risques et ses limites
              pour la communication interne et sur les réseaux sociaux.
            </p>
            <button
              className="primary-button"
              onClick={() => setShowQuiz(true)}
            >
              Démarrer le quiz
            </button>
          </div>
        </section>
      )}

      {showQuiz && <Quiz onExit={() => setShowQuiz(false)} />}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
