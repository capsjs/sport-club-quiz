import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import HomePage from "./components/HomePage";
import Quiz from "./components/Quiz";

function App() {
  const [showQuiz, setShowQuiz] = useState(false);

  return (
    <main className="app-shell">
      {!showQuiz && <HomePage onStartQuiz={() => setShowQuiz(true)} />}
      {showQuiz && <Quiz onExit={() => setShowQuiz(false)} />}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
