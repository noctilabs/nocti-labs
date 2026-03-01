import SanityHero from './blocks/SanityHero'
import SanityIntroSection from './blocks/SanityIntroSection'
import SanityServicesShowcase from './blocks/SanityServicesShowcase'
import SanityProjectsShowcase from './blocks/SanityProjectsShowcase'
import SanityInsightsGrid from './blocks/SanityInsightsGrid'
import SanityContactSection from './blocks/SanityContactSection'
import SanityMissionSection from './blocks/SanityMissionSection'
import SanityAboutSection from './blocks/SanityAboutSection'
import type { PAGE_QUERYResult } from '../../../sanity.types'

type Block = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]

interface PageBuilderProps {
  blocks?: Block[] | null
}

export default function PageBuilder({ blocks }: PageBuilderProps) {
  if (!Array.isArray(blocks)) return null

  return (
    <main>
      {blocks.map((block) => {
        const { _key, _type } = block
        switch (_type) {
          case 'hero':
            return <SanityHero key={_key} {...block} />
          case 'introSection':
            return <SanityIntroSection key={_key} {...block} />
          case 'servicesShowcase':
            return <SanityServicesShowcase key={_key} {...block} />
          case 'projectsShowcase':
            return <SanityProjectsShowcase key={_key} {...block} />
          case 'insightsGrid':
            return <SanityInsightsGrid key={_key} {...block} />
          case 'contactSection':
            return <SanityContactSection key={_key} {...block} />
          case 'missionSection':
            return <SanityMissionSection key={_key} {...block} />
          case 'aboutSection':
            return <SanityAboutSection key={_key} {...block} />
          default:
            return (
              <div key={_key} className="py-10 text-center text-muted font-mono text-sm">
                Unknown block type: {_type}
              </div>
            )
        }
      })}
    </main>
  )
}
