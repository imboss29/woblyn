import MobileNav from './MobileNav'

export default function Home() {
  return (
    <>
      <div className="topbar"></div>

      <MobileNav />

      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">Édition Spéciale · IA Générative</div>
            <h1>Votre business plan, <em>en 5 minutes</em>.</h1>
            <p className="hero-lead">Pendant des décennies, rédiger un business plan a été l'épreuve obligatoire qui sépare les idées des projets concrets. Woblyn change la donne : en cinq minutes, l'intelligence artificielle produit votre première version complète. Vous l'ajustez, vous l'envoyez.</p>
            <div className="hero-actions">
              <a href="/signup" className="btn-primary">Commencer →</a>
              <a href="#" className="btn-secondary">Voir un exemple</a>
            </div>
            <div className="hero-meta">
              <div><strong>5 min</strong>pour la V1</div>
              <div><strong>97€</strong>par document</div>
              <div><strong>10+</strong>sections incluses</div>
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-quote">
              <div className="hero-quote-text">"On a obtenu notre prêt bancaire avec un business plan généré par Woblyn."</div>
              <div className="hero-quote-author">— Marc D., fondateur</div>
            </div>

            <div className="hero-doc">
              <div className="hero-doc-header">
                <div className="hero-doc-cat">Document Confidentiel</div>
                <div className="hero-doc-title">Business Plan 2025</div>
              </div>
              <div className="hero-doc-stat">
                <span>Chiffre d'affaires Y1</span>
                <strong>210 000€</strong>
              </div>
              <div className="hero-doc-stat">
                <span>Break-even</span>
                <strong>Mois 5</strong>
              </div>
              <div className="hero-doc-stat">
                <span>Marché adressable</span>
                <strong>2,4 Md€</strong>
              </div>
              <div className="hero-doc-stat" style={{ border: 'none' }}>
                <span>Financement requis</span>
                <strong>50 000€</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-head">
        <div className="section-cat">Article 01 · Le constat</div>
        <h2 className="section-title">Trois obstacles. Une <em>solution</em>.</h2>
      </div>

      <section className="problem">
        <div className="problem-grid">
          <div className="problem-item">
            <div className="problem-num">N° 01 — Le temps</div>
            <h3>Six semaines.</h3>
            <p>C'est le temps moyen passé par un entrepreneur à rédiger un business plan complet. Six semaines pendant lesquelles le projet n'avance pas, le marché évolue, les opportunités passent.</p>
          </div>
          <div className="problem-item">
            <div className="problem-num">N° 02 — Le coût</div>
            <h3>1 500€.</h3>
            <p>Le tarif moyen d'un cabinet spécialisé. Inaccessible pour la majorité des créateurs en phase d'amorçage, qui doivent souvent choisir entre business plan et trésorerie de démarrage.</p>
          </div>
          <div className="problem-item">
            <div className="problem-num">N° 03 — La qualité</div>
            <h3>40% de refus.</h3>
            <p>La part des dossiers de financement refusés à cause d'un business plan incomplet ou mal présenté. La forme compte autant que le fond — et les détails font la différence.</p>
          </div>
        </div>
      </section>

      <section className="process" id="solution">
        <div className="process-inner">
          <div className="section-cat">Article 02 · La méthode</div>
          <h2 className="section-title">Comment ça <em>fonctionne</em>.</h2>

          <div className="process-grid">
            <div className="process-step">
              <div className="process-step-num">I</div>
              <h3>Décrivez</h3>
              <p>Un questionnaire guidé vous permet d'expliquer votre projet en quelques minutes. Pas de jargon, pas d'expertise requise.</p>
            </div>
            <div className="process-step">
              <div className="process-step-num">II</div>
              <h3>Générez</h3>
              <p>L'intelligence artificielle rédige chaque section et calcule vos projections financières en respectant les standards du métier.</p>
            </div>
            <div className="process-step">
              <div className="process-step-num">III</div>
              <h3>Téléchargez</h3>
              <p>Votre document est mis en page automatiquement. Format PDF ou Word, prêt à être ajusté puis envoyé à votre banque ou vos investisseurs.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-head">
        <div className="section-cat">Article 03 · Les fonctionnalités</div>
        <h2 className="section-title">Tout ce qu'il <em>faut</em>, rien de superflu.</h2>
      </div>

      <section className="features">
        <div className="features-grid">
          <div className="feature">
            <div className="feature-num">01</div>
            <div>
              <h3>Rédaction professionnelle</h3>
              <p>Chaque section rédigée en langage clair et professionnel, adaptée à votre secteur d'activité et à l'audience visée.</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-num">02</div>
            <div>
              <h3>Projections financières</h3>
              <p>Compte de résultat prévisionnel, plan de trésorerie, point mort, tableaux de financement — tout est calculé automatiquement.</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-num">03</div>
            <div>
              <h3>Mise en page premium</h3>
              <p>Un design soigné qui inspire confiance, avec votre logo et vos couleurs. Sans manipuler Word ou PowerPoint.</p>
            </div>
          </div>
          <div className="feature">
            <div className="feature-num">04</div>
            <div>
              <h3>Export instantané</h3>
              <p>Téléchargez votre document en PDF ou Word en un clic, prêt à être envoyé à un banquier, un investisseur ou un partenaire.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing" id="pricing">
        <div className="pricing-inner">
          <div className="section-cat">Article 04 · Tarifs</div>
          <h2 className="section-title">Une grille <em>simple</em>.</h2>

          <div className="pricing-grid">
            <div className="plan">
              <div className="plan-name">Free</div>
              <div className="plan-price">0€</div>
              <div className="plan-desc">Pour découvrir Woblyn.</div>
              <ul className="plan-features">
                <li>Aperçu 3 sections</li>
                <li>Projections masquées</li>
                <li className="disabled">Export PDF / Word</li>
              </ul>
              <a href="/signup" className="plan-btn">Commencer</a>
            </div>
            <div className="plan">
              <div className="plan-name">Starter</div>
              <div className="plan-price">97€</div>
              <div className="plan-desc">Paiement unique.</div>
              <ul className="plan-features">
                <li>1 business plan complet</li>
                <li>Projections financières</li>
                <li>Export PDF + Word</li>
                <li>Design professionnel</li>
              </ul>
              <a href="/signup" className="plan-btn">Acheter</a>
            </div>
            <div className="plan featured plan-soon">
              <div className="plan-soon-badge">Bientôt disponible</div>
              <div className="plan-name">Pro · Populaire</div>
              <div className="plan-price">149€<span>/mois</span></div>
              <div className="plan-desc">Pour les actifs.</div>
              <ul className="plan-features">
                <li>Plans illimités</li>
                <li>Projections avancées</li>
                <li>Export PDF + Word</li>
                <li>Historique complet</li>
                <li>Support prioritaire</li>
              </ul>
              <a href="mailto:contact@woblyn.com?subject=Liste d'attente Pro" className="plan-btn plan-btn-soon">Rejoindre la liste d'attente</a>
            </div>
            <div className="plan plan-soon">
              <div className="plan-soon-badge">Bientôt disponible</div>
              <div className="plan-name">Business</div>
              <div className="plan-price">299€<span>/mois</span></div>
              <div className="plan-desc">Cabinets & incubateurs.</div>
              <ul className="plan-features">
                <li>Tout le Pro</li>
                <li>10 utilisateurs</li>
                <li>Multi-projets</li>
                <li>Onboarding dédié</li>
              </ul>
              <a href="mailto:contact@woblyn.com?subject=Liste d'attente Business" className="plan-btn plan-btn-soon">Rejoindre la liste d'attente</a>
            </div>
          </div>
        </div>
      </section>

      <div className="section-head">
  <div className="section-cat">Article 05 · Aperçu</div>
  <h2 className="section-title">Le produit, en <em>images</em>.</h2>
</div>

<section style={{ padding: '60px 60px 100px', maxWidth: '1300px', margin: '0 auto' }}>
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px', marginBottom: '40px' }}>
    <div>
      <div style={{
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '11px',
        letterSpacing: '3px',
        color: '#a85b32',
        textTransform: 'uppercase',
        marginBottom: '12px',
      }}>
        N° 01 — Tableau de bord
      </div>
      <h3 style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '28px',
        fontWeight: 900,
        letterSpacing: '-1px',
        lineHeight: 1.1,
        marginBottom: '12px',
        color: 'var(--ink)',
      }}>
        Tous vos plans en un endroit.
      </h3>
      <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--ink-soft)', fontWeight: 300 }}>
        Retrouvez vos projets, leurs statuts et accédez à votre espace personnalisé.
      </p>
    </div>
    <img src="/screenshots/01-dashboard.png" alt="Dashboard" style={{
      width: '100%',
      border: '1px solid var(--gray-line)',
      boxShadow: '0 20px 60px rgba(13,27,42,0.12)',
    }} />
  </div>

  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px', marginBottom: '40px' }}>
    <img src="/screenshots/03-cover.png" alt="Couverture" style={{
      width: '100%',
      border: '1px solid var(--gray-line)',
      boxShadow: '0 20px 60px rgba(13,27,42,0.12)',
    }} />
    <div>
      <div style={{
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '11px',
        letterSpacing: '3px',
        color: '#a85b32',
        textTransform: 'uppercase',
        marginBottom: '12px',
      }}>
        N° 02 — Page de couverture
      </div>
      <h3 style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '28px',
        fontWeight: 900,
        letterSpacing: '-1px',
        lineHeight: 1.1,
        marginBottom: '12px',
        color: 'var(--ink)',
      }}>
        Une première impression à la hauteur.
      </h3>
      <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--ink-soft)', fontWeight: 300 }}>
        Votre nom, votre logo, vos chiffres clés et une accroche générée par l'IA.
      </p>
    </div>
  </div>

  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '40px', marginBottom: '40px' }}>
    <div>
      <div style={{
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '11px',
        letterSpacing: '3px',
        color: '#a85b32',
        textTransform: 'uppercase',
        marginBottom: '12px',
      }}>
        N° 03 — Graphiques automatiques
      </div>
      <h3 style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '28px',
        fontWeight: 900,
        letterSpacing: '-1px',
        lineHeight: 1.1,
        marginBottom: '12px',
        color: 'var(--ink)',
      }}>
        Vos chiffres parlent d'eux-mêmes.
      </h3>
      <p style={{ fontSize: '15px', lineHeight: 1.7, color: 'var(--ink-soft)', fontWeight: 300 }}>
        Évolution du chiffre d'affaires, charges, financement. Tout est calculé et visualisé automatiquement.
      </p>
    </div>
    <img src="/screenshots/05-chart.png" alt="Graphiques" style={{
      width: '100%',
      border: '1px solid var(--gray-line)',
      boxShadow: '0 20px 60px rgba(13,27,42,0.12)',
    }} />
  </div>

  <div style={{ textAlign: 'center', marginTop: '60px' }}>
    <a href="/exemples" style={{
      background: 'transparent',
      color: 'var(--ink)',
      border: '1px solid var(--ink)',
      padding: '16px 32px',
      fontSize: '13px',
      fontWeight: 600,
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      textDecoration: 'none',
      fontFamily: '"IBM Plex Mono", monospace',
      display: 'inline-block',
    }}>
      Voir tous les exemples →
    </a>
  </div>
