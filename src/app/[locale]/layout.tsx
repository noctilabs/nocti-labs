import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { getMessages, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { SanityLive } from '@/sanity/lib/live'
import NavWrapper from '@/components/layout/NavWrapper'
import ScrollToTop from '@/components/layout/ScrollToTop'

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = await getMessages()

  return (
    <NextIntlClientProvider key={locale} locale={locale} messages={messages}>
      <ScrollToTop />
      <NavWrapper />
      {children}
      <SanityLive />
    </NextIntlClientProvider>
  )
}
