import React from "react";

export default function HomePage({ onStartQuiz }) {
  return (
    <main className="homepage">
      {/* Logo + Hero Section */}
      <div className="hero-wrapper">
        <div className="logo-header">
          <img
            src="/assets/logo_machina.svg"
            alt="Logo du club"
            className="logo-placeholder"
          />
        </div>

        <section className="hero-section">
          <h1 className="hero-title">
            Maîtrisez l'<span className="highlight">IA</span> pour la
            <br />
            communication de
            <br />
            <span className="highlight">votre club</span>
          </h1>
          <button className="primary-button" onClick={onStartQuiz}>
            Commencer
          </button>
          <p className="duration">⏱️ 10 minutes</p>
        </section>
      </div>

      {/* Section 1: Répondez à des situations concrètes */}
      <div className="content-wrapper">
        <section className="content-section">
          <div className="section-content">
            <h2>Répondez à des situations concrètes</h2>
            <p>
              Mettez-vous dans la peau d'un bénévole chargé de la communication
              et prenez les bonnes décisions face à des situations du quotidien.
            </p>
          </div>
          <div className="section-image">
            <img
              src="/assets/image1.png"
              alt="Interface quiz IA"
              className="image-placeholder"
            />
          </div>
        </section>

        {/* Section 2: Découvrez vos résultats */}
        <section className="content-section">
          <div className="section-image">
            <img
              src="/assets/image2.png"
              alt="Résultats du quiz"
              className="image-placeholder"
            />
          </div>
          <div className="section-content">
            <h2>Découvrez vos résultats et progressez</h2>
            <p>
              Obtenez un débriefing personnalisé, identifiez vos points de
              vigilance et découvrez les bonnes pratiques pour utiliser l'IA de
              manière plus efficace et responsable.
            </p>
          </div>
        </section>

        {/* Section 3: Repartez avec votre fiche mémo */}
        <section className="content-section">
          <div className="section-content">
            <h2>Repartez avec votre fiche mémo</h2>
            <p>
              À l'issue du parcours, recevez une fiche synthétique regroupant
              les conseils essentiels pour communiquer avec l'IA en toute
              confiance.
            </p>
          </div>
          <div className="section-image">
            <img
              src="/assets/image3.png"
              alt="Fiche mémo IA"
              className="image-placeholder"
            />
          </div>
        </section>
      </div>

      {/* CTA Section */}
      <section className="final-cta">
        <h2>Prêt à relever le défi ?</h2>
        <p>
          Testez vos connaissances, découvrez les bonnes pratiques et améliorez
          votre communication en seulement quelques minutes.
        </p>
        <button className="primary-button" onClick={onStartQuiz}>
          Commencer
        </button>
      </section>
    </main>
  );
}
