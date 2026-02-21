import { defineType, defineField, defineArrayMember } from 'sanity'
import { CaseIcon } from '@sanity/icons'

export const projectsShowcaseType = defineType({
  name: 'projectsShowcase',
  title: 'Projects Showcase',
  type: 'object',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'projects',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'project' }],
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return {
        title: title || 'Projects Showcase',
        subtitle: 'Projects Showcase',
      }
    },
  },
})
