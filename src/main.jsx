import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { CheckCircle2, XCircle, RotateCcw, Sparkles, Trophy, HeartHandshake } from 'lucide-react';
import './styles.css';

const questions = [
  {
    question: "Quel est l’objectif principal de l’IA dans un club sportif associatif ?",
    options: [
      "Remplacer les bénévoles",
      "Faire gagner du temps sur certaines tâches",
      "Prendre toutes les décisions du club",
      "Gérer automatiquement les adhérents"
    ],
    correct: 1,
    explanation:
      "L’IA est un outil d’assistance qui permet de gagner du temps sur certaines tâches répétitives ou créatives."
  },
  {
    question: "L’IA peut être utile pour quel type de tâche dans un club ?",
    options: [
      "Créer des publications pour les réseaux sociaux",
      "Arbitrer les matchs",
      "Signer des contrats à la place du président",
      "Encadrer les entraînements seule"
    ],
    correct: 0,
    explanation:
      "L’IA peut aider à créer du contenu, trouver des idées ou rédiger des textes pour la communication."
  },
  {
    question: "Quand un club utilise l’IA pour communiquer, que doit-il toujours garder en tête ?",
    options: [
      "Que l’IA a toujours raison",
      "Qu’il faut vérifier les contenus générés",
      "Qu’il faut publier rapidement sans relire",
      "Que les informations sont forcément exactes"
    ],
    correct: 1,
    explanation:
      "L’IA peut produire des erreurs ou des informations inexactes. Une vérification humaine reste indispensable."
  },
  {
    question: "Quel est un risque important si un club utilise mal l’IA ?",
    options: [
      "Améliorer sa communication",
      "Gagner du temps",
      "Diffuser des informations erronées",
      "Créer davantage d’idées"
    ],
    correct: 2,
    explanation:
      "Une mauvaise utilisation de l’IA peut entraîner la diffusion de contenus faux ou trompeurs."
  },
  {
    question: "Quelle information ne doit pas être donnée à un outil d’IA sans précaution ?",
    options: [
      "Le programme d’un entraînement",
      "Une affiche publique",
      "Des données personnelles d’adhérents",
      "Le logo du club"
    ],
    correct: 2,
    explanation:
      "Les données personnelles doivent être protégées et ne pas être partagées sans garanties adaptées."
  },
  {
    question: "Quel est le rôle de l’humain dans une communication assistée par l’IA ?",
    options: [
      "Aucun rôle",
      "Valider et adapter les contenus",
      "Copier-coller systématiquement",
      "Laisser l’IA gérer seule"
    ],
    correct: 1,
    explanation:
      "L’humain reste responsable du contenu publié et doit le relire, le corriger et l'adapter."
  },
  {
    question: "L’IA peut aider un club sur les réseaux sociaux en permettant de :",
    options: [
      "Créer des idées de publications",
      "Remplacer totalement le community manager",
      "Garantir le succès des publications",
      "Répondre automatiquement sans contrôle"
    ],
    correct: 0,
    explanation:
      "L’IA est particulièrement utile pour trouver des idées, rédiger des brouillons ou créer des visuels."
  },
  {
    question: "Quel usage de l’IA est le plus pertinent pour un bénévole chargé de la communication ?",
    options: [
      "Préparer un premier brouillon de publication",
      "Publier automatiquement sans lecture",
      "Gérer seul les réseaux sociaux",
      "Répondre à tous les adhérents sans contrôle"
    ],
    correct: 0,
    explanation:
      "L’IA est très efficace pour produire un premier jet qui sera ensuite amélioré par le bénévole."
  },
  {
    question: "Dans quel cas vaut-il mieux éviter d’utiliser l’IA seule ?",
    options: [
      "Pour rédiger une publication simple",
      "Pour vérifier une information sensible ou officielle",
      "Pour trouver des idées d'événements",
      "Pour reformuler un texte"
    ],
    correct: 1,
    explanation:
      "Les informations importantes doivent être vérifiées auprès de sources fiables avant publication."
  },
  {
    question: "Quel est le meilleur réflexe face à un texte généré par l’IA ?",
    options: [
      "Le publier immédiatement",
      "Le modifier sans le lire",
      "Le relire et le vérifier",
      "Le considérer comme parfait"
    ],
    correct: 2,
    explanation:
      "Une relecture permet de corriger les erreurs, d'adapter le ton et de vérifier les informations."
  },
  {
    question: "Pour l’automatisation interne, quel contenu demande le plus de prudence ?",
    options: [
      "Les publications publiques",
      "Les données personnelles des adhérents",
      "Les horaires des matchs",
      "Les résultats sportifs"
    ],
    correct: 1,
    explanation:
      "Les données personnelles sont protégées et nécessitent une vigilance particulière."
  },
  {
    question: "Si un club veut utiliser l’IA pour les réseaux sociaux, quelle pratique est la plus responsable ?",
    options: [
      "Publier automatiquement",
      "Relire et adapter chaque publication",
      "Faire confiance à 100 % à l’IA",
      "Ne jamais vérifier les sources"
    ],
    correct: 1,
    explanation:
      "L’IA doit assister la création de contenu, mais la validation finale doit rester humaine."
  },
  {
    question: "Quelle est la meilleure façon d’écrire une consigne à une IA ?",
    options: [
      "Être vague",
      "Donner le moins d’informations possible",
      "Être précis et donner du contexte",
      "Écrire uniquement quelques mots"
    ],
    correct: 2,
    explanation:
      "Plus la consigne est claire et détaillée, plus la réponse de l’IA sera pertinente."
  },
  {
    question: "Un club prépare une annonce pour prévenir d’un changement d’horaire d’entraînement. Quel est le meilleur usage de l’IA ?",
    options: [
      "Rédiger un brouillon qui sera vérifié avant diffusion",
      "Envoyer automatiquement le message",
      "Modifier seule les horaires",
      "Décider du nouvel horaire"
    ],
    correct: 0,
    explanation:
      "L’IA peut aider à rédiger le message mais ne doit pas remplacer la validation humaine."
  },
  {
    question: "Le club veut publier un message après une défaite importante. Quel point doit être le plus surveillé ?",
    options: [
      "Le ton du message",
      "La longueur du texte",
      "Le nombre d’emojis",
      "La couleur du visuel"
    ],
    correct: 0,
    explanation:
      "L’IA ne comprend pas toujours le contexte émotionnel. Le ton doit être soigneusement vérifié."
  },
  {
    question: "Pourquoi est-il utile de se former à l’IA avant de l’utiliser régulièrement dans un club ?",
    options: [
      "Pour comprendre ses possibilités et ses limites",
      "Pour remplacer les bénévoles",
      "Pour éviter toute relecture",
      "Pour automatiser entièrement la communication"
    ],
    correct: 0,
    explanation:
      "Comprendre le fonctionnement de l’IA permet de mieux l’utiliser et d’éviter les erreurs."
  },
  {
    question: "À la fin de ce quiz, quelle idée faut-il retenir en priorité ?",
    options: [
      "L’IA remplace les compétences humaines",
      "L’IA doit être utilisée sans contrôle",
      "L’IA est un outil d’aide qui nécessite un regard critique",
      "L’IA est toujours fiable"
    ],
    correct: 2,
    explanation:
      "L’IA est un excellent assistant mais la responsabilité et la validation restent humaines."
  }
];

