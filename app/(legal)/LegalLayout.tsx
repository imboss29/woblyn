type Props = {
  title: string
  updated: string
  children: React.ReactNode
}

export default function LegalLayout({ title, updated, children }: Props) {
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
        <span>Document légal</span>
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
        <div style={{ width: '60px' }} />
      </nav>

      {/* CONTENT */}
      <article style={{
        maxWidth: '780px',
        margin: '0 auto',
        padding: '80px 40px 100px',
      }}>
        <div style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '11px',
          letterSpacing: '3px',
          color: '#a85b32',
          textTransform: 'uppercase',
          marginBottom: '16px',
        }}>
          Mise à jour : {updated}
        </div>
        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '64px',
          fontWeight: 900,
          letterSpacing: '-2px',
          lineHeight: 1.05,
          marginBottom: '40px',
          color: 'var(--ink)',
        }}>
          {title}
        </h1>

        <div className="legal-content">
          {children}
        </div>

        <div style={{
          marginTop: '60px',
          paddingTop: '40px',
          borderTop: '1px solid var(--gray-line)',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <a href="/mentions-legales" style={legalLinkStyle}>Mentions légales</a>
          <a href="/confidentialite" style={legalLinkStyle}>Confidentialité</a>
          <a href="/cgv" style={legalLinkStyle}>CGV</a>
          <a href="/cgu" style={legalLinkStyle}>CGU</a>
        </div>
      </article>

      {/* FOOTER */}
      <footer style={{
        background: 'var(--ink)',
        color: 'var(--paper)',
        padding: '40px 60px',
      }}>
        <div style={{
          maxWidth: '1300px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '24px', fontWeight: 900, letterSpacing: '-1px' }}>
            Woblyn
          </div>
          <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)' }}>
            © 2026 · Tous droits réservés
          </div>
        </div>
      </footer>
    </div>
  )
}

const legalLinkStyle: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--ink)',
  textDecoration: 'underline',
}