import MobileNav from './MobileNav'
import WaitlistModal from './WaitlistModal'
import WaitlistButton from './WaitlistButton'

export default function Home() {
  return (
    <>
      <div className="topbar"></div>

      <MobileNav />

      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-eyebrow">Le BP qui débloque votre financement</div>
            <h1>Votre business<br/>plan, <em>en&nbsp;5&nbsp;minutes</em>.</h1>
            <p className="hero-lead">Pendant des décennies, rédiger un business plan a été l'épreuve obligatoire qui sépare les idées des projets concrets. Woblyn change la donne : en 5 minutes, vous obtenez votre première version complète. Vous l'ajustez, vous l'envoyez à votre banque ou à vos investisseurs.</p>
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
  <div className="hero-quote-text">"Le rendu est bluffant. Mon banquier a tout de suite pris mon projet au sérieux."</div>
  <div className="hero-quote-author">— Mélanie S., cliente Woblyn</div>
</div>

            <div className="hero-doc">
              <div className="hero-doc-header">
                <div className="hero-doc-cat">Exemple · Aperçu Woblyn</div>
                <div className="hero-doc-title">Business Plan 2026</div>
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
        <div className="section-cat">Article 01 · Le constat du marché</div>
        <h2 className="section-title">Pourquoi <em>80%</em> des entrepreneurs<br/>échouent à finir leur Business Plan.</h2>
        <p style={{ fontSize: '16px', color: 'var(--ink-soft)', marginTop: '16px', maxWidth: '700px', fontWeight: 300, lineHeight: 1.6 }}>
          Voici les trois obstacles auxquels chaque créateur d'entreprise est confronté aujourd'hui, et que Woblyn a été conçu pour résoudre.
        </p>
      </div>

      <section className="problem">
        <div className="problem-grid">
          <div className="problem-item">
            <div className="problem-num">Obstacle 01 — Le temps</div>
            <h3>Six semaines.</h3>
            <p>C'est le temps moyen passé par un entrepreneur à rédiger un business plan classique. Six semaines pendant lesquelles le projet n'avance pas, le marché évolue, les opportunités passent. <strong>Avec Woblyn : 5 minutes.</strong></p>
          </div>
          <div className="problem-item">
            <div className="problem-num">Obstacle 02 — Le coût</div>
            <h3>1 500€.</h3>
            <p>Le tarif moyen d'un cabinet spécialisé pour rédiger un business plan. Inaccessible pour la majorité des créateurs en phase d'amorçage. <strong>Avec Woblyn : 97€ en paiement unique.</strong></p>
          </div>
          <div className="problem-item">
            <div className="problem-num">Obstacle 03 — La qualité</div>
            <h3>40% de refus.</h3>
            <p>La part des dossiers de financement refusés à cause d'un business plan incomplet ou mal présenté. La forme compte autant que le fond. <strong>Avec Woblyn : un rendu professionnel, prêt à présenter.</strong></p>
          </div>
        </div>
      </section>

      <div className="section-head">
        <div className="section-cat">Article 02 · Les usages</div>
        <h2 className="section-title">Pourquoi vous avez besoin <em>d'un business plan</em>.</h2>
        <p style={{ fontSize: '16px', color: 'var(--ink-soft)', marginTop: '16px', maxWidth: '700px', fontWeight: 300, lineHeight: 1.6 }}>
          Quel que soit votre objectif, un business plan professionnel reste le document indispensable pour transformer une idée en projet crédible.
        </p>
      </div>

      <section className="problem">
        <div className="problem-grid">
          <div className="problem-item">
            <div className="problem-num">Usage 01 — Démarrage</div>
            <h3>Création d'entreprise.</h3>
            <p>Pour structurer votre projet, valider sa viabilité économique et clarifier votre stratégie avant de vous lancer. Le BP devient votre <strong>document de cadrage</strong>, indispensable pour convaincre vos premiers partenaires.</p>
          </div>
          <div className="problem-item">
            <div className="problem-num">Usage 02 — Financement</div>
            <h3>Prêt bancaire.</h3>
            <p>Pour obtenir un <strong>prêt professionnel</strong> auprès de la BPI France, d'une banque traditionnelle ou via un prêt d'honneur. Les banquiers exigent des projections financières détaillées et un plan de remboursement crédible.</p>
          </div>
          <div className="problem-item">
            <div className="problem-num">Usage 03 — Investisseurs</div>
            <h3>Levée de fonds.</h3>
            <p>Pour convaincre des <strong>business angels, fonds d'investissement ou VC</strong>. Le BP devient votre support de pitch et votre data room. Focus sur la vision, le marché adressable, l'équipe et le potentiel de croissance.</p>
          </div>
        </div>
      </section>

      <section className="process" id="solution">
        <div className="process-inner">
          <div className="section-cat">Article 03 · La méthode</div>
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
  <p>Woblyn rédige chaque section et calcule vos projections financières en respectant les standards du métier. En 5 minutes chrono.</p>
</div>
            <div className="process-step">
              <div className="process-step-num">III</div>
              <h3>Téléchargez</h3>
              <p>Votre document est mis en page automatiquement. Format PDF, prêt à être ajusté puis envoyé à votre banque ou vos investisseurs.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-head">
        <div className="section-cat">Article 04 · Les fonctionnalités</div>
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
              <p>Téléchargez votre document en PDF en un clic, prêt à être envoyé à un banquier, un investisseur ou un partenaire.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pricing" id="pricing">
        <div className="pricing-inner">
          <div className="section-cat">Article 05 · Tarifs</div>
          <h2 className="section-title">Une grille <em>simple</em>.</h2>

          <div className="pricing-grid">
            <div className="plan">
              <div className="plan-name">Free</div>
              <div className="plan-price">0€</div>
              <div className="plan-desc">Pour découvrir Woblyn.</div>
              <ul className="plan-features">
                <li>Aperçu 3 sections</li>
                <li>Projections masquées</li>
                <li className="disabled">Export PDF</li>
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
                <li>Export PDF</li>
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
                <li>Export PDF</li>
                <li>Historique complet</li>
                <li>Support prioritaire</li>
              </ul>
<WaitlistButton plan="pro" />           </div>
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
<WaitlistButton plan="business" />          </div>
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
        <h2 className="cta-quote">Votre business plan, <em>en&nbsp;5&nbsp;minutes</em>.</h2>
        <a href="/signup" className="btn-primary">Commencer maintenant →</a>
      </section>

      <footer>
  <div className="footer-inner" style={{ flexDirection: 'column', gap: '32px', alignItems: 'flex-start' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      <div className="footer-logo">Woblyn</div>
      <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
        <a href="/contact" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>Contact</a>
<a href="/faq" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>FAQ</a>
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
      <WaitlistModal />
    </>
  )
}