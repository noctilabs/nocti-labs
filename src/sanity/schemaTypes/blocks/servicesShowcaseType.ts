import { defineType, defineField, defineArrayMember } from 'sanity'
import { BulbOutlineIcon } from '@sanity/icons'

export const servicesShowcaseType = defineType({
  name: 'servicesShowcase',
  title: 'Services Showcase',
  type: 'object',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      type: 'text',
      description: 'Supporting text that appears alongside the heading',
    }),
    defineField({
      name: 'services',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'service' }],
        }),
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
        title: title || 'Services Showcase',
        subtitle: 'Services Showcase',
      }
    },
  },
})
