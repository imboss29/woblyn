export default function ExemplesPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      
      {/* TOPBAR */}
      <div style={{
        background: 'var(--ink)',
        color: 'var(--paper)',
        padding: '8px 60px',
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '11px',
        letterSpacing: '1px',
        display: 'flex',
        justifyContent: 'space-between',
        textTransform: 'uppercase',
      }}>
        <span>Galerie · Exemples</span>
        <span>Woblyn</span>
      </div>

      {/* NAV */}
      <nav style={{
        background: 'var(--paper)',
        padding: '24px 60px',
        borderBottom: '2px solid var(--ink)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <a href="/" style={{ fontSize: '12px', color: 'var(--ink)', textDecoration: 'none', fontFamily: '"IBM Plex Mono", monospace', letterSpacing: '2px', textTransform: 'uppercase' }}>
          ← Retour
        </a>
        <a href="/" style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '32px',
          fontWeight: 900,
          letterSpacing: '-1px',
          color: 'var(--ink)',
          textDecoration: 'none',
        }}>
          Woblyn
        </a>
        <a href="/signup" style={{
          background: 'var(--ink)',
          color: 'var(--paper)',
          padding: '10px 20px',
          fontSize: '12px',
          fontWeight: 600,
          letterSpacing: '1px',
          textTransform: 'uppercase',
          textDecoration: 'none',
          fontFamily: '"IBM Plex Mono", monospace',
        }}>
          Commencer →
        </a>
      </nav>

      {/* HERO */}
      <section style={{ padding: '80px 60px 60px', maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '12px',
          letterSpacing: '4px',
          color: '#a85b32',
          textTransform: 'uppercase',
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{ width: '40px', height: '2px', background: '#a85b32' }} />
          Galerie · Exemples
        </div>
        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '96px',
          fontWeight: 900,
          letterSpacing: '-3px',
          lineHeight: 0.95,
          color: 'var(--ink)',
          marginBottom: '32px',
        }}>
          Voyez par <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#1d4ed8' }}>vous-même</em>.
        </h1>
        <p style={{
          fontSize: '22px',
          fontWeight: 300,
          lineHeight: 1.5,
          color: 'var(--ink-soft)',
          maxWidth: '720px',
        }}>
          Voici à quoi ressemble Woblyn. Un produit qui transforme vos idées en business plans professionnels, prêts à convaincre.
        </p>
      </section>

      {/* FEATURES */}
      <section style={{ padding: '40px 60px 100px', maxWidth: '1300px', margin: '0 auto' }}>
        
        <Feature
          number="01"
          eyebrow="Tableau de bord"
          title="Tous vos business plans en un coup d'œil."
          description="Retrouvez vos projets, leurs statuts et accédez à votre espace personnalisé. Un seul endroit pour tout gérer."
          image="/screenshots/01-dashboard.png"
          reverse={false}
        />

        <Feature
          number="02"
          eyebrow="Questionnaire guidé"
          title="33 questions pour saisir l'essentiel de votre projet."
          description="Pas de jargon, pas d'expertise requise. Un parcours en 10 étapes qui couvre tout ce qu'attend un banquier ou un investisseur."
          image="/screenshots/02-questionnaire.png"
          reverse={true}
        />

        <Feature
          number="03"
          eyebrow="Page de couverture"
          title="Une première impression à la hauteur."
          description="Votre nom, votre logo, vos chiffres clés et une accroche générée par l'IA. Le format magazine financier qui inspire confiance."
          image="/screenshots/03-cover.png"
          reverse={false}
        />

        <Feature
          number="04"
          eyebrow="Tableaux structurés"
          title="Des données présentées avec clarté."
          description="L'IA structure automatiquement vos analyses en tableaux comparatifs : concurrence, projections, plan de financement. Lisible, pro, prêt à présenter."
          image="/screenshots/04-table.png"
          reverse={true}
        />

        <Feature
          number="05"
          eyebrow="Graphiques automatiques"
          title="Vos chiffres parlent d'eux-mêmes."
          description="Évolution du chiffre d'affaires sur 36 mois, répartition des charges, sources de financement. Tout est calculé et visualisé automatiquement."
          image="/screenshots/05-chart.png"
          reverse={false}
        />

        <Feature
          number="06"
          eyebrow="Personnalisation totale"
          title="Votre identité, à chaque page."
          description="Quatre templates radicalement différents, des couleurs personnalisables, votre logo, votre typographie. Le document devient le vôtre."
          image="/screenshots/06-customization.png"
          reverse={true}
        />

      </section>

      {/* CTA */}
      <section style={{
        padding: '120px 60px',
        background: 'var(--ink)',
        color: 'var(--paper)',
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '72px',
          fontWeight: 900,
          letterSpacing: '-2px',
          lineHeight: 1,
          marginBottom: '24px',
          maxWidth: '900px',
          margin: '0 auto 24px',
        }}>
          Votre business plan, <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#a85b32' }}>en 5 minutes</em>.
        </h2>
        <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', marginBottom: '40px', fontWeight: 300 }}>
          Prêt à essayer ? Créez le vôtre maintenant.
        </p>
        <a href="/signup" style={{
          background: '#a85b32',
          color: 'white',
          padding: '20px 40px',
          fontSize: '14px',
          fontWeight: 600,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          textDecoration: 'none',
          fontFamily: '"IBM Plex Mono", monospace',
          display: 'inline-block',
        }}>
          Commencer maintenant →
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '40px 60px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', fontWeight: 900, letterSpacing: '-1px' }}>Woblyn</div>
            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <a href="/mentions-legales" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>Mentions légales</a>
              <a href="/confidentialite" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>Confidentialité</a>
              <a href="/cgv" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>CGV</a>
              <a href="/cgu" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: '13px' }}>CGU</a>
            </div>
          </div>
          <div style={{ paddingTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>© 2026 · Tous droits réservés</div>
            <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>contact@woblyn.com</div>
          </div>
        </div>
      </footer>
    </div>
  )
}

function Feature({ number, eyebrow, title, description, image, reverse }: { number: string, eyebrow: string, title: string, description: string, image: string, reverse: boolean }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '60px',
      alignItems: 'center',
      padding: '60px 0',
      borderTop: '1px solid var(--gray-line)',
      direction: reverse ? 'rtl' : 'ltr',
    }}>
      <div style={{ direction: 'ltr' }}>
        <div style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '120px',
          fontWeight: 900,
          color: '#1d4ed8',
          opacity: 0.15,
          lineHeight: 0.8,
          marginBottom: '20px',
        }}>
          {number}
        </div>
        <div style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '11px',
          letterSpacing: '3px',
          color: '#a85b32',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          {eyebrow}
        </div>
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '40px',
          fontWeight: 900,
          letterSpacing: '-1.5px',
          lineHeight: 1.1,
          marginBottom: '20px',
          color: 'var(--ink)',
        }}>
          {title}
        </h2>
        <p style={{
          fontSize: '17px',
          fontWeight: 300,
          lineHeight: 1.6,
          color: 'var(--ink-soft)',
        }}>
          {description}
        </p>
      </div>
      <div style={{ direction: 'ltr' }}>
        <img src={image} alt={title} style={{
          width: '100%',
          border: '1px solid var(--gray-line)',
          boxShadow: '0 20px 60px rgba(13,27,42,0.12)',
          display: 'block',
        }} />
      </div>
    </div>
  )
}