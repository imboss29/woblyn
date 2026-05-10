'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { SECTION_KEYS, SECTION_LABELS, SectionKey } from '../../../../lib/prompts'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Cover from './Cover'
import { RevenueChart, ChargesChart, FundingChart } from './Charts'

type Project = {
  id: string
  name: string
  content: Record<string, string>
  formData: any
  isPaid: boolean
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

const themes = {
  editorial: { name: 'Éditorial', desc: 'Magazine financier', bgColor: '#f4f1ea', textColor: '#0d1b2a', accentColor: '#a85b32', titleFont: 'Playfair Display', bodyFont: 'IBM Plex Sans', style: 'editorial' },
  classic: { name: 'Corporate', desc: 'Banque & finance', bgColor: '#ffffff', textColor: '#0a1933', accentColor: '#1d4ed8', titleFont: 'Fraunces', bodyFont: 'Inter', style: 'corporate' },
  modern: { name: 'Tech', desc: 'Startup minimaliste', bgColor: '#fafafa', textColor: '#171717', accentColor: '#6366f1', titleFont: 'Geist', bodyFont: 'Geist', style: 'tech' },
  premium: { name: 'Premium', desc: 'Luxe & cabinet', bgColor: '#0d0d0d', textColor: '#f5f1e8', accentColor: '#c9a558', titleFont: 'Cormorant Garamond', bodyFont: 'Cormorant Garamond', style: 'premium' },
}

const TITLE_FONTS = ['Playfair Display', 'Fraunces', 'Cormorant Garamond', 'Lora', 'Inter', 'Geist']
const BODY_FONTS = ['IBM Plex Sans', 'Inter', 'Geist', 'Source Sans 3', 'Cormorant Garamond', 'Lora']
const FONT_SIZES = { small: { name: 'Petit', value: '13px' }, normal: { name: 'Normal', value: '14px' }, large: { name: 'Grand', value: '16px' } }

type ThemeKey = keyof typeof themes
type ActiveSection = SectionKey | 'cover'
type TaglineStyle = 'impact' | 'poetic' | 'corporate'

export default function EditorPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [activeSection, setActiveSection] = useState<ActiveSection>('cover')
  const [loading, setLoading] = useState(true)
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'error'>('saved')
  const [aiAction, setAiAction] = useState<string | null>(null)
  const [rightTab, setRightTab] = useState<'ai' | 'style'>('style')
  const [editingName, setEditingName] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [editingTagline, setEditingTagline] = useState(false)

  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
  fetch(`/api/projects/${id}`)
    .then(res => res.json())
    .then(data => {
      if (data.error) { router.push('/dashboard'); return }
      // Protection : si le projet n'est pas payé, on redirige vers la preview
      if (!data.isPaid) { router.push(`/projects/${id}`); return }
      setProject(data)
      setLoading(false)
    })
    .catch(() => router.push('/dashboard'))
}, [id, router])

  const saveSection = useCallback((sectionKey: SectionKey, content: string) => {
    setSaveStatus('saving')
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
    saveTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/projects/${id}/section`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sectionKey, content }),
        })
        if (!res.ok) throw new Error()
        setSaveStatus('saved')
      } catch { setSaveStatus('error') }
    }, 800)
  }, [id])

  const handleContentChange = (newContent: string) => {
    if (!project || activeSection === 'cover') return
    setProject({ ...project, content: { ...project.content, [activeSection]: newContent } })
    saveSection(activeSection as SectionKey, newContent)
  }

  const handleRegenerate = async () => {
    if (!project || activeSection === 'cover') return
    if (!confirm('Régénérer cette section ? Le contenu actuel sera remplacé.')) return
    setAiAction('regenerate')
    try {
      const res = await fetch(`/api/projects/${id}/regenerate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sectionKey: activeSection }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setProject({ ...project, content: { ...project.content, [activeSection]: data.content } })
    } catch (err: any) { alert(err.message) }
    finally { setAiAction(null) }
  }

  const handleImprove = async (action: 'shorten' | 'expand' | 'formalize' | 'simplify') => {
    if (!project || activeSection === 'cover') return
    setAiAction(action)
    try {
      const res = await fetch(`/api/projects/${id}/improve`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sectionKey: activeSection, action }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setProject({ ...project, content: { ...project.content, [activeSection]: data.content } })
    } catch (err: any) { alert(err.message) }
    finally { setAiAction(null) }
  }

  const generateTagline = async (style: TaglineStyle) => {
    if (!project) return
    setAiAction(`tagline-${style}`)
    try {
      const res = await fetch(`/api/projects/${id}/tagline`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ style }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setProject({ ...project, tagline: data.tagline })
    } catch (err: any) { alert(err.message) }
    finally { setAiAction(null) }
  }

  const updateSettings = async (data: Partial<Project>) => {
    if (!project) return
    setProject({ ...project, ...data })
    try {
      await fetch(`/api/projects/${id}/settings`, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
    } catch (err) { console.error(err) }
  }

  const applyTemplate = (themeKey: ThemeKey) => {
    const t = themes[themeKey]
    updateSettings({
      theme: themeKey, bgColor: t.bgColor, textColor: t.textColor,
      accentColor: t.accentColor, titleFont: t.titleFont, bodyFont: t.bodyFont,
    })
  }

  const resetCustomization = () => {
    updateSettings({ bgColor: null, textColor: null, accentColor: null, titleFont: null, bodyFont: null, fontSize: 'normal' })
  }

  const deleteProject = async () => {
    if (!confirm('Supprimer ce business plan définitivement ?')) return
    await fetch(`/api/projects/${id}/settings`, { method: 'DELETE' })
    router.push('/dashboard')
  }

  const exportPDF = () => {
    if (!project?.isPaid) {
      alert('Le téléchargement PDF est disponible après paiement (97€).')
      return
    }
    window.print()
  }

  if (loading || !project) {
    return (
      <div style={{ minHeight: '100vh', background: '#f4f1ea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '12px', letterSpacing: '2px', color: '#6b7280', textTransform: 'uppercase' }}>
          Chargement...
        </div>
      </div>
    )
  }

  const themeKey = (project.theme as ThemeKey) in themes ? (project.theme as ThemeKey) : 'editorial'
  const baseTheme = themes[themeKey]
  const bg = project.bgColor || baseTheme.bgColor
  const text = project.textColor || baseTheme.textColor
  const accent = project.accentColor || baseTheme.accentColor
  const titleFont = project.titleFont || baseTheme.titleFont
  const bodyFont = project.bodyFont || baseTheme.bodyFont
  const fontSize = FONT_SIZES[(project.fontSize as keyof typeof FONT_SIZES) || 'normal'].value

  const content = project.content || {}
  const isCover = activeSection === 'cover'
  const currentText = isCover ? '' : (content[activeSection as SectionKey] || '')
  const currentIndex = isCover ? -1 : SECTION_KEYS.indexOf(activeSection as SectionKey)

  return (
    <div style={{ minHeight: '100vh', background: '#e8e4d8', display: 'flex' }} className="editor-root">

      <aside style={{ width: '260px', background: '#0d1b2a', color: '#f4f1ea', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <a href="/dashboard" style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontFamily: '"IBM Plex Mono", monospace', letterSpacing: '2px', textTransform: 'uppercase' }}>← Dashboard</a>
          {editingName ? (
            <input autoFocus value={project.name}
              onChange={(e) => setProject({ ...project, name: e.target.value })}
              onBlur={() => { setEditingName(false); updateSettings({ name: project.name }) }}
              onKeyDown={(e) => { if (e.key === 'Enter') { setEditingName(false); updateSettings({ name: project.name }) } }}
              style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', fontWeight: 700, marginTop: '12px', background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#f4f1ea', padding: '4px 8px', width: '100%', outline: 'none' }} />
          ) : (
            <h2 onClick={() => setEditingName(true)} style={{ fontFamily: '"Playfair Display", serif', fontSize: '20px', fontWeight: 700, marginTop: '12px', lineHeight: 1.2, cursor: 'pointer' }} title="Cliquer pour renommer">
              {project.name}
            </h2>
          )}
          <div style={{ marginTop: '8px', fontSize: '10px', color: 'rgba(255,255,255,0.4)', fontFamily: '"IBM Plex Mono", monospace', letterSpacing: '1px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: saveStatus === 'saved' ? '#4ade80' : saveStatus === 'saving' ? '#fbbf24' : '#ef4444' }} />
            {saveStatus === 'saved' ? 'Sauvegardé' : saveStatus === 'saving' ? 'Sauvegarde...' : 'Erreur'}
          </div>
        </div>

        <div style={{ padding: '20px 0', flex: 1 }}>
          <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', letterSpacing: '2px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', padding: '0 24px', marginBottom: '12px' }}>Sommaire</div>

          <button onClick={() => setActiveSection('cover')} style={{
            width: '100%', textAlign: 'left', padding: '12px 24px',
            background: activeSection === 'cover' ? 'rgba(168,91,50,0.2)' : 'transparent',
            borderLeft: '3px solid', borderLeftColor: activeSection === 'cover' ? '#a85b32' : 'transparent',
            color: activeSection === 'cover' ? '#f4f1ea' : 'rgba(255,255,255,0.6)',
            cursor: 'pointer', borderTop: 'none', borderRight: 'none', borderBottom: 'none',
            fontFamily: 'inherit', fontSize: '13px', display: 'flex', gap: '12px', alignItems: 'center',
          }}>
            <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#a85b32', fontWeight: 600 }}>00</span>
            <span>Couverture</span>
          </button>

          {SECTION_KEYS.map((key, i) => {
            const isActive = activeSection === key
            return (
              <button key={key} onClick={() => setActiveSection(key)} style={{
                width: '100%', textAlign: 'left', padding: '12px 24px',
                background: isActive ? 'rgba(168,91,50,0.2)' : 'transparent',
                borderLeft: '3px solid', borderLeftColor: isActive ? '#a85b32' : 'transparent',
                color: isActive ? '#f4f1ea' : 'rgba(255,255,255,0.6)',
                cursor: 'pointer', borderTop: 'none', borderRight: 'none', borderBottom: 'none',
                fontFamily: 'inherit', fontSize: '13px', display: 'flex', gap: '12px', alignItems: 'center',
              }}>
                <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', color: '#a85b32', fontWeight: 600 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{SECTION_LABELS[key]}</span>
              </button>
            )
          })}
        </div>

        <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={exportPDF} style={{
            width: '100%', background: '#a85b32', color: 'white', border: 'none', padding: '12px',
            fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px',
            textTransform: 'uppercase', cursor: 'pointer', marginBottom: '8px',
          }}>↓ Télécharger PDF</button>
          <button onClick={deleteProject} style={{
            width: '100%', background: 'transparent', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.15)', padding: '10px',
            fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', letterSpacing: '1.5px',
            textTransform: 'uppercase', cursor: 'pointer',
          }}>Supprimer</button>
        </div>
      </aside>

      <main style={{ flex: 1, padding: '60px 40px', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', overflow: 'auto', background: '#e8e4d8' }}>
        {isCover ? (
          <Cover
            projectName={project.name}
            logoUrl={project.logoUrl}
            tagline={project.tagline}
            formData={project.formData || {}}
            bg={bg} text={text} accent={accent}
            titleFont={titleFont} bodyFont={bodyFont}
            templateStyle={baseTheme.style}
          />
        ) : (
          <div className={`document-page template-${baseTheme.style}`} style={{
            width: '210mm', minHeight: '297mm', maxWidth: '100%',
            background: bg, padding: '60px 50px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
            fontFamily: `"${bodyFont}", sans-serif`, color: text, fontSize,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '20px', borderBottom: `1px solid ${text}20`, marginBottom: '40px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {project.logoUrl && <img src={project.logoUrl} alt="" style={{ height: '32px' }} />}
                <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.6 }}>
                  {project.name}
                </span>
              </div>
              <span style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.6 }}>
                Section {String(currentIndex + 1).padStart(2, '0')} / {SECTION_KEYS.length}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', letterSpacing: '3px', color: accent, textTransform: 'uppercase' }}>
                Chapitre {String(currentIndex + 1).padStart(2, '0')}
              </div>
              <button onClick={() => setEditMode(!editMode)} style={{
                background: editMode ? text : 'transparent',
                color: editMode ? bg : text,
                border: `1px solid ${text}`,
                padding: '6px 12px', fontSize: '10px', fontWeight: 600, letterSpacing: '1.5px',
                textTransform: 'uppercase', cursor: 'pointer', fontFamily: '"IBM Plex Mono", monospace',
              }}>
                {editMode ? '◉ Mode édition' : '○ Éditer'}
              </button>
            </div>

            <h1 className="doc-title" style={{
              fontFamily: `"${titleFont}", serif`, fontSize: '48px', fontWeight: 900,
              letterSpacing: '-1.5px', lineHeight: 1.05, marginBottom: '32px', color: text,
            }}>
              {SECTION_LABELS[activeSection as SectionKey]}
            </h1>

            {editMode ? (
              <textarea value={currentText} onChange={(e) => handleContentChange(e.target.value)}
                style={{
                  width: '100%', minHeight: '500px', padding: '20px',
                  fontFamily: '"IBM Plex Mono", monospace', fontSize: '13px', lineHeight: 1.7,
                  border: `2px solid ${text}`, background: '#fafaf7', outline: 'none', resize: 'vertical', color: text,
                }} />
            ) : (
              <div className="document-content">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{currentText}</ReactMarkdown>
              </div>
            )}

            {!editMode && activeSection === 'financialProjections' && project.formData && (
              <>
                <RevenueChart formData={project.formData} accent={accent} text={text} />
                <ChargesChart formData={project.formData} accent={accent} text={text} />
              </>
            )}

            {!editMode && activeSection === 'fundingPlan' && project.formData && (
              <FundingChart formData={project.formData} accent={accent} text={text} />
            )}

            <div style={{ marginTop: '60px', paddingTop: '20px', borderTop: `1px solid ${text}20`, display: 'flex', justifyContent: 'space-between', fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.6 }}>
              <span>Woblyn · Business Plan</span>
              <span>Page {currentIndex + 1}</span>
            </div>
          </div>
        )}
      </main>

      <aside style={{ width: '320px', background: 'white', borderLeft: '1px solid #d4cfc0', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', flexShrink: 0 }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #d4cfc0' }}>
          <button onClick={() => setRightTab('style')} style={{
            flex: 1, padding: '16px', background: rightTab === 'style' ? '#0d1b2a' : 'transparent',
            color: rightTab === 'style' ? 'white' : '#0d1b2a', border: 'none',
            fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', fontWeight: 600,
            letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer',
          }}>Style</button>
          <button onClick={() => setRightTab('ai')} style={{
            flex: 1, padding: '16px', background: rightTab === 'ai' ? '#0d1b2a' : 'transparent',
            color: rightTab === 'ai' ? 'white' : '#0d1b2a', border: 'none',
            fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', fontWeight: 600,
            letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer',
          }}>✦ IA</button>
        </div>

        {rightTab === 'ai' ? (
          <div style={{ padding: '24px' }}>
            <SectionLabel>Actions IA</SectionLabel>
            <SectionTitle>{isCover ? 'Accroche de couverture' : 'Améliorer la section'}</SectionTitle>

            {isCover ? (
              <>
                {project.tagline && (
                  <div style={{ background: '#f4f1ea', padding: '16px', marginBottom: '16px', borderLeft: '3px solid #a85b32' }}>
                    <div style={{ fontSize: '10px', fontFamily: '"IBM Plex Mono", monospace', letterSpacing: '2px', textTransform: 'uppercase', color: '#6b7280', marginBottom: '6px' }}>
                      Accroche actuelle
                    </div>
                    {editingTagline ? (
                      <textarea autoFocus value={project.tagline}
                        onChange={(e) => setProject({ ...project, tagline: e.target.value })}
                        onBlur={() => { setEditingTagline(false); updateSettings({ tagline: project.tagline }) }}
                        style={{ width: '100%', minHeight: '60px', fontFamily: '"Playfair Display", serif', fontStyle: 'italic', fontSize: '14px', color: '#0d1b2a', border: '1px solid #d4cfc0', padding: '8px', outline: 'none', resize: 'vertical' }} />
                    ) : (
                      <div onClick={() => setEditingTagline(true)} style={{ fontFamily: '"Playfair Display", serif', fontSize: '15px', fontStyle: 'italic', color: '#0d1b2a', lineHeight: 1.4, cursor: 'pointer' }} title="Cliquer pour modifier">
                        « {project.tagline} »
                      </div>
                    )}
                  </div>
                )}

                <SectionLabel>Générer une accroche</SectionLabel>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {([
                    { key: 'impact', label: '⚡ Style Impact', desc: 'Court, percutant, direct' },
                    { key: 'poetic', label: '◉ Style Évocateur', desc: 'Inspirant, un peu poétique' },
                    { key: 'corporate', label: '◆ Style Corporate', desc: 'Sobre, institutionnel' },
                  ] as const).map(({ key, label, desc }) => (
                    <button key={key} onClick={() => generateTagline(key)} disabled={!!aiAction} style={{
                      background: 'transparent', border: '1px solid #0d1b2a', padding: '12px',
                      cursor: aiAction ? 'wait' : 'pointer', textAlign: 'left',
                      opacity: aiAction ? 0.5 : 1, fontFamily: 'inherit',
                    }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, marginBottom: '2px' }}>
                        {aiAction === `tagline-${key}` ? 'Génération...' : label}
                      </div>
                      <div style={{ fontSize: '11px', color: '#6b7280' }}>{desc}</div>
                    </button>
                  ))}
                </div>

                {project.tagline && (
                  <button onClick={() => updateSettings({ tagline: null })} style={{
                    width: '100%', marginTop: '16px', background: 'transparent', border: '1px solid #d4cfc0', padding: '10px',
                    fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', letterSpacing: '1.5px',
                    textTransform: 'uppercase', cursor: 'pointer', color: '#6b7280',
                  }}>Supprimer l'accroche</button>
                )}
              </>
            ) : (
              <>
                <button onClick={handleRegenerate} disabled={!!aiAction} style={{
                  width: '100%', background: '#a85b32', color: 'white', border: 'none', padding: '14px',
                  fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px',
                  textTransform: 'uppercase', cursor: aiAction ? 'wait' : 'pointer', marginBottom: '24px', opacity: aiAction ? 0.7 : 1,
                }}>{aiAction === 'regenerate' ? 'Régénération...' : '↻ Régénérer entièrement'}</button>

                <SectionLabel>Ajustements</SectionLabel>
                <div style={{ display: 'grid', gap: '8px' }}>
                  {([
                    { key: 'shorten', label: '↓ Raccourcir' },
                    { key: 'expand', label: '↑ Enrichir' },
                    { key: 'formalize', label: '◆ Plus formel' },
                    { key: 'simplify', label: '○ Plus simple' },
                  ] as const).map(({ key, label }) => (
                    <button key={key} onClick={() => handleImprove(key)} disabled={!!aiAction} style={{
                      background: 'transparent', border: '1px solid #0d1b2a', padding: '12px',
                      fontSize: '13px', fontWeight: 500, cursor: aiAction ? 'wait' : 'pointer', textAlign: 'left',
                      opacity: aiAction ? 0.5 : 1, fontFamily: 'inherit',
                    }}>{aiAction === key ? 'En cours...' : label}</button>
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div style={{ padding: '24px' }}>
            <SectionLabel>Personnalisation</SectionLabel>
            <SectionTitle>Style du document</SectionTitle>

            <SectionLabel>Templates rapides</SectionLabel>
            <div style={{ display: 'grid', gap: '8px', marginBottom: '24px' }}>
              {(Object.keys(themes) as ThemeKey[]).map((tk) => {
                const t = themes[tk]
                const isActive = themeKey === tk
                return (
                  <button key={tk} onClick={() => applyTemplate(tk)} style={{
                    background: isActive ? '#0d1b2a' : 'white',
                    color: isActive ? 'white' : '#0d1b2a',
                    border: '1px solid #0d1b2a', padding: '14px', cursor: 'pointer',
                    textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    fontFamily: 'inherit',
                  }}>
                    <div>
                      <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '15px', fontWeight: 700 }}>{t.name}</div>
                      <div style={{ fontSize: '11px', opacity: 0.7, marginTop: '2px' }}>{t.desc}</div>
                    </div>
                    <div style={{ display: 'flex', gap: '4px' }}>
                      <span style={{ width: '14px', height: '14px', background: t.bgColor, border: '1px solid currentColor' }} />
                      <span style={{ width: '14px', height: '14px', background: t.textColor }} />
                      <span style={{ width: '14px', height: '14px', background: t.accentColor }} />
                    </div>
                  </button>
                )
              })}
            </div>

            <Divider />

            <SectionLabel>Couleurs</SectionLabel>
            <ColorRow label="Fond" value={bg} onChange={(v) => updateSettings({ bgColor: v })} />
            <ColorRow label="Texte" value={text} onChange={(v) => updateSettings({ textColor: v })} />
            <ColorRow label="Accent" value={accent} onChange={(v) => updateSettings({ accentColor: v })} />

            <Divider />

            <SectionLabel>Typographie</SectionLabel>
            <FontSelect label="Police titres" value={titleFont} options={TITLE_FONTS} onChange={(v) => updateSettings({ titleFont: v })} />
            <FontSelect label="Police corps" value={bodyFont} options={BODY_FONTS} onChange={(v) => updateSettings({ bodyFont: v })} />

            <SectionLabel>Taille du texte</SectionLabel>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '20px' }}>
              {(Object.keys(FONT_SIZES) as Array<keyof typeof FONT_SIZES>).map((s) => (
                <button key={s} onClick={() => updateSettings({ fontSize: s })} style={{
                  padding: '10px 8px', fontSize: '11px', fontWeight: 600, fontFamily: '"IBM Plex Mono", monospace',
                  letterSpacing: '1px', textTransform: 'uppercase',
                  background: project.fontSize === s ? '#0d1b2a' : 'white',
                  color: project.fontSize === s ? 'white' : '#0d1b2a',
                  border: '1px solid #0d1b2a', cursor: 'pointer',
                }}>{FONT_SIZES[s].name}</button>
              ))}
            </div>

            <Divider />

            <SectionLabel>Logo</SectionLabel>
            <input type="url" value={project.logoUrl || ''} onChange={(e) => updateSettings({ logoUrl: e.target.value })} placeholder="URL du logo" style={{
              width: '100%', padding: '10px', border: '1px solid #d4cfc0', fontSize: '12px', outline: 'none', marginBottom: '6px',
            }} />
            <div style={{ fontSize: '11px', color: '#6b7280', lineHeight: 1.5, marginBottom: '20px' }}>
              Hébergez votre logo (Imgur, Cloudinary) et collez l'URL.
            </div>

            <Divider />

            <button onClick={resetCustomization} style={{
              width: '100%', background: 'transparent', border: '1px solid #d4cfc0', padding: '12px',
              fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', letterSpacing: '1.5px',
              textTransform: 'uppercase', cursor: 'pointer', color: '#6b7280',
            }}>↺ Réinitialiser la personnalisation</button>
          </div>
        )}
      </aside>

      <style jsx global>{`
        .document-content h1, .document-content h2, .document-content h3 { font-family: "${titleFont}", serif !important; }
        .document-content table th { background: ${text} !important; color: ${bg} !important; }
        .document-content { color: ${text}; }

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

        @media print {
          aside { display: none !important; }
          .editor-root > main { background: white !important; padding: 0 !important; }
          .document-page { box-shadow: none !important; padding: 30mm 25mm !important; max-width: 100% !important; }
        }
      `}</style>

      <link rel="stylesheet" href={`https://fonts.googleapis.com/css2?family=${[titleFont, bodyFont].filter((f, i, a) => a.indexOf(f) === i).map(f => f.replace(/ /g, '+')).join('&family=')}&display=swap`} />
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '10px', letterSpacing: '2px', color: '#6b7280', textTransform: 'uppercase', marginBottom: '12px' }}>{children}</div>
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '22px', fontWeight: 900, marginBottom: '20px' }}>{children}</h3>
}

function Divider() {
  return <div style={{ height: '1px', background: '#d4cfc0', margin: '24px 0' }} />
}

function ColorRow({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
      <input type="color" value={value} onChange={(e) => onChange(e.target.value)} style={{ width: '40px', height: '40px', border: '1px solid #d4cfc0', cursor: 'pointer', padding: 0, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '12px', fontWeight: 600 }}>{label}</div>
        <div style={{ fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px', color: '#6b7280' }}>{value}</div>
      </div>
    </div>
  )
}

function FontSelect({ label, value, options, onChange }: { label: string, value: string, options: string[], onChange: (v: string) => void }) {
  return (
    <div style={{ marginBottom: '14px' }}>
      <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '6px' }}>{label}</div>
      <select value={value} onChange={(e) => onChange(e.target.value)} style={{
        width: '100%', padding: '10px', border: '1px solid #d4cfc0', fontSize: '13px', outline: 'none',
        fontFamily: `"${value}", sans-serif`, background: 'white',
      }}>
        {options.map(f => <option key={f} value={f} style={{ fontFamily: `"${f}", sans-serif` }}>{f}</option>)}
      </select>
    </div>
  )
}