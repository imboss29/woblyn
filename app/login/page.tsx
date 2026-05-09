'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function LoginPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    })

    setLoading(false)

    if (res?.error) {
      setError('Email ou mot de passe incorrect')
    } else {
      router.push('/dashboard')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--paper)',
      padding: '20px',
    }}>
      <div style={{
        background: 'white',
        border: '2px solid var(--ink)',
        padding: '48px',
        maxWidth: '420px',
        width: '100%',
      }}>
        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '36px',
          fontWeight: 900,
          marginBottom: '8px',
          letterSpacing: '-1px',
        }}>
          Connexion
        </h1>
        <p style={{
          fontSize: '14px',
          color: 'var(--gray)',
          marginBottom: '32px',
        }}>
          Accédez à vos business plans.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={labelStyle}>Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Mot de passe</label>
            <input
              type="password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              style={inputStyle}
            />
          </div>

          {error && (
            <div style={{ color: '#b91c1c', fontSize: '13px' }}>{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              background: 'var(--ink)',
              color: 'white',
              padding: '14px',
              border: 'none',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        <p style={{ marginTop: '24px', fontSize: '13px', color: 'var(--gray)', textAlign: 'center' }}>
          Pas encore de compte ? <a href="/signup" style={{ color: 'var(--ink)', fontWeight: 600 }}>Créer un compte</a>
        </p>
      </div>
    </div>
  )
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '12px',
  fontWeight: 600,
  marginBottom: '6px',
  fontFamily: '"IBM Plex Mono", monospace',
  textTransform: 'uppercase',
  letterSpacing: '1px',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px',
  border: '1px solid #d4cfc0',
  fontSize: '14px',
  fontFamily: '"IBM Plex Sans", sans-serif',
  outline: 'none',
}