import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

function getPreferredLocale(acceptLanguage: string | null): 'en' | 'es' {
  if (!acceptLanguage) return 'en'

  const normalized = acceptLanguage.toLowerCase()
  return normalized.includes('es') ? 'es' : 'en'
}

export default async function RootPage() {
  const acceptLanguage = (await headers()).get('accept-language')
  const locale = getPreferredLocale(acceptLanguage)

  redirect(`/${locale}`)
}
