import { defineType, defineField } from 'sanity'
import { PinIcon } from '@sanity/icons'

export const officeType = defineType({
  name: 'office',
  title: 'Office',
  type: 'object',
  icon: PinIcon,
  fields: [
    defineField({
      name: 'city',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'country',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      type: 'string',
    }),
  ],
  preview: {
    select: { city: 'city', country: 'country' },
    prepare({ city, country }) {
      return {
        title: `${city || ''}, ${country || ''}`,
      }
    },
  },
})
