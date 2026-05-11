'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

type Project = {
  id: string
  name: string
  isPaid: boolean
  language: string | null
  hasTranslation: boolean
  contentEN: any
  contentFR: any
  content: any
}

export default function ExportPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [showTranslateModal, setShowTranslateModal] = useState(false)
  const [translating, setTranslating] = useState(false)
  const [downloading, setDownloading] = useState<'fr' | 'en' | null>(null)

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) { router.push('/dashboard'); return }
        if (!data.isPaid) { router.push(`/projects/${id}`); return }
        setProject(data)
        setLoading(false)
      })
      .catch(() => router.push('/dashboard'))
  }, [id, router])

  const downloadPDF = async (lang: 'fr' | 'en') => {
  setDownloading(lang)
  try {
    const res = await fetch(`/api/projects/${id}/pdf?lang=${lang}`)
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}))
      throw new Error(errorData.error || 'Erreur lors de la génération du PDF')
    }
    
    const blob = await res.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${project?.name || 'business-plan'}_${lang.toUpperCase()}.pdf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  } catch (err: any) {
    alert(err.message || 'Erreur lors de la génération du PDF')
  } finally {
    setDownloading(null)
  }
}

  const launchTranslation = async () => {
    if (!project) return
    if (!confirm(`Lancer la traduction ? Cela prend environ 3-5 minutes.`)) return
    setTranslating(true)
    try {
      const res = await fetch(`/api/projects/${id}/translate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      alert('Traduction terminée !')
      window.location.reload()
    } catch (err: any) { alert(err.message) }
    finally { setTranslating(false) }
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

  const sourceLang = (project.language as 'fr' | 'en') || 'fr'
  const targetLang = sourceLang === 'fr' ? 'en' : 'fr'
  const hasTranslation = project.hasTranslation && (project.contentEN || project.contentFR)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)' }}>
      
      {/* TOPBAR */}
      <div style={{
        background: 'var(--ink)', color: 'var(--paper)',
        padding: '8px 60px', fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '11px', letterSpacing: '1px',
        display: 'flex', justifyContent: 'space-between', textTransform: 'uppercase',
      }}>
        <span>Export · {project.name}</span>
        <span>Woblyn</span>
      </div>

      {/* NAV */}
      <nav style={{
        background: 'var(--paper)', padding: '24px 60px',
        borderBottom: '2px solid var(--ink)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <a href={`/projects/${id}/edit`} style={{ fontSize: '12px', color: 'var(--ink)', textDecoration: 'none', fontFamily: '"IBM Plex Mono", monospace', letterSpacing: '2px', textTransform: 'uppercase' }}>
          ← Retour à l'éditeur
        </a>
        <a href="/" style={{
          fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: 900,
          letterSpacing: '-1px', color: 'var(--ink)', textDecoration: 'none',
        }}>
          Woblyn
        </a>
        <div style={{ width: '120px' }} />
      </nav>

      {/* CONTENT */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 40px 100px' }}>
        
        <div style={{
          fontFamily: '"IBM Plex Mono", monospace', fontSize: '12px',
          letterSpacing: '4px', color: '#a85b32', textTransform: 'uppercase',
          marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px',
        }}>
          <span style={{ width: '40px', height: '2px', background: '#a85b32' }} />
          Étape finale · Téléchargement
        </div>

        <h1 style={{
          fontFamily: '"Playfair Display", serif', fontSize: '64px', fontWeight: 900,
          letterSpacing: '-2px', lineHeight: 1, color: 'var(--ink)', marginBottom: '24px',
        }}>
          Votre business plan est <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#a85b32' }}>prêt</em>.
        </h1>

        <p style={{ fontSize: '17px', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: '60px', fontWeight: 300 }}>
          Téléchargez votre business plan au format PDF, prêt à présenter à vos banquiers, investisseurs ou incubateurs.
        </p>

        {/* TÉLÉCHARGEMENT VERSION ACTUELLE */}
        <div style={{
          background: 'white', border: '2px solid var(--ink)', padding: '40px',
          marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap',
        }}>
          <div>
            <div style={{
              fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px',
              letterSpacing: '3px', color: '#a85b32', textTransform: 'uppercase',
              marginBottom: '8px',
            }}>
              {sourceLang === 'fr' ? '🇫🇷 Version française' : '🇬🇧 English version'}
            </div>
            <h3 style={{
              fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 900,
              letterSpacing: '-1px', marginBottom: '4px',
            }}>
              Business Plan
            </h3>
            <p style={{ fontSize: '13px', color: '#6b7280' }}>
              Format PDF · A4 · Prêt à imprimer
            </p>
          </div>
          <button onClick={() => downloadPDF(sourceLang)} disabled={downloading === sourceLang} style={{
            background: 'var(--ink)', color: 'white', border: 'none',
            padding: '18px 28px', fontSize: '13px', fontWeight: 600,
            letterSpacing: '1.5px', textTransform: 'uppercase',
            cursor: downloading === sourceLang ? 'wait' : 'pointer', fontFamily: '"IBM Plex Mono", monospace',
            opacity: downloading === sourceLang ? 0.7 : 1,
          }}>
            {downloading === sourceLang ? 'Génération... (~30s)' : '↓ Télécharger PDF'}
          </button>
        </div>

        {/* VERSION TRADUITE */}
        {hasTranslation ? (
          <div style={{
            background: 'white', border: '2px solid #a85b32', padding: '40px',
            marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '20px', flexWrap: 'wrap',
          }}>
            <div>
              <div style={{
                fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px',
                letterSpacing: '3px', color: '#a85b32', textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                {targetLang === 'fr' ? '🇫🇷 Version française' : '🇬🇧 English version'}
              </div>
              <h3 style={{
                fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 900,
                letterSpacing: '-1px', marginBottom: '4px',
              }}>
                Business Plan
              </h3>
              <p style={{ fontSize: '13px', color: '#6b7280' }}>
                Traduit par notre IA experte
              </p>
            </div>
            <button onClick={() => downloadPDF(targetLang)} disabled={downloading === targetLang} style={{
              background: '#a85b32', color: 'white', border: 'none',
              padding: '18px 28px', fontSize: '13px', fontWeight: 600,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              cursor: downloading === targetLang ? 'wait' : 'pointer', fontFamily: '"IBM Plex Mono", monospace',
              opacity: downloading === targetLang ? 0.7 : 1,
            }}>
              {downloading === targetLang ? 'Génération... (~30s)' : '↓ Télécharger PDF'}
            </button>
          </div>
        ) : project.hasTranslation ? (
          <div style={{
            background: '#fef3c7', border: '2px solid #d97706', padding: '40px',
            marginBottom: '24px', textAlign: 'center',
          }}>
            <div style={{
              fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px',
              letterSpacing: '3px', color: '#92400e', textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              ✦ Traduction activée
            </div>
            <h3 style={{
              fontFamily: '"Playfair Display", serif', fontSize: '28px', fontWeight: 900,
              letterSpacing: '-1px', marginBottom: '12px', color: '#78350f',
            }}>
              Lancez votre traduction
            </h3>
            <p style={{ fontSize: '14px', color: '#78350f', lineHeight: 1.6, marginBottom: '24px', maxWidth: '500px', margin: '0 auto 24px' }}>
              Votre traduction est payée. Cliquez ci-dessous pour la générer (cela prend environ 3-5 minutes).
            </p>
            <button onClick={launchTranslation} disabled={translating} style={{
              background: '#a85b32', color: 'white', border: 'none',
              padding: '16px 32px', fontSize: '13px', fontWeight: 600,
              letterSpacing: '1.5px', textTransform: 'uppercase',
              cursor: translating ? 'wait' : 'pointer', fontFamily: '"IBM Plex Mono", monospace',
              opacity: translating ? 0.7 : 1,
            }}>
              {translating ? 'Traduction en cours... (~5 min)' : `✦ Générer la version ${targetLang === 'fr' ? 'française' : 'anglaise'}`}
            </button>
          </div>
        ) : (
          <div style={{
            background: '#0d1b2a', color: 'white', padding: '40px',
            marginBottom: '24px', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px',
              letterSpacing: '3px', color: '#a85b32', textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              ✦ Option supplémentaire
            </div>
            <h3 style={{
              fontFamily: '"Playfair Display", serif', fontSize: '32px', fontWeight: 900,
              letterSpacing: '-1px', marginBottom: '16px', lineHeight: 1.1,
            }}>
              Obtenez aussi la version <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#a85b32' }}>{targetLang === 'en' ? 'anglaise' : 'française'}</em>
            </h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '24px', maxWidth: '500px' }}>
              Idéal pour présenter votre projet à des investisseurs internationaux. Notre IA génère une vraie version professionnelle (pas une simple traduction automatique) en 5 minutes.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
              <div>
                <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '40px', fontWeight: 900, color: '#a85b32' }}>
                  39€
                </div>
                <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  Paiement unique
                </div>
              </div>
              <button onClick={() => alert('Stripe sera bientôt activé. La traduction se lancera automatiquement après paiement.')} style={{
                background: '#a85b32', color: 'white', border: 'none',
                padding: '16px 28px', fontSize: '13px', fontWeight: 600,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                cursor: 'pointer', fontFamily: '"IBM Plex Mono", monospace',
              }}>
                Obtenir la traduction →
              </button>
            </div>
          </div>
        )}

        {/* CONSEILS */}
        <div style={{ marginTop: '60px', padding: '32px', background: 'white', border: '1px solid #d4cfc0' }}>
          <div style={{
            fontFamily: '"IBM Plex Mono", monospace', fontSize: '11px',
            letterSpacing: '3px', color: '#a85b32', textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            💡 Conseils
          </div>
          <ul style={{ fontSize: '14px', lineHeight: 1.8, paddingLeft: '20px', color: '#374151' }}>
            <li>Le PDF est généré en haute qualité, identique à l'éditeur</li>
            <li>Vérifiez le contenu une dernière fois avant téléchargement</li>
            <li>Imprimez en couleur sur du papier 90g minimum pour un rendu pro</li>
            <li>Vous pouvez personnaliser à nouveau dans l'éditeur si besoin</li>
          </ul>
        </div>

      </div>
    </div>
  )
}