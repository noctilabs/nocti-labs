import SanityHero from './blocks/SanityHero'
import SanityIntroSection from './blocks/SanityIntroSection'
import SanityServicesShowcase from './blocks/SanityServicesShowcase'
import SanityProjectsShowcase from './blocks/SanityProjectsShowcase'
import SanityInsightsGrid from './blocks/SanityInsightsGrid'
import SanityContactSection from './blocks/SanityContactSection'

interface Block {
  _key: string
  _type: string
  [key: string]: unknown
}

interface PageBuilderProps {
  blocks?: Block[] | null
}

export default function PageBuilder({ blocks }: PageBuilderProps) {
  if (!Array.isArray(blocks)) return null

  return (
    <main>
      {blocks.map((block) => {
        switch (block._type) {
          case 'hero':
            return <SanityHero key={block._key} {...(block as React.ComponentProps<typeof SanityHero>)} />
          case 'introSection':
            return <SanityIntroSection key={block._key} {...(block as React.ComponentProps<typeof SanityIntroSection>)} />
          case 'servicesShowcase':
            return <SanityServicesShowcase key={block._key} {...(block as React.ComponentProps<typeof SanityServicesShowcase>)} />
          case 'projectsShowcase':
            return <SanityProjectsShowcase key={block._key} {...(block as React.ComponentProps<typeof SanityProjectsShowcase>)} />
          case 'insightsGrid':
            return <SanityInsightsGrid key={block._key} {...(block as React.ComponentProps<typeof SanityInsightsGrid>)} />
          case 'contactSection':
            return <SanityContactSection key={block._key} {...(block as React.ComponentProps<typeof SanityContactSection>)} />
          default:
            return (
              <div key={block._key} className="py-10 text-center text-muted font-mono text-sm">
                Unknown block type: {block._type}
              </div>
            )
        }
      })}
    </main>
  )
}