</section>

  <div style={{
  maxWidth: '1300px',
  margin: '0 auto',
  padding: '40px 60px',
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
}}>
  <div style={{ flex: 1, height: '1px', background: 'var(--ink)' }} />
  <div style={{
    fontFamily: '"IBM Plex Mono", monospace',
    fontSize: '11px',
    letterSpacing: '3px',
    color: '#a85b32',
    textTransform: 'uppercase',
  }}>
    ◆ ◆ ◆
  </div>
  <div style={{ flex: 1, height: '1px', background: 'var(--ink)' }} />
</div>
      <section className="cta-section">
        <h2 className="cta-quote">Votre business plan, <em>en 5 minutes</em>.</h2>
        <a href="/signup" className="btn-primary">Commencer maintenant →</a>
      </section>

      <footer>
  <div className="footer-inner" style={{ flexDirection: 'column', gap: '32px', alignItems: 'flex-start' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <div className="footer-logo">Woblyn</div>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <a href="/mentions-legales" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>Mentions légales</a>
        <a href="/confidentialite" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>Confidentialité</a>
        <a href="/cgv" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>CGV</a>
        <a href="/cgu" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>CGU</a>
      </div>
    </div>
    <div style={{ width: '100%', paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div className="footer-meta">© 2026 · Tous droits réservés</div>
      <div className="footer-meta">contact@woblyn.com</div>
    </div>
  </div>
</footer>
    </>
  )
}