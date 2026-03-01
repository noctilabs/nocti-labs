import { defineType, defineField, defineArrayMember } from 'sanity'
import { UserIcon } from '@sanity/icons'

export const missionSectionType = defineType({
  name: 'missionSection',
  title: 'Mission Section',
  type: 'object',
  icon: UserIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional decorative image displayed above the principles',
    }),
    defineField({
      name: 'principles',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'description',
              type: 'text',
              rows: 3,
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'icon',
              type: 'image',
              options: { hotspot: true },
              description: 'Optional icon for the principle',
            }),
          ],
          preview: {
            select: { title: 'title', description: 'description' },
            prepare({ title, description }) {
              return {
                title: title || 'Untitled Principle',
                subtitle: description ? description.substring(0, 50) + '...' : '',
              }
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return {
        title: title || 'Mission Section',
        subtitle: 'Mission Section',
      }
    },
  },
})
