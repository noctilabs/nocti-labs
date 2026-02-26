import { defineType, defineField } from 'sanity'
import { SparklesIcon } from '@sanity/icons'

export const introSectionType = defineType({
  name: 'introSection',
  title: 'Intro Section',
  type: 'object',
  icon: SparklesIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'badge',
      type: 'object',
      fields: [
        defineField({ name: 'image', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'text', type: 'string' }),
      ],
    }),
    defineField({
      name: 'cta',
      type: 'cta',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return {
        title: title || 'Untitled Intro',
        subtitle: 'Intro Section',
      }
    },
  },
})
