import { defineType, defineField, defineArrayMember, SlugIsUniqueValidator } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

const isUniqueAcrossLanguages: SlugIsUniqueValidator = async (slug, context) => {
  const { document, getClient } = context
  const client = getClient({ apiVersion: '2024-01-01' })
  if (!document) return true
  const language = (document as { language?: string }).language
  // If no language set, skip custom validation and allow
  if (!language) return true
  const id = document._id.replace(/^drafts\./, '')
  const params = { draft: `drafts.${id}`, published: id, slug, language }
  const query = `!defined(*[
    !(_id in [$draft, $published]) &&
    slug.current == $slug &&
    language == $language
  ][0]._id)`
  return client.fetch(query, params)
}

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        isUnique: isUniqueAcrossLanguages,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'language',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      of: [
        defineArrayMember({ type: 'hero' }),
        defineArrayMember({ type: 'introSection' }),
        defineArrayMember({ type: 'servicesShowcase' }),
        defineArrayMember({ type: 'projectsShowcase' }),
        defineArrayMember({ type: 'insightsGrid' }),
        defineArrayMember({ type: 'contactSection' }),
        defineArrayMember({ type: 'missionSection' }),
        defineArrayMember({ type: 'aboutSection' }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({ name: 'title', type: 'string', title: 'SEO Title' }),
        defineField({ name: 'description', type: 'text', title: 'SEO Description', rows: 3 }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled Page',
        subtitle: slug ? `/${slug}` : '',
      }
    },
  },
})