function App() {
  const [step, setStep] = useState('intro');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [answers, setAnswers] = useState([]);

  const currentQuestion = questions[currentIndex];
  const score = answers.filter((answer) => answer.isCorrect).length;
  const percentage = Math.round((score / questions.length) * 100);

const weakQuestions = useMemo(() => {
  return questions
    .map((question, index) => ({ question, answer: answers[index] }))
    .filter((item) => item.answer && !item.answer.isCorrect)
    .map((item) => item.question.question);
}, [answers]);

  const startQuiz = () => {
    setStep('quiz');
    setCurrentIndex(0);
    setSelectedIndex(null);
    setAnswers([]);
  };

  const selectAnswer = (index) => {
    if (selectedIndex !== null) return;
    const isCorrect = index === currentQuestion.correct;
    setSelectedIndex(index);
    setAnswers((previous) => [...previous, { selectedIndex: index, isCorrect }]);
  };

  const nextQuestion = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((previous) => previous + 1);
      setSelectedIndex(null);
    } else {
      setStep('result');
    }
  };

  const getAdvice = () => {
    if (percentage >= 80) {
      return {
        title: 'Très bon niveau',
        text: "Vous avez compris l'essentiel : l'IA est un outil utile, mais elle doit être encadrée, vérifiée et adaptée à l'identité du club."
      };
    }

    if (percentage >= 50) {
      return {
        title: 'Bonnes bases, mais quelques réflexes à consolider',
        text: `Revoyez surtout les questions liées à : ${weakQuestions.slice(0, 3).join(', ') || 'les bonnes pratiques'}.`      };
    }

    return {
      title: 'Points de vigilance importants',
      text: "Il faut revoir les limites de l'IA, la vérification des informations et la personnalisation des contenus. Ces réflexes protègent l'image du club et améliorent la qualité de la communication."
    };
  };

  const advice = getAdvice();

  return (
    <main className="app-shell">
      <section className="hero-card">
        {step === 'intro' && (
          <div className="intro fade-in">
            <div className="badge"><Sparkles size={16} /> Kit de sensibilisation IA</div>
            <h1>IA dans le sport</h1>
            <p className="lead">
                Ce kit d’introduction est conçu pour les clubs sportifs locaux. Découvrez comment l’intelligence artificielle peut aider votre club et découvrez ses opportunités, ses risques et ses limites pour la communication interne et sur les réseaux sociaux.            </p>
            <button className="primary-button" onClick={startQuiz}>Démarrer le quiz</button>
          </div>
        )}

        {step === 'quiz' && (
          <div className="quiz fade-in">
            <div className="topline">
              <span>Question {currentIndex + 1}/{questions.length}</span>
            </div>

            <div className="progress" aria-label="Progression du quiz">
              <span style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }} />
            </div>

            <h2>{currentQuestion.question}</h2>

            <div className="answers-list">
              {currentQuestion.options.map((answer, index) => {
                const isSelected = selectedIndex === index;
                const isCorrect = index === currentQuestion.correct;
                const buttonClass = selectedIndex === null
                  ? ''
                  : isSelected && isCorrect
                    ? 'correct'
                    : isSelected && !isCorrect
                      ? 'incorrect'
                      : isCorrect
                        ? 'reveal-correct'
                        : 'disabled';

                return (
                  <button key={answer} className={`answer-button ${buttonClass}`} onClick={() => selectAnswer(index)}>
                    <span>{answer}</span>
                    {isSelected && isCorrect && <CheckCircle2 size={22} />}
                    {isSelected && !isCorrect && <XCircle size={22} />}
                  </button>
                );
              })}
            </div>

            {selectedIndex !== null && (
              <div className="explanation">
                <strong>{selectedIndex === currentQuestion.correct ? 'Bonne réponse.' : 'Réponse à corriger.'}</strong>
                <p>{currentQuestion.explanation}</p>
                <button className="primary-button" onClick={nextQuestion}>
                  {currentIndex + 1 < questions.length ? 'Question suivante' : 'Voir mon score'}
                </button>
              </div>
            )}
          </div>
        )}

        {step === 'result' && (
          <div className="result fade-in">
            <div className="badge"><Trophy size={16} /> Résultat</div>
            <h1>{score}/{questions.length} bonnes réponses</h1>
            <div className="score-circle" style={{ background: `conic-gradient(#80a86f ${percentage}%, #f2e8dd 0)` }}><span>{percentage}%</span></div>
            <h2>{advice.title}</h2>
            <p className="lead">{advice.text}</p>

         <div className="memo-card">
           <strong>À retenir</strong>
           <ul>
             <li>L'IA permet de gagner du temps, mais ne remplace pas la vérification humaine.</li>
             <li>Chaque contenu doit être adapté au ton, aux valeurs et aux informations réelles du club.</li>
             <li>Les visuels et textes générés peuvent poser des problèmes de qualité, de droits ou de confiance.</li>
           </ul>
         </div>

         <div className="review-card">
           <h3>📋 Votre fiche d'apprentissage personnalisée</h3>

           <p className="review-intro">
             Retrouvez ci-dessous vos réponses ainsi que les bonnes pratiques à retenir.
           </p>

           {questions.map((question, index) => {
             const answer = answers[index];

             return (
               <div
                 key={index}
                 className={`review-item ${
                   answer?.isCorrect ? 'review-correct' : 'review-incorrect'
                 }`}
               >
                 <h4>
                   {answer?.isCorrect ? '✅' : '❌'} {question.question}
                 </h4>

                 <p>
                   <strong>Votre réponse :</strong>{" "}
                   {question.options[answer.selectedIndex]}
                 </p>

                 {!answer.isCorrect && (
                   <p>
                     <strong>Bonne réponse :</strong>{" "}
                     {question.options[question.correct]}
                   </p>
                 )}

                 <p className="review-explanation">
                   {question.explanation}
                 </p>
               </div>
             );
           })}
         </div>

            <div className="actions">
              <button className="secondary-button" onClick={startQuiz}><RotateCcw size={18} /> Refaire le quiz</button>
              <button className="primary-button" onClick={() => setStep('thanks')}>Terminer</button>
            </div>
          </div>
        )}

        {step === 'thanks' && (
          <div className="thanks fade-in">
            <div className="badge"><HeartHandshake size={16} /> Merci</div>
            <h1>Merci d'avoir participé !</h1>
            <p className="lead">
              Vous avez maintenant les premiers repères pour utiliser l'IA de façon plus efficace, plus responsable et plus critique dans la communication de votre club.
            </p>
            <button className="primary-button" onClick={startQuiz}>Recommencer</button>
          </div>
        )}
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
