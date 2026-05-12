import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

// Rate limit pour les APIs sensibles (génération IA, traduction, etc.)
// 10 requêtes par minute par IP
export const expensiveRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '1 m'),
  analytics: true,
  prefix: 'ratelimit:expensive',
})

// Rate limit pour l'authentification (signup, login)
// 5 tentatives par minute par IP
export const authRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(5, '1 m'),
  analytics: true,
  prefix: 'ratelimit:auth',
})

// Rate limit pour les formulaires publics (contact, waitlist)
// 3 soumissions par 10 minutes par IP
export const formRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(3, '10 m'),
  analytics: true,
  prefix: 'ratelimit:form',
})

// Rate limit global pour toute action (anti DDoS basique)
// 60 requêtes par minute par IP
export const globalRatelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(60, '1 m'),
  analytics: true,
  prefix: 'ratelimit:global',
})

// Récupère l'IP du client à partir des headers
export function getIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp
  
  return 'unknown'
}