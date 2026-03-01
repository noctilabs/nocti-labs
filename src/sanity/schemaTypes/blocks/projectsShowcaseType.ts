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
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'string',
      description: 'Hex color for the page background (e.g., #ffffff)',
      validation: (rule) => rule.regex(/^#[0-9A-F]{6}$/i).error('Must be a valid hex color'),
    }),
    defineField({
      name: 'headingColor',
      title: 'Heading Color',
      type: 'string',
      description: 'Hex color for the heading text (e.g., #000000)',
      validation: (rule) => rule.regex(/^#[0-9A-F]{6}$/i).error('Must be a valid hex color'),
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
