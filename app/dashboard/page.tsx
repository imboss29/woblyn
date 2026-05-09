import { getServerSession } from 'next-auth'
import { authOptions } from '../../lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '../../lib/prisma'

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/login')
  }

  const projects = await prisma.project.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: 'desc' },
  })

  const totalProjects = projects.length
  const paidProjects = projects.filter(p => p.isPaid).length
  const draftProjects = projects.filter(p => !p.content).length
  const completedProjects = projects.filter(p => p.content && !p.isPaid).length

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
        <span>Tableau de bord · Édition Mai 2026</span>
        <span>Woblyn</span>
      </div>

      {/* NAV */}
      <nav style={{
        background: 'var(--paper)',
        padding: '24px 60px',
        borderBottom: '2px solid var(--ink)',
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
      }}>
        <div style={{ display: 'flex', gap: '32px', fontSize: '13px', fontWeight: 500 }}>
          <a href="/dashboard" style={{ color: 'var(--ink)', textDecoration: 'none', fontWeight: 700 }}>Mes plans</a>
          <a href="/" style={{ color: 'var(--gray)', textDecoration: 'none' }}>Accueil</a>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '36px',
            fontWeight: 900,
            letterSpacing: '-1px',
          }}>Woblyn</div>
          <div style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '9px',
            letterSpacing: '4px',
            color: 'var(--gray)',
            marginTop: '-2px',
            textTransform: 'uppercase',
          }}>Business Plans · Établi 2026</div>
        </div>
        <div style={{ textAlign: 'right', display: 'flex', gap: '16px', justifyContent: 'flex-end', alignItems: 'center' }}>
          <span style={{ fontSize: '13px', color: 'var(--gray)' }}>
            {session.user.name || session.user.email}
          </span>
          <a href="/api/auth/signout" style={{
            fontSize: '12px',
            color: 'var(--ink)',
            textDecoration: 'none',
            border: '1px solid var(--ink)',
            padding: '8px 14px',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}>
            Déconnexion
          </a>
        </div>
      </nav>

      {/* HEADER */}
      <section style={{ padding: '60px 60px 40px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '12px',
            letterSpacing: '3px',
            color: '#1d4ed8',
            textTransform: 'uppercase',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <span style={{ width: '30px', height: '2px', background: '#1d4ed8' }}></span>
            Bienvenue
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '60px', alignItems: 'flex-end' }}>
            <div>
              <h1 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '72px',
                fontWeight: 900,
                lineHeight: 0.95,
                letterSpacing: '-3px',
                color: 'var(--ink)',
                marginBottom: '16px',
              }}>
                Bonjour <em style={{ fontStyle: 'italic', fontWeight: 400, color: '#1d4ed8' }}>{session.user.name?.split(' ')[0] || 'Entrepreneur'}</em>.
              </h1>
              <p style={{
                fontSize: '18px',
                color: 'var(--ink-soft)',
                lineHeight: 1.5,
                fontWeight: 300,
                maxWidth: '500px',
              }}>
                Retrouvez vos business plans en cours, créez-en de nouveaux et accédez à vos documents finalisés.
              </p>
            </div>

            <div style={{ textAlign: 'right' }}>
              <a href="/start" style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                padding: '20px 32px',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
              }}>
                + Nouveau business plan
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: '20px 60px 40px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 0,
            border: '2px solid var(--ink)',
            background: 'white',
          }}>
            <StatBlock label="Total plans" value={totalProjects.toString()} accent="#1d4ed8" />
            <StatBlock label="Brouillons" value={draftProjects.toString()} accent="#a85b32" />
            <StatBlock label="Aperçus générés" value={completedProjects.toString()} accent="#a85b32" />
            <StatBlock label="Documents complets" value={paidProjects.toString()} accent="#15803d" last />
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section style={{ padding: '40px 60px 80px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px', paddingBottom: '20px', borderBottom: '1px solid var(--gray-line)' }}>
            <div>
              <div style={{
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: '11px',
                letterSpacing: '3px',
                color: '#a85b32',
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}>
                Article 01 — Vos documents
              </div>
              <h2 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '48px',
                fontWeight: 900,
                letterSpacing: '-1.5px',
                lineHeight: 1,
              }}>
                Vos business plans.
              </h2>
            </div>
            {projects.length > 0 && (
              <span style={{ fontSize: '13px', color: 'var(--gray)' }}>
                {projects.length} {projects.length === 1 ? 'document' : 'documents'}
              </span>
            )}
          </div>

          {projects.length === 0 ? (
            <div style={{
              background: 'white',
              border: '1px solid var(--gray-line)',
              padding: '80px 40px',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '120px',
                fontWeight: 900,
                color: '#1d4ed8',
                lineHeight: 0.8,
                marginBottom: '24px',
                opacity: 0.15,
              }}>
                01
              </div>
              <h3 style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '32px',
                fontWeight: 900,
                marginBottom: '12px',
                letterSpacing: '-1px',
              }}>
                Aucun business plan pour l'instant.
              </h3>
              <p style={{ fontSize: '15px', color: 'var(--gray)', marginBottom: '32px', maxWidth: '420px', margin: '0 auto 32px', fontWeight: 300, lineHeight: 1.7 }}>
                Commencez par créer votre premier business plan. L'intelligence artificielle vous accompagne pas à pas pour produire un document professionnel.
              </p>
              <a href="/start" style={{
                background: 'var(--ink)',
                color: 'var(--paper)',
                padding: '16px 28px',
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                textDecoration: 'none',
                display: 'inline-block',
              }}>
                Créer mon premier plan →
              </a>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
              {projects.map((project, i) => {
                const status = !project.content ? 'draft' : project.isPaid ? 'paid' : 'preview'
                const statusLabel = status === 'draft' ? 'Brouillon' : status === 'paid' ? 'Document complet' : 'Aperçu généré'
                const statusColor = status === 'draft' ? '#a85b32' : status === 'paid' ? '#15803d' : '#1d4ed8'
                const href = !project.content
                  ? `/projects/${project.id}/generating`
                  : `/projects/${project.id}/edit`

                return (
                  <a key={project.id} href={href} style={{
                    background: 'white',
                    border: '1px solid var(--gray-line)',
                    padding: '32px',
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '220px',
                    position: 'relative',
                    transition: 'all 0.15s',
                  }}>
                    {/* Numéro */}
                    <div style={{
                      position: 'absolute',
                      top: '24px',
                      right: '24px',
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '36px',
                      fontWeight: 900,
                      color: 'var(--gray-line)',
                      lineHeight: 1,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* Status */}
                    <div style={{
                      fontFamily: '"IBM Plex Mono", monospace',
                      fontSize: '10px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: statusColor,
                      marginBottom: '16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}>
                      <span style={{ width: '6px', height: '6px', background: statusColor, borderRadius: '50%' }}></span>
                      {statusLabel}
                    </div>

                    {/* Titre */}
                    <h3 style={{
                      fontFamily: '"Playfair Display", serif',
                      fontSize: '24px',
                      fontWeight: 700,
                      marginBottom: '12px',
                      letterSpacing: '-0.5px',
                      lineHeight: 1.2,
                      paddingRight: '40px',
                    }}>
                      {project.name}
                    </h3>

                    {/* Date */}
                    <div style={{
                      fontSize: '12px',
                      color: 'var(--gray)',
                      marginTop: 'auto',
                      paddingTop: '16px',
                      borderTop: '1px solid var(--gray-line)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <span>Modifié le {new Date(project.updatedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}</span>
                      <span style={{ color: 'var(--ink)', fontWeight: 600 }}>→</span>
                    </div>
                  </a>
                )
              })}

              {/* Carte "Nouveau" */}
              <a href="/start" style={{
                background: 'transparent',
                border: '2px dashed var(--gray-line)',
                padding: '32px',
                textDecoration: 'none',
                color: 'inherit',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '220px',
                gap: '12px',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  border: '2px solid var(--ink)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"Playfair Display", serif',
                  fontSize: '24px',
                  fontWeight: 900,
                }}>+</div>
                <div style={{
                  fontFamily: '"IBM Plex Mono", monospace',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}>
                  Nouveau plan
                </div>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* TIPS */}
      {projects.length > 0 && (
        <section style={{ padding: '60px 60px', background: 'var(--paper-warm)', borderTop: '2px solid var(--ink)' }}>
          <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
            <div style={{
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: '11px',
              letterSpacing: '3px',
              color: '#a85b32',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}>
              Article 02 — Conseils
            </div>
            <h2 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '40px',
              fontWeight: 900,
              letterSpacing: '-1.5px',
              lineHeight: 1,
              marginBottom: '40px',
            }}>
              Pour aller plus loin.
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
              <Tip num="01" title="Affinez votre document" desc="L'IA génère une V1 complète. Prenez le temps de la relire et de l'ajuster avec vos chiffres exacts." />
              <Tip num="02" title="Préparez vos sources" desc="Avant de présenter votre business plan, ayez en tête vos sources de chiffres et études de marché." />
              <Tip num="03" title="Adaptez selon l'audience" desc="Un banquier, un investisseur ou un incubateur n'attendent pas le même niveau de détail. Personnalisez." />
            </div>
          </div>
        </section>
      )}

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
          <div style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '24px',
            fontWeight: 900,
            letterSpacing: '-1px',
          }}>Woblyn</div>
          <div style={{
            fontFamily: '"IBM Plex Mono", monospace',
            fontSize: '11px',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.5)',
          }}>© 2026 · Tous droits réservés</div>
        </div>
      </footer>

    </div>
  )
}

// COMPONENTS
function StatBlock({ label, value, accent, last }: { label: string, value: string, accent: string, last?: boolean }) {
  return (
    <div style={{
      padding: '32px',
      borderRight: last ? 'none' : '1px solid var(--ink)',
    }}>
      <div style={{
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '10px',
        letterSpacing: '2px',
        color: 'var(--gray)',
        textTransform: 'uppercase',
        marginBottom: '12px',
      }}>
        {label}
      </div>
      <div style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '56px',
        fontWeight: 900,
        lineHeight: 1,
        letterSpacing: '-2px',
        color: accent,
      }}>
        {value}
      </div>
    </div>
  )
}

function Tip({ num, title, desc }: { num: string, title: string, desc: string }) {
  return (
    <div style={{ borderTop: '4px solid var(--ink)', paddingTop: '20px' }}>
      <div style={{
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: '12px',
        fontWeight: 600,
        color: 'var(--gray)',
        marginBottom: '12px',
      }}>
        N° {num}
      </div>
      <h3 style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: '24px',
        fontWeight: 900,
        marginBottom: '8px',
        letterSpacing: '-0.5px',
        lineHeight: 1.1,
      }}>
        {title}
      </h3>
      <p style={{
        fontSize: '14px',
        lineHeight: 1.7,
        color: 'var(--ink-soft)',
        fontWeight: 300,
      }}>
        {desc}
      </p>
    </div>
  )
}