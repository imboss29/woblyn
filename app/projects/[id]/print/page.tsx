'use client'

import { useState, useEffect, useRef } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { SECTION_KEYS, SECTION_LABELS_FR, SECTION_LABELS_EN, SectionKey } from '../../../../lib/prompts'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Cover from '../edit/Cover'
import { RevenueChart, ChargesChart, FundingChart } from '../edit/Charts'

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
  editorial: { bgColor: '#f4f1ea', textColor: '#0d1b2a', accentColor: '#a85b32', titleFont: 'Playfair Display', bodyFont: 'IBM Plex Sans', style: 'editorial' },
  classic: { bgColor: '#ffffff', textColor: '#0a1933', accentColor: '#1d4ed8', titleFont: 'Fraunces', bodyFont: 'Inter', style: 'corporate' },
  modern: { bgColor: '#fafafa', textColor: '#171717', accentColor: '#6366f1', titleFont: 'Geist', bodyFont: 'Geist', style: 'tech' },
  premium: { bgColor: '#0d0d0d', textColor: '#f5f1e8', accentColor: '#c9a558', titleFont: 'Cormorant Garamond', bodyFont: 'Cormorant Garamond', style: 'premium' },
}

const FONT_SIZES: any = { small: '13px', normal: '14px', large: '16px' }

export default function PrintPage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const id = params.id as string
  const lang = (searchParams.get('lang') || 'fr') as 'fr' | 'en'
  const isCleanMode = searchParams.get('clean') === '1'

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
    return (
      <div style={{ minHeight: '100vh', background: '#f4f1ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '12px', letterSpacing: '2px', color: '#6b7280', textTransform: 'uppercase' }}>
          Préparation du PDF...
        </div>
      </div>
    )
  }

  const themeKey = project.theme in themes ? project.theme : 'editorial'
  const baseTheme = themes[themeKey]
  const bg = project.bgColor || baseTheme.bgColor
  const text = project.textColor || baseTheme.textColor
  const accent = project.accentColor || baseTheme.accentColor
  const titleFont = project.titleFont || baseTheme.titleFont
  const bodyFont = project.bodyFont || baseTheme.bodyFont
  const fontSize = FONT_SIZES[project.fontSize || 'normal']

  // Choix du contenu selon la langue
  let content = project.content
  if (lang === 'en' && project.contentEN) content = project.contentEN
  if (lang === 'fr' && project.contentFR) content = project.contentFR

  const labels = lang === 'en' ? SECTION_LABELS_EN : SECTION_LABELS_FR

  return (
  <div style={{ background: 'white' }}>
      
      {!isCleanMode && (
  <div className="no-print" style={{
    position: 'fixed', top: 20, left: 20, right: 20, zIndex: 1000,
    background: '#0d1b2a', color: 'white', padding: '20px 24px',
    fontFamily: '"IBM Plex Mono", monospace', fontSize: '12px',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    maxWidth: '720px', margin: '0 auto',
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
      <span style={{ letterSpacing: '2px', fontWeight: 600, fontSize: '11px', textTransform: 'uppercase', color: '#a85b32' }}>
        ✦ Aperçu PDF
      </span>
      <button onClick={() => router.push(`/projects/${id}/export`)} style={{
        background: 'transparent', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.3)',
        padding: '6px 12px', fontSize: '10px', fontWeight: 600,
        letterSpacing: '1px', textTransform: 'uppercase',
        cursor: 'pointer', fontFamily: 'inherit',
      }}>
        ← Retour
      </button>
    </div>
  </div>
)}



      {/* COUVERTURE */}
      <div className={`print-page template-${baseTheme.style}`} style={{
        width: '210mm', minHeight: '297mm', margin: '0 auto',
        background: bg, color: text,
      }}>
        <Cover
          projectName={project.name}
          logoUrl={project.logoUrl}
          tagline={project.tagline}
          formData={project.formData || {}}
          bg={bg} text={text} accent={accent}
          titleFont={titleFont} bodyFont={bodyFont}
          templateStyle={baseTheme.style}
        />
      </div>

      {/* SECTIONS */}
      {SECTION_KEYS.map((key, idx) => {
  const sectionContent = content[key] || ''
  return (
    <div key={key} className={`print-page template-${baseTheme.style}`} style={{
      width: '100%', maxWidth: '186mm', margin: '0 auto',
      background: bg, padding: '0', color: text, fontSize,
      fontFamily: `"${bodyFont}", sans-serif`,
    }}>
            {/* Header */}
            <div style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              paddingBottom: '20px', borderBottom: `1px solid ${text}20`, marginBottom: '40px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {project.logoUrl && <img src={project.logoUrl} alt="" style={{ height: '32px' }} />}
                <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.6 }}>
                  {project.name}
                </span>
              </div>
              <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.6 }}>
                Section {String(idx + 1).padStart(2, '0')} / {SECTION_KEYS.length}
              </span>
            </div>

            <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', letterSpacing: '3px', color: accent, textTransform: 'uppercase', marginBottom: '12px' }}>
              {lang === 'en' ? 'Chapter' : 'Chapitre'} {String(idx + 1).padStart(2, '0')}
            </div>

            <h1 className="doc-title" style={{
              fontFamily: `"${titleFont}", serif`, fontSize: '48px', fontWeight: 900,
              letterSpacing: '-1.5px', lineHeight: 1.05, marginBottom: '32px', color: text,
            }}>
              {labels[key as SectionKey]}
            </h1>

            <div className="document-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{sectionContent}</ReactMarkdown>
            </div>

            {key === 'financialProjections' && project.formData && (
              <>
                <RevenueChart formData={project.formData} accent={accent} text={text} />
                <ChargesChart formData={project.formData} accent={accent} text={text} />
              </>
            )}

            {key === 'fundingPlan' && project.formData && (
              <FundingChart formData={project.formData} accent={accent} text={text} />
            )}

            <div style={{
              marginTop: '60px', paddingTop: '20px', borderTop: `1px solid ${text}20`,
              display: 'flex', justifyContent: 'space-between',
              fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px',
              letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.6,
            }}>
              <span>{project.name} · Business Plan</span>
              <span>Page {idx + 1}</span>
            </div>

            {idx === SECTION_KEYS.length - 1 && (
              <div style={{
                marginTop: '40px', textAlign: 'center',
                fontFamily: '"IBM Plex Mono", monospace', fontSize: '9px',
                letterSpacing: '2px', opacity: 0.35, textTransform: 'uppercase',
              }}>
                {lang === 'en' ? 'Made with Woblyn · woblyn.com' : 'Réalisé avec Woblyn · woblyn.com'}
              </div>
            )}
          </div>
        )
      })}

      <style jsx global>{`
  @page {
    size: A4;
    margin: 15mm 12mm;
  }
  body {
    margin: 0;
    background: white;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .document-content h1, .document-content h2, .document-content h3 { 
    font-family: "${titleFont}", serif !important; 
    page-break-after: avoid;
    break-after: avoid;
  }
  .document-content table { 
    width: 100%; 
    border-collapse: collapse; 
    margin: 16px 0; 
    font-size: 11px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .document-content table th, .document-content table td { 
    padding: 8px 12px; 
    border: 1px solid ${text}30; 
    text-align: left;
  }
  .document-content table th { 
    background: ${text} !important; 
    color: ${bg} !important; 
    font-weight: 600;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  .document-content { 
    color: ${text}; 
    line-height: 1.6;
    orphans: 3;
    widows: 3;
  }
  .document-content p { 
    margin-bottom: 12px;
    page-break-inside: avoid;
    break-inside: avoid;
    orphans: 3;
    widows: 3;
  }
  .document-content h2 { 
    font-size: 22px; 
    font-weight: 700; 
    margin: 28px 0 12px;
    page-break-before: auto;
    page-break-after: avoid;
    break-after: avoid;
  }
  .document-content h3 { 
    font-size: 18px; 
    font-weight: 600; 
    margin: 20px 0 10px;
    page-break-after: avoid;
    break-after: avoid;
  }
  .document-content ul, .document-content ol { 
    padding-left: 24px; 
    margin-bottom: 16px;
    page-break-inside: avoid;
    break-inside: avoid;
  }
  .document-content li { 
    margin-bottom: 6px; 
  }
  .document-content strong { 
    font-weight: 600; 
  }

  .template-editorial .doc-title { font-weight: 900; letter-spacing: -2px; }
  .template-editorial .document-content > p:first-of-type::first-letter {
    font-family: "Playfair Display", serif; font-size: 56px; font-weight: 900;
    float: left; line-height: 0.9; margin: 4px 8px 0 0; color: ${accent};
  }
  .template-editorial .document-content h2 { border-bottom: 3px solid ${accent}; padding-bottom: 8px; margin-top: 32px; }

  .template-corporate .doc-title { font-weight: 600; letter-spacing: -1px; text-transform: uppercase; font-size: 36px !important; border-bottom: 2px solid ${text}; padding-bottom: 16px; }
  .template-corporate .document-content h2 { text-transform: uppercase; letter-spacing: 1px; font-size: 16px !important; color: ${accent}; margin-top: 28px; padding-bottom: 8px; border-bottom: 1px solid ${text}30; }
  .template-corporate .document-content table { border: 2px solid ${text}; }

  .template-tech .doc-title { font-weight: 700; letter-spacing: -2.5px; font-size: 56px !important; background: linear-gradient(135deg, ${text}, ${accent}); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
  .template-tech .document-content h2 { font-weight: 600; letter-spacing: -0.5px; margin-top: 32px; padding: 4px 12px; background: ${accent}15; border-left: 3px solid ${accent}; display: inline-block; }
  .template-tech .document-content table { border-radius: 8px; overflow: hidden; border: 1px solid ${text}15; }

  .template-premium .doc-title { font-weight: 400; font-style: italic; letter-spacing: -1px; color: ${accent}; }
  .template-premium .document-content h2 { font-weight: 400; font-style: italic; color: ${accent}; text-align: center; margin: 40px 0 20px; }
  .template-premium .document-content h2::before, .template-premium .document-content h2::after { content: '— '; color: ${accent}; }
  .template-premium .document-content table { border: 1px solid ${accent}40; }
  .template-premium .document-content table th { border-bottom: 1px solid ${accent} !important; }
  .template-premium .document-content strong { color: ${accent}; }

  .print-page {
    page-break-after: always;
    break-after: page;
    page-break-inside: auto;
  }
  .print-page:last-child {
    page-break-after: auto;
    break-after: auto;
  }

  @media print {
    .no-print { display: none !important; }
    .print-page {
      margin: 0 !important;
      padding: 0 !important;
      box-shadow: none !important;
      min-height: auto !important;
      width: 100% !important;
    }
    html, body {
      margin: 0;
      padding: 0;
    }
  }
`}</style>

      <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=${[titleFont, bodyFont].filter((f, i, a) => a.indexOf(f) === i).map(f => f.replace(/ /g, '+')).join('&family=')}&display=swap`} />
    </div>
  )
}