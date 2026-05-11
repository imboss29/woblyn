'use client'

export default function WaitlistButton({ plan }: { plan: 'pro' | 'business' }) {
  return (
    <button 
      onClick={() => (window as any).openWaitlistModal?.(plan)} 
      className="plan-btn plan-btn-soon"
    >
      Rejoindre la liste d'attente
    </button>
  )
}