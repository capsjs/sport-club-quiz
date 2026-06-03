import React, { useMemo, useState, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  RotateCcw,
  Trophy,
  HeartHandshake,
} from "lucide-react";
import { questions } from "../data/questions";

export default function Quiz({ onExit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(240);
  const [step, setStep] = useState("quiz");

  const currentQuestion = questions[currentIndex];
  const score = answers.filter((answer) => answer.isCorrect).length;
  const percentage = Math.round((score / questions.length) * 100);

  useEffect(() => {
    if (step !== "quiz") return;

    if (timeLeft <= 0) {
      setStep("result");
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((previous) => previous - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [step, timeLeft]);

  const weakQuestions = useMemo(() => {
    return questions
      .map((question, index) => ({ question, answer: answers[index] }))
      .filter((item) => item.answer && !item.answer.isCorrect)
      .map((item) => item.question.question);
  }, [answers]);

  const startQuiz = () => {
    setStep("quiz");
    setCurrentIndex(0);
    setSelectedIndex(null);
    setAnswers([]);
    setTimeLeft(240);
  };

  const selectAnswer = (index) => {
    if (selectedIndex !== null) return;

    const isCorrect = index === currentQuestion.correct;

    setSelectedIndex(index);
    setAnswers((previous) => [
      ...previous,
      {
        selectedIndex: index,
        isCorrect,
      },
    ]);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((previous) => previous + 1);
      setSelectedIndex(null);
    } else {
      setStep("result");
    }
  };

  const getAdvice = () => {
    if (percentage >= 80) {
      return {
        title: "Très bon niveau",
        text: "Vous avez compris l'essentiel : l'IA est un outil utile, mais elle doit être encadrée, vérifiée et adaptée à l'identité du club.",
      };
    }

    if (percentage >= 50) {
      return {
        title: "Bonnes bases, mais quelques réflexes à consolider",
        text: `Revoyez surtout les questions liées à : ${
          weakQuestions.slice(0, 3).join(", ") || "les bonnes pratiques"
        }.`,
      };
    }

    return {
      title: "Points de vigilance importants",
      text: "Il faut revoir les limites de l'IA, la vérification des informations et la personnalisation des contenus. Ces réflexes protègent l'image du club et améliorent la qualité de la communication.",
    };
  };

  const advice = getAdvice();

  return (
    <section className="hero-card">
      {step === "quiz" && (
        <div className="quiz fade-in">
          <div className="topline">
            <span>
              Question {currentIndex + 1}/{questions.length}
            </span>
            <span>
             ⏱️ {Math.floor(timeLeft / 60)}:
              {String(timeLeft % 60).padStart(2, "0")}
            </span>
          </div>

          <div className="progress" aria-label="Progression du quiz">
            <span
              style={{
                width: `${((currentIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>

          <h2>{currentQuestion.question}</h2>

          <div className="answers-list">
            {currentQuestion.options.map((answer, index) => {
              const isSelected = selectedIndex === index;
              const isCorrect = index === currentQuestion.correct;

              const buttonClass =
                selectedIndex === null
                  ? ""
                  : isSelected && isCorrect
                    ? "correct"
                    : isSelected && !isCorrect
                      ? "incorrect"
                      : isCorrect
                        ? "reveal-correct"
                        : "disabled";

              return (
                <button
                  key={answer}
                  className={`answer-button ${buttonClass}`}
                  onClick={() => selectAnswer(index)}
                >
                  <span>{answer}</span>
                  {isSelected && isCorrect && <CheckCircle2 size={22} />}
                  {isSelected && !isCorrect && <XCircle size={22} />}
                </button>
              );
            })}
          </div>

          {selectedIndex !== null && (
            <div className="explanation">
              <strong>
                {selectedIndex === currentQuestion.correct
                  ? "Bonne réponse."
                  : "Réponse à corriger."}
              </strong>

              <p>{currentQuestion.explanation}</p>

              <button className="primary-button" onClick={nextQuestion}>
                {currentIndex + 1 < questions.length
                  ? "Question suivante"
                  : "Voir mon score"}
              </button>
            </div>
          )}
        </div>
      )}

      {step === "result" && (
        <div className="result fade-in">
          <div className="badge">
            <Trophy size={16} /> Résultat
          </div>

          <h1>
            {score}/17 réponses correctes
          </h1>

          <div
            className="score-circle"
            style={{
              background: `conic-gradient(#d64330 ${percentage}%, #f2e8dd 0)`,
            }}
          >
            <span>{percentage}%</span>
          </div>

          <h2>{advice.title}</h2>
          <p className="lead">{advice.text}</p>

          <div className="memo-card">
            <strong>💡 À retenir</strong>
            <ul>
              <li>
                L'IA permet de gagner du temps, mais ne remplace pas la
                vérification humaine.
              </li>
              <li>
                Chaque contenu doit être adapté au ton, aux valeurs et aux
                informations réelles du club.
              </li>
              <li>
                Les visuels et textes générés peuvent poser des problèmes de
                qualité, de droits ou de confiance.
              </li>
            </ul>
          </div>

          <div className="review-card">
            <h3>📋 Votre fiche d'apprentissage personnalisée</h3>

            <p className="review-intro">
              Retrouvez ci-dessous vos réponses ainsi que les bonnes pratiques à
              retenir.
            </p>

            {questions.map((question, index) => {
              const answer = answers[index];
              const userAnswer = answer
                ? question.options[answer.selectedIndex]
                : "Aucune réponse";
              const correctAnswer = question.options[question.correct];

              return (
                <div
                  key={index}
                  className={`review-item ${
                    answer?.isCorrect ? "review-correct" : "review-incorrect"
                  }`}
                >
                  <h4>
                    {index + 1}. {question.question}
                  </h4>

                  <div className="review-answer">
                    <span className="review-icon">
                      {answer?.isCorrect ? "✅" : "❌"}
                    </span>

                    <span>
                      <strong>Votre réponse :</strong> {userAnswer}
                    </span>
                  </div>

                  <div className="review-good-answer">
                    <strong>Bonne réponse :</strong> {correctAnswer}
                  </div>

                  <div className="review-explanation">
                    <span className="review-advice-icon">💡</span>
                    <span>{question.explanation}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="actions">
            <button className="secondary-button" onClick={startQuiz}>
              <RotateCcw size={18} /> Refaire le quiz
            </button>

            <button
              className="primary-button"
              onClick={() => {
                if (onExit) onExit();
              }}
            >
              Terminer
            </button>
          </div>
        </div>
      )}

      {step === "thanks" && (
        <div className="thanks fade-in">
          <div className="badge">
            <HeartHandshake size={16} /> Merci
          </div>

          <h1>Merci d'avoir participé !</h1>

          <p className="lead">
            Vous avez maintenant les premiers repères pour utiliser l'IA de
            façon plus efficace, plus responsable et plus critique dans la
            communication de votre club.
          </p>

          <button className="primary-button" onClick={startQuiz}>
            Recommencer
          </button>
        </div>
      )}
    </section>
  );
}