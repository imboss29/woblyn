'use client'

import { useState } from 'react'

export default function MobileNav() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav style={{ position: 'relative' }}>
      <div className="nav-left" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
  <img src="/logo.png" alt="Woblyn" style={{ height: '60px' }} />
  <a href="/#solution" className="nav-link-desktop">Solutions</a>
  <a href="/#pricing" className="nav-link-desktop">Tarifs</a>
  <a href="/exemples" className="nav-link-desktop">Exemples</a>
  <a href="/faq" className="nav-link-desktop">FAQ</a>
  <a href="/contact" className="nav-link-desktop">Contact</a>
</div>


      <div className="nav-center-desktop">
        <div className="logo">Woblyn</div>
        <div className="logo-sub">Business Plans</div>
      </div>

      <div className="nav-right">
        <a href="/login" className="nav-cta nav-cta-desktop">Se connecter</a>
        <button 
          className="burger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
  <div className="mobile-menu">
    <a href="/#solution" onClick={() => setMenuOpen(false)}>Solutions</a>
    <a href="/#pricing" onClick={() => setMenuOpen(false)}>Tarifs</a>
    <a href="/exemples" onClick={() => setMenuOpen(false)}>Exemples</a>
    <a href="/faq" onClick={() => setMenuOpen(false)}>FAQ</a>
    <a href="/contact" onClick={() => setMenuOpen(false)}>Contact</a>
    <a href="/login" onClick={() => setMenuOpen(false)} className="mobile-cta">
      Se connecter →
    </a>
  </div>
)}
    </nav>
  )
}