import { getServerSession } from 'next-auth'
import { authOptions } from '../../../lib/auth'
import { prisma } from '../../../lib/prisma'
import { redirect } from 'next/navigation'
import { SECTION_KEYS, SECTION_LABELS, SectionKey } from '../../../lib/prompts'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export default async function ProjectPage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions)
  if (!session?.user) redirect('/login')

  const project = await prisma.project.findUnique({
    where: { id: params.id },
  })

  if (!project) redirect('/dashboard')
  if (project.userId !== session.user.id) redirect('/dashboard')
  if (!project.content) redirect(`/projects/${project.id}/generating`)

  const content = project.content as Record<string, string>
  const isPaid = project.isPaid

  const freeSections: SectionKey[] = ['executiveSummary', 'projectPresentation', 'marketAnalysis']

  return (
    <div style={{ minHeight: '100vh', background: 'var(--paper)', padding: '40px 20px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        <div style={{ marginBottom: '40px' }}>
          <a href="/dashboard" style={{ fontSize: '12px', color: 'var(--gray)', textDecoration: 'none' }}>← Dashboard</a>
        </div>

        <div style={{
  background: 'var(--ink)',
  color: 'var(--paper)',
  padding: '48px',
  marginBottom: '24px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  gap: '32px',
  flexWrap: 'wrap',
}}>
  <div style={{ flex: 1, minWidth: '280px' }}>
    <div style={{
      fontFamily: '"IBM Plex Mono", monospace',
      fontSize: '11px',
      letterSpacing: '3px',
      color: '#a85b32',
      textTransform: 'uppercase',
      marginBottom: '12px',
    }}>
      Business Plan · {isPaid ? 'Document complet' : 'Aperçu gratuit'}
    </div>
    <h1 style={{
      fontFamily: '"Playfair Display", serif',
      fontSize: '56px',
      fontWeight: 900,
      letterSpacing: '-2px',
      lineHeight: 1,
      marginBottom: '12px',
    }}>
      {project.name}
    </h1>
    <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.5)', fontFamily: '"IBM Plex Mono", monospace', letterSpacing: '1px', textTransform: 'uppercase' }}>
      Généré le {new Date(project.updatedAt).toLocaleDateString('fr-FR')}
    </div>
  </div>

  {isPaid ? (
    <a href={`/projects/${project.id}/edit`} style={{
      background: '#a85b32',
      color: 'white',
      padding: '16px 24px',
      fontSize: '13px',
      fontWeight: 600,
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      textDecoration: 'none',
      fontFamily: '"IBM Plex Mono", monospace',
      whiteSpace: 'nowrap',
    }}>
      ✎ Personnaliser le document →
    </a>
  ) : (
    <a href={`/checkout/${project.id}`} style={{
      background: '#a85b32',
      color: 'white',
      padding: '16px 24px',
      fontSize: '13px',
      fontWeight: 600,
      letterSpacing: '1.5px',
      textTransform: 'uppercase',
      textDecoration: 'none',
      fontFamily: '"IBM Plex Mono", monospace',
      whiteSpace: 'nowrap',
    }}>
      Débloquer pour seulement 97€ →
    </a>
  )}
</div>

        {SECTION_KEYS.map((key, i) => {
          const isVisible = isPaid || freeSections.includes(key)
          const text = content[key] || ''

          return (
            <div key={key} style={{
              background: 'white',
              border: '1px solid #d4cfc0',
              padding: '40px',
              marginBottom: '16px',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '11px',
                letterSpacing: '3px',
                color: '#a85b32',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}>
                Section {String(i + 1).padStart(2, '0')}
              </div>
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '32px',
                fontWeight: 900,
                letterSpacing: '-1px',
                marginBottom: '20px',
              }}>
                {SECTION_LABELS[key]}
              </h2>

              {isVisible ? (
                <div className="document-content" style={{
                  fontSize: '15px',
                  lineHeight: 1.8,
                  color: 'var(--ink)',
                  fontWeight: 300,
                }}>
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
                </div>
              ) : (
                <div style={{ position: 'relative' }}>
                  <div className="document-content" style={{
                    fontSize: '15px',
                    lineHeight: 1.8,
                    color: 'var(--ink)',
                    filter: 'blur(6px)',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    fontWeight: 300,
                    maxHeight: '200px',
                    overflow: 'hidden',
                  }}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{text.substring(0, 600)}</ReactMarkdown>
                  </div>
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, rgba(244,241,234,0) 0%, rgba(244,241,234,0.95) 80%)',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    paddingBottom: '20px',
                  }}>
                    <div style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '11px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: 'var(--gray)',
                    }}>
                      🔒 Section verrouillée
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}

        {!isPaid && (
          <div style={{
            background: 'var(--ink)',
            color: 'var(--paper)',
            padding: '48px',
            marginTop: '40px',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '11px',
              letterSpacing: '3px',
              color: '#a85b32',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              Débloquez le document complet
            </div>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '40px',
              fontWeight: 900,
              letterSpacing: '-1.5px',
              lineHeight: 1,
              marginBottom: '12px',
            }}>
              7 sections restantes.
            </h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
              Accédez aux projections financières, plan de financement, analyse des risques et exportez en PDF/Word.
            </p>
            <button onClick={async () => {
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ projectId: project.id }),
    })
    const data = await res.json()
    if (data.url) {
      window.location.href = data.url
    } else {
      alert(data.error || 'Erreur lors du paiement')
    }
  } catch (err) {
    alert('Erreur de connexion')
  }
}} style={{
  background: '#a85b32',
  color: 'white',
  padding: '16px 32px',
  fontSize: '13px',
  fontWeight: 600,
  letterSpacing: '1.5px',
  textTransform: 'uppercase',
  textDecoration: 'none',
  display: 'inline-block',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
}}>
  Débloquer pour 97€ →
</button>
          </div>
        )}

      </div>
    </div>
  )
}