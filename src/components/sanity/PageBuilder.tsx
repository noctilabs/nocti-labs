import React from 'react'
import SanityHero from './blocks/SanityHero'
import SanityIntroSection from './blocks/SanityIntroSection'
import SanityServicesShowcase from './blocks/SanityServicesShowcase'
import SanityProjectsShowcase from './blocks/SanityProjectsShowcase'
import SanityInsightsGrid from './blocks/SanityInsightsGrid'
import SanityContactSection from './blocks/SanityContactSection'
import SanityMissionSection from './blocks/SanityMissionSection'
import SanityAboutSection from './blocks/SanityAboutSection'
import { createDataAttribute } from '@sanity/visual-editing'
import type { PAGE_QUERYResult } from '../../../sanity.types'

type Block = NonNullable<NonNullable<PAGE_QUERYResult>['pageBuilder']>[number]

interface PageBuilderProps {
  blocks?: Block[] | null
  documentId?: string
}

export default function PageBuilder({ blocks, documentId }: PageBuilderProps) {
  if (!Array.isArray(blocks)) return null

  return (
    <main>
      {blocks.map((block) => {
        const { _key, _type } = block
        const dataAttr = documentId
          ? createDataAttribute({
              id: documentId,
              type: 'page',
              path: `pageBuilder[_key=="${_key}"]`,
            }).toString()
          : undefined
        let content: React.ReactNode
        switch (_type) {
          case 'hero':
            content = <SanityHero {...block} documentId={documentId} />
            break
          case 'introSection':
            content = <SanityIntroSection {...block} documentId={documentId} />
            break
          case 'servicesShowcase':
            content = <SanityServicesShowcase {...block} documentId={documentId} />
            break
          case 'projectsShowcase':
            content = <SanityProjectsShowcase {...block} documentId={documentId} />
            break
          case 'insightsGrid':
            content = <SanityInsightsGrid {...block} documentId={documentId} />
            break
          case 'contactSection':
            content = <SanityContactSection {...block} documentId={documentId} />
            break
          case 'missionSection':
            content = <SanityMissionSection {...block} documentId={documentId} />
            break
          case 'aboutSection':
            content = <SanityAboutSection {...block} documentId={documentId} />
            break
          default:
            content = (
              <div className="py-10 text-center text-muted font-mono text-sm">
                Unknown block type: {_type}
              </div>
            )
        }
        return (
          <div key={_key} data-sanity={dataAttr}>
            {content}
          </div>
        )
      })}
    </main>
  )
}
