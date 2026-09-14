import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

let redis: Redis | null = null

try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    redis = Redis.fromEnv()
  }
} catch (e) {
  console.warn('Upstash Redis non disponible, rate limiting desactive:', e)
  redis = null
}

function makeRatelimit(limiter: any, prefix: string): Ratelimit | null {
  if (!redis) return null
  return new Ratelimit({ redis, limiter, analytics: true, prefix })
}

export const expensiveRatelimit = makeRatelimit(Ratelimit.slidingWindow(10, '1 m'), 'ratelimit:expensive')
export const authRatelimit = makeRatelimit(Ratelimit.slidingWindow(5, '1 m'), 'ratelimit:auth')
export const formRatelimit = makeRatelimit(Ratelimit.slidingWindow(3, '10 m'), 'ratelimit:form')
export const globalRatelimit = makeRatelimit(Ratelimit.slidingWindow(60, '1 m'), 'ratelimit:global')

export function getIp(req: Request): string {
  const forwarded = req.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  const realIp = req.headers.get('x-real-ip')
  if (realIp) return realIp
  return 'unknown'
}

export async function checkRateLimit(limiter: Ratelimit | null, identifier: string): Promise<boolean> {
  if (!limiter) return true
  try {
    const { success } = await limiter.limit(identifier)
    return success
  } catch (e) {
    console.warn('Rate limit check failed, allowing request:', e)
    return true
  }
}
