import createMiddleware from 'next-intl/middleware'
import { routing } from './src/i18n/routing'

export default createMiddleware(routing)

export const config = {
  matcher: [
    '/',
    '/(en|es)/:path*',
    '/((?!studio|_next|_vercel|.*\\..*).*)',
  ],
}
