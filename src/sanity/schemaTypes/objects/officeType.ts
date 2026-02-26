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
      name: 'state',
      type: 'string',
      title: 'State / Region',
      description: 'e.g. California',
    }),
    defineField({
      name: 'country',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'address',
      type: 'string',
      title: 'Street address',
      description: 'e.g. 970 N Broadway #103',
    }),
    defineField({
      name: 'stateAbbr',
      type: 'string',
      title: 'State abbreviation',
      description: 'e.g. CA',
    }),
    defineField({
      name: 'zip',
      type: 'string',
      title: 'ZIP / Postal code',
      description: 'e.g. 90012',
    }),
  ],
  preview: {
    select: { city: 'city', state: 'state', country: 'country' },
    prepare({ city, state, country }) {
      const parts = [city, state, country].filter(Boolean);
      return {
        title: parts.join(', ') || 'Office',
      };
    },
  },
})
