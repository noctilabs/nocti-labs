import { notFound } from 'next/navigation'
import { sanityFetch } from '@/sanity/lib/live'
import { PROJECT_QUERY, PROJECTS_QUERY } from '@/sanity/lib/queries'
import ProjectPage from '@/components/work/ProjectPage'

export const dynamic = 'force-dynamic'

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const [{ data: project }, { data: allProjects }] = await Promise.all([
    sanityFetch({ query: PROJECT_QUERY, params: { slug, locale } }),
    sanityFetch({ query: PROJECTS_QUERY, params: { locale } }),
  ])

  if (!project) notFound()

  const idx = (allProjects ?? []).findIndex((p: { slug?: { current?: string } }) => p.slug?.current === slug)
  const nextProject = idx >= 0 && idx < (allProjects ?? []).length - 1 ? allProjects[idx + 1] : null

  return <ProjectPage project={project} nextProject={nextProject} locale={locale} />
}
