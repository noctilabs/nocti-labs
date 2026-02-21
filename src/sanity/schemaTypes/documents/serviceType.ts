import { defineType, defineField, defineArrayMember } from 'sanity'
import { BulbOutlineIcon } from '@sanity/icons'

export const serviceType = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          { title: 'Technology', value: 'technology' },
          { title: 'Design', value: 'design' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'items',
      title: 'Service Items',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
    }),
  ],
  preview: {
    select: { title: 'title', category: 'category' },
    prepare({ title, category }) {
      return {
        title: title || 'Untitled Service',
        subtitle: category ? category.charAt(0).toUpperCase() + category.slice(1) : '',
      }
    },
  },
})
