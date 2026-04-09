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
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: { decorators: [], annotations: [] },
        },
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
          marks: { decorators: [], annotations: [] },
        },
      ],
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
    select: { heading: 'heading' },
    prepare({ heading }) {
      const title = Array.isArray(heading)
        ? heading.map((b: { children?: Array<{ text?: string }> }) => b.children?.map((c) => c.text).join('')).join(' ')
        : heading
      return {
        title: title || 'Untitled Intro',
        subtitle: 'Intro Section',
      }
    },
  },
})
