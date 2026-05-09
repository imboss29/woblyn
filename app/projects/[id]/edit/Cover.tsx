type FormData = {
  averagePrice?: string
  monthlyVolume?: string
  initialInvestment?: string
  launchDate?: string
  revenueY3?: string
  sector?: string
  legalStatus?: string
}

type CoverProps = {
  projectName: string
  logoUrl: string | null
  tagline: string | null
  formData: FormData
  bg: string
  text: string
  accent: string
  titleFont: string
  bodyFont: string
  templateStyle: string
}

export default function Cover({ projectName, logoUrl, tagline, formData, bg, text, accent, titleFont, bodyFont, templateStyle }: CoverProps) {
  const ca1 = (parseFloat(formData.averagePrice || '0') * parseFloat(formData.monthlyVolume || '0') * 12 * 0.65) || 0
  const investment = parseFloat(formData.initialInvestment || '0')
  const revenueY3 = parseFloat(formData.revenueY3 || '0')
  const year = new Date().getFullYear()

  return (
    <div className={`document-page cover-page template-${templateStyle}`} style={{
      width: '210mm',
      minHeight: '297mm',
      maxWidth: '100%',
      background: bg,
      padding: '80px 60px',
      boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
      fontFamily: `"${bodyFont}", sans-serif`,
      color: text,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
    }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          {logoUrl ? (
            <img src={logoUrl} alt="" style={{ height: '40px' }} />
          ) : <div />}
          <div style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '10px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: text,
            opacity: 0.5,
          }}>
            Document Confidentiel
          </div>
        </div>

        <div style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '12px',
          letterSpacing: '4px',
          textTransform: 'uppercase',
          color: accent,
          marginBottom: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <span style={{ width: '40px', height: '2px', background: accent }} />
          Business Plan {year}–{year + 2}
        </div>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '40px 0' }}>
        <h1 className="cover-title" style={{
          fontFamily: `"${titleFont}", serif`,
          fontSize: 'clamp(60px, 9vw, 120px)',
          fontWeight: 900,
          lineHeight: 0.95,
          letterSpacing: '-3px',
          color: text,
          marginBottom: tagline ? '24px' : '32px',
        }}>
          {projectName}
        </h1>

        {tagline && (
          <p style={{
            fontFamily: `"${titleFont}", serif`,
            fontSize: '24px',
            fontStyle: 'italic',
            fontWeight: 400,
            color: accent,
            lineHeight: 1.3,
            marginBottom: '32px',
            maxWidth: '600px',
          }}>
            « {tagline} »
          </p>
        )}

        {(formData.sector || formData.legalStatus) && (
          <div style={{
            display: 'flex',
            gap: '24px',
            paddingTop: '24px',
            borderTop: `1px solid ${text}30`,
            fontSize: '14px',
            color: text,
            opacity: 0.7,
            fontFamily: '"IBM Plex Mono", monospace',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            {formData.sector && <div>{formData.sector}</div>}
            {formData.legalStatus && <div>· {formData.legalStatus}</div>}
            {formData.launchDate && <div>· Lancement {formData.launchDate}</div>}
          </div>
        )}
      </div>

      <div>
        <div style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '11px',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          color: accent,
          marginBottom: '16px',
        }}>
          Chiffres clés
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px',
          paddingTop: '20px',
          borderTop: `2px solid ${text}`,
        }}>
          <KeyFigure label="CA Année 1" value={ca1 ? `${formatNumber(ca1)}€` : '—'} titleFont={titleFont} text={text} accent={accent} />
          <KeyFigure label="Investissement" value={investment ? `${formatNumber(investment)}€` : '—'} titleFont={titleFont} text={text} accent={accent} />
          <KeyFigure label="CA Année 3" value={revenueY3 ? `${formatNumber(revenueY3)}€` : '—'} titleFont={titleFont} text={text} accent={accent} />
        </div>

        <div style={{
          marginTop: '40px',
          paddingTop: '20px',
          borderTop: `1px solid ${text}20`,
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: '10px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          color: text,
          opacity: 0.5,
        }}>
          <span>Établi avec Woblyn</span>
          <span>{new Date().toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
        </div>
      </div>
    </div>
  )
}

function KeyFigure({ label, value, titleFont, text, accent }: { label: string, value: string, titleFont: string, text: string, accent: string }) {
  return (
    <div>
      <div style={{
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '10px',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        color: text,
        opacity: 0.6,
        marginBottom: '8px',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: `"${titleFont}", serif`,
        fontSize: '36px',
        fontWeight: 900,
        letterSpacing: '-1.5px',
        color: accent,
        lineHeight: 1,
      }}>
        {value}
      </div>
    </div>
  )
}

function formatNumber(n: number): string {
  return Math.round(n).toLocaleString('fr-FR')
}