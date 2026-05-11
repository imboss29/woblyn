'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { SECTION_KEYS, SECTION_LABELS_FR, SECTION_LABELS_EN, SectionKey } from '../../../../lib/prompts'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Project = {
  id: string
  name: string
  content: any
  contentEN: any
  contentFR: any
  formData: any
  isPaid: boolean
  language: string | null
  hasTranslation: boolean
  theme: string
  bgColor: string | null
  textColor: string | null
  accentColor: string | null
  titleFont: string | null
  bodyFont: string | null
  fontSize: string | null
  logoUrl: string | null
  tagline: string | null
}

const themes: any = {
  editorial: { bgColor: '#f4f1ea', textColor: '#0d1b2a', accentColor: '#a85b32', titleFont: 'Playfair Display', bodyFont: 'IBM Plex Sans' },
  classic: { bgColor: '#ffffff', textColor: '#0a1933', accentColor: '#1d4ed8', titleFont: 'Fraunces', bodyFont: 'Inter' },
  modern: { bgColor: '#fafafa', textColor: '#171717', accentColor: '#6366f1', titleFont: 'Geist', bodyFont: 'Geist' },
  premium: { bgColor: '#0d0d0d', textColor: '#f5f1e8', accentColor: '#c9a558', titleFont: 'Cormorant Garamond', bodyFont: 'Cormorant Garamond' },
}

export default function PdfRenderPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const id = params.id as string
  const lang = (searchParams.get('lang') || 'fr') as 'fr' | 'en'

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = searchParams.get('token')
    const url = token 
      ? `/api/projects/${id}?token=${token}` 
      : `/api/projects/${id}`
    
    fetch(url)
      .then(res => res.json())
      .then(data => {
        if (data.error) { router.push('/dashboard'); return }
        if (!data.isPaid) { router.push(`/projects/${id}`); return }
        setProject(data)
        setLoading(false)
      })
      .catch(() => router.push('/dashboard'))
  }, [id, router, searchParams])

  if (loading || !project) {
    return <div style={{ padding: 40 }}>Chargement...</div>
  }

  const themeKey = project.theme in themes ? project.theme : 'editorial'
  const baseTheme = themes[themeKey]
  const bg = project.bgColor || baseTheme.bgColor
  const text = project.textColor || baseTheme.textColor
  const accent = project.accentColor || baseTheme.accentColor
  const titleFont = project.titleFont || baseTheme.titleFont
  const bodyFont = project.bodyFont || baseTheme.bodyFont

  let content = project.content
  if (lang === 'en' && project.contentEN) content = project.contentEN
  if (lang === 'fr' && project.contentFR) content = project.contentFR

  const labels = lang === 'en' ? SECTION_LABELS_EN : SECTION_LABELS_FR

  const fd = project.formData || {}

// Format un nombre en €
const formatEuro = (n: number): string => {
  if (!n || isNaN(n)) return ''
  return new Intl.NumberFormat('fr-FR').format(Math.round(n)) + '€'
}

// Calcul du CA Année 1 (montée en charge linéaire 30% → 100%)
const monthlyVolume = parseFloat(fd.monthlyVolume) || 0
const averagePrice = parseFloat(fd.averagePrice) || 0
const ca1Raw = monthlyVolume && averagePrice 
  ? monthlyVolume * averagePrice * 12 * 0.65 // 65% = moyenne montée en charge
  : 0

const ca1 = ca1Raw ? formatEuro(ca1Raw) : ''
const ca3 = fd.revenueY3 ? formatEuro(parseFloat(fd.revenueY3)) : ''
const invest = fd.initialInvestment ? formatEuro(parseFloat(fd.initialInvestment)) : ''

  const today = new Date().toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US', {
    day: 'numeric', month: 'long', year: 'numeric',
  })

  return (
    <>
      <style jsx global>{`
        @page {
  size: A4;
  margin: 0;
}
        @import url('https://fonts.googleapis.com/css2?family=${titleFont.replace(/ /g, '+')}:wght@400;700;900&family=${bodyFont.replace(/ /g, '+')}:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');
        
        * { box-sizing: border-box; }
        
        body {
          margin: 0;
          padding: 0;
          background: ${bg};
          color: ${text};
          font-family: "${bodyFont}", sans-serif;
          font-size: 11pt;
          line-height: 1.55;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
        }

        .cover {
  padding: 25mm 22mm;
          page-break-after: always;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .cover-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: "IBM Plex Mono", monospace;
          font-size: 9pt;
          letter-spacing: 2px;
          text-transform: uppercase;
          color: ${text};
          opacity: 0.6;
          margin-bottom: 30mm;
        }
        
        .cover-accent {
          display: inline-block;
          width: 30pt;
          height: 2pt;
          background: ${accent};
          margin-right: 12pt;
          vertical-align: middle;
        }
        
        .cover-eyebrow {
          font-family: "IBM Plex Mono", monospace;
          font-size: 10pt;
          letter-spacing: 3px;
          color: ${accent};
          text-transform: uppercase;
          margin-bottom: 20pt;
        }
        
        .cover-title {
          font-family: "${titleFont}", serif;
          font-size: 56pt;
          font-weight: 900;
          letter-spacing: -2pt;
          line-height: 0.95;
          color: ${text};
          margin: 0 0 20pt 0;
        }
        
        .cover-divider {
          border: none;
          border-top: 1pt solid ${text};
          opacity: 0.2;
          margin: 18pt 0;
        }
        
        .cover-meta {
          font-family: "IBM Plex Mono", monospace;
          font-size: 10pt;
          letter-spacing: 2pt;
          text-transform: uppercase;
          color: ${text};
          opacity: 0.7;
        }
        
        .cover-meta span + span::before {
          content: ' · ';
          margin: 0 6pt;
        }
        
        .cover-spacer {
          flex: 1;
        }
        
        .cover-figures-label {
          font-family: "IBM Plex Mono", monospace;
          font-size: 9pt;
          letter-spacing: 3pt;
          text-transform: uppercase;
          color: ${accent};
          margin-bottom: 12pt;
        }
        
        .cover-figures-divider {
          border: none;
          border-top: 1pt solid ${text};
          margin-bottom: 16pt;
        }
        
        .cover-figures {
          display: flex;
          justify-content: space-between;
          gap: 24pt;
        }
        
        .figure {
          flex: 1;
        }
        
        .figure-label {
          font-family: "IBM Plex Mono", monospace;
          font-size: 8pt;
          letter-spacing: 2pt;
          text-transform: uppercase;
          color: ${text};
          opacity: 0.6;
          margin-bottom: 6pt;
        }
        
        .figure-value {
          font-family: "${titleFont}", serif;
          font-size: 26pt;
          font-weight: 900;
          color: ${accent};
          letter-spacing: -1pt;
        }
        
        .cover-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 24pt;
          padding-top: 14pt;
          border-top: 1pt solid ${text}30;
          font-family: "IBM Plex Mono", monospace;
          font-size: 8pt;
          letter-spacing: 2pt;
          text-transform: uppercase;
          color: ${text};
          opacity: 0.5;
        }

        .section {
  padding: 18mm 18mm 14mm 18mm;
  page-break-before: always;
  page-break-after: auto;
  page-break-inside: auto;
}

@page {
  margin: 18mm 0 12mm 0;
}
        
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          font-family: "IBM Plex Mono", monospace;
          font-size: 8pt;
          letter-spacing: 2pt;
          text-transform: uppercase;
          color: ${text};
          opacity: 0.5;
          padding-bottom: 8pt;
          border-bottom: 1pt solid ${text}25;
          margin-bottom: 18pt;
        }
        
        .section-chapter {
  font-family: "IBM Plex Mono", monospace;
  font-size: 9pt;
  letter-spacing: 3pt;
  text-transform: uppercase;
  color: ${accent};
  margin-bottom: 8pt;
  text-align: center;
}

.section-title {
  font-family: "${titleFont}", serif;
  font-size: 32pt;
  font-weight: 900;
  letter-spacing: -1pt;
  line-height: 1.05;
  color: ${text};
  margin: 0 0 24pt 0;
  text-align: center;
}
        
        .section-content {
  font-size: 10pt;
  line-height: 1.55;
  color: ${text};
  text-align: justify;
  hyphens: auto;
}
        
        .section-content p {
  margin: 0 0 10pt 0;
  orphans: 3;
  widows: 3;
}

.section-content h2 + p,
.section-content h3 + p {
  page-break-before: avoid;
}
        
        .section-content h2 {
          font-family: "${titleFont}", serif;
          font-size: 16pt;
          font-weight: 700;
          letter-spacing: -0.3pt;
          margin: 18pt 0 8pt 0;
          color: ${text};
          padding-bottom: 4pt;
          border-bottom: 1.5pt solid ${accent};
          page-break-after: avoid;
        }
        
        .section-content h3 {
          font-family: "${titleFont}", serif;
          font-size: 13pt;
          font-weight: 700;
          margin: 14pt 0 6pt 0;
          color: ${text};
          page-break-after: avoid;
        }
        
        .section-content strong {
          font-weight: 600;
          color: ${text};
        }
        
        .section-content ul, .section-content ol {
          padding-left: 18pt;
          margin: 6pt 0 10pt 0;
        }
        
        .section-content li {
          margin-bottom: 4pt;
        }
        
        .section-content table {
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  margin: 12pt auto 18pt auto;
  font-size: 8.5pt;
  page-break-inside: avoid;
  table-layout: auto;
  word-wrap: break-word;
}

.section-content table + p,
.section-content table + h2,
.section-content table + h3 {
  margin-top: 18pt;
}

.section-content table thead {
  display: table-header-group;
}

.section-content table tr {
  page-break-inside: avoid;
}
        
        .section-content table th {
  background: ${text};
  color: ${bg};
  font-family: "IBM Plex Mono", monospace;
  font-size: 7.5pt;
  font-weight: 600;
  letter-spacing: 0.5pt;
  text-transform: uppercase;
  padding: 6pt 8pt;
  text-align: left;
  border: 1pt solid ${text};
  word-wrap: break-word;
  overflow-wrap: break-word;
}

.section-content table td {
  padding: 6pt 8pt;
  border: 1pt solid ${text}30;
  font-size: 8.5pt;
  word-wrap: break-word;
  overflow-wrap: break-word;
  vertical-align: top;
}
        
        .section-content table tr:nth-child(even) td {
          background: ${text}05;
        }
        
        .section-footer {
          display: flex;
          justify-content: space-between;
          margin-top: 20pt;
          padding-top: 10pt;
          border-top: 1pt solid ${text}25;
          font-family: "IBM Plex Mono", monospace;
          font-size: 8pt;
          letter-spacing: 2pt;
          text-transform: uppercase;
          color: ${text};
          opacity: 0.5;
        }
        
        .final-credit {
          text-align: center;
          margin-top: 14pt;
          font-family: "IBM Plex Mono", monospace;
          font-size: 7.5pt;
          letter-spacing: 2pt;
          text-transform: uppercase;
          color: ${text};
          opacity: 0.4;
        }
      `}</style>

      {/* COVER */}
      <div className="cover">
        <div className="cover-header">
          <span>{project.name}</span>
          <span>{lang === 'fr' ? 'Document confidentiel' : 'Confidential document'}</span>
        </div>
        
        <div className="cover-eyebrow">
          <span className="cover-accent"></span>
          {lang === 'fr' ? 'Business Plan' : 'Business Plan'} {new Date().getFullYear()}–{new Date().getFullYear() + 2}
        </div>
        
        <h1 className="cover-title">{project.name}</h1>
        
        {project.tagline && (
          <p style={{ fontFamily: `"${titleFont}", serif`, fontSize: '14pt', fontStyle: 'italic', color: text, opacity: 0.7, margin: '0 0 16pt 0', lineHeight: 1.4 }}>
            « {project.tagline} »
          </p>
        )}
        
        <hr className="cover-divider" />
        
        <div className="cover-meta">
          {fd.sector && <span>{fd.sector}</span>}
          {fd.legalStatus && <span>{fd.legalStatus}</span>}
          {fd.launchDate && <span>{lang === 'fr' ? 'Lancement' : 'Launch'} {fd.launchDate}</span>}
        </div>
        
        <div className="cover-spacer"></div>
        
        {(ca1 || ca3 || invest) && (
          <>
            <div className="cover-figures-label">{lang === 'fr' ? 'Chiffres clés' : 'Key figures'}</div>
            <hr className="cover-figures-divider" />
            <div className="cover-figures">
              {ca1 && (
                <div className="figure">
                  <div className="figure-label">{lang === 'fr' ? 'CA Année 1' : 'Revenue Y1'}</div>
                  <div className="figure-value">{ca1}</div>
                </div>
              )}
              {invest && (
                <div className="figure">
                  <div className="figure-label">{lang === 'fr' ? 'Investissement' : 'Investment'}</div>
                  <div className="figure-value">{invest}</div>
                </div>
              )}
              {ca3 && (
                <div className="figure">
                  <div className="figure-label">{lang === 'fr' ? 'CA Année 3' : 'Revenue Y3'}</div>
                  <div className="figure-value">{ca3}</div>
                </div>
              )}
            </div>
          </>
        )}
        
        <div className="cover-footer">
          <span>{lang === 'fr' ? 'Établi avec Woblyn' : 'Made with Woblyn'}</span>
          <span>{today}</span>
        </div>
      </div>

      {/* SECTIONS */}
      {SECTION_KEYS.map((key, idx) => {
        const sectionContent = content[key] || ''
        return (
          <div key={key} className="section">
            <div className="section-header">
              <span>{project.name} · Business Plan</span>
              <span>{lang === 'fr' ? 'Section' : 'Section'} {String(idx + 1).padStart(2, '0')} / {SECTION_KEYS.length}</span>
            </div>
            
            <div className="section-chapter">
              {lang === 'fr' ? 'Chapitre' : 'Chapter'} {String(idx + 1).padStart(2, '0')}
            </div>
            
            <h1 className="section-title">{labels[key as SectionKey]}</h1>
            
            <div className="section-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{sectionContent}</ReactMarkdown>
            </div>
            
            <div className="section-footer">
              <span>{project.name}</span>
              <span>{lang === 'fr' ? 'Page' : 'Page'} {idx + 1}</span>
            </div>
            
            {idx === SECTION_KEYS.length - 1 && (
              <div className="final-credit">
                {lang === 'fr' ? 'Réalisé avec Woblyn · woblyn.com' : 'Made with Woblyn · woblyn.com'}
              </div>
            )}
          </div>
        )
      })}
    </>
  )
}