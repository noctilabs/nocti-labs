import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentIcon } from '@sanity/icons'

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
      options: { source: 'title' },
      validation: (rule) => rule.required(),
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
