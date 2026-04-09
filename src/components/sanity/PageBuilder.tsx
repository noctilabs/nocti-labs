import SanityHero from './blocks/SanityHero'
import SanityIntroSection from './blocks/SanityIntroSection'
import SanityServicesShowcase from './blocks/SanityServicesShowcase'
import SanityProjectsShowcase from './blocks/SanityProjectsShowcase'
import SanityInsightsGrid from './blocks/SanityInsightsGrid'
import SanityContactSection from './blocks/SanityContactSection'
import SanityMissionSection from './blocks/SanityMissionSection'
import SanityAboutSection from './blocks/SanityAboutSection'
import type { PAGE_QUERY_RESULT } from '../../../sanity.types'

type Block = NonNullable<NonNullable<PAGE_QUERY_RESULT>['pageBuilder']>[number]

interface PageBuilderProps {
  blocks?: Block[] | null
  pageSlug?: string
}

export default function PageBuilder({ blocks, pageSlug }: PageBuilderProps) {
  if (!Array.isArray(blocks)) return null

  const renderBlock = (block: Block, pageSlug?: string) => {
    switch (block._type) {
      case 'hero':
        return <SanityHero {...block} />
      case 'introSection':
        return <SanityIntroSection {...block} />
      case 'servicesShowcase':
        return <SanityServicesShowcase {...block} pageSlug={pageSlug} />
      case 'projectsShowcase':
        return <SanityProjectsShowcase {...block} />
      case 'insightsGrid':
        return <SanityInsightsGrid {...block} />
      case 'contactSection':
        return <SanityContactSection {...block} />
      case 'missionSection':
        return <SanityMissionSection {...block} />
      case 'aboutSection':
        return <SanityAboutSection {...block} />
      default:
        return (
          <div className="py-10 text-center text-muted font-mono text-sm">
            Unknown block type: {(block as { _type: string })._type}
          </div>
        )
    }
  }

  return (
    <main>
      {blocks.map((block, i) => (
        <div key={block._key} className="sticky top-0" style={{ zIndex: i + 1 }}>
          {renderBlock(block, pageSlug)}
        </div>
      ))}
    </main>
  )
}
