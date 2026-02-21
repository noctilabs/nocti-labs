import { urlFor } from '@/sanity/lib/image'

interface ProjectDoc {
  _id: string
  title?: string
  slug?: { current?: string }
  client?: string
  description?: string
  coverImage?: { asset?: { _ref: string } }
  tags?: string[]
  url?: string
}

interface SanityProjectsShowcaseProps {
  _key: string
  heading?: string
  projects?: ProjectDoc[]
}

export default function SanityProjectsShowcase({
  heading,
  projects,
}: SanityProjectsShowcaseProps) {
  return (
    <section className="bg-black text-white py-20 px-8 md:px-16">
      {heading && (
        <h2 className="font-body text-[48px] font-bold mb-12">{heading}</h2>
      )}

      {projects && projects.length > 0 && (
        <div className="space-y-16">
          {projects.map((project) => (
            <div key={project._id}>
              {/* Cover Image */}
              {project.coverImage?.asset?._ref ? (
                <img
                  src={urlFor(project.coverImage).width(1400).url()}
                  alt={project.title || ''}
                  className="w-full aspect-video object-cover rounded-lg mb-8"
                />
              ) : (
                <div className="w-full aspect-video bg-accent rounded-lg mb-8 flex items-center justify-center">
                  <div className="text-black text-center">
                    <p className="font-mono text-[12px] uppercase font-bold">
                      Project Media
                    </p>
                  </div>
                </div>
              )}

              {/* Caption */}
              <div className="flex items-baseline justify-between gap-4">
                <p className="font-mono text-[14px] uppercase text-white opacity-80">
                  {project.client && `${project.client}, `}
                  {project.title}
                </p>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex gap-2">
                    {project.tags.map((tag, i) => (
                      <span
                        key={`${project._id}-tag-${i}`}
                        className="font-mono text-[11px] uppercase text-muted border border-muted rounded-full px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
