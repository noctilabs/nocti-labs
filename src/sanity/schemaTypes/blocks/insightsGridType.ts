import { defineType, defineField, defineArrayMember } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const insightsGridType = defineType({
  name: 'insightsGrid',
  title: 'Insights Grid',
  type: 'object',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'featuredPosts',
      title: 'Featured Posts',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'blogPost' }],
        }),
      ],
      validation: (rule) => rule.max(4).warning('Recommended max of 4 posts for the grid'),
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return {
        title: title || 'Insights Grid',
        subtitle: 'Insights Grid',
      }
    },
  },
})
