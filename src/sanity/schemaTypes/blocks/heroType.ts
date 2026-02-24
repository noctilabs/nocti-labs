import { defineType, defineField } from 'sanity'
import { HomeIcon } from '@sanity/icons'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  icon: HomeIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'backgroundImage',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional. Falls back to default SVG background if empty.',
    }),
    defineField({
      name: 'theme',
      type: 'string',
      options: {
        list: [
          { title: 'Inner Background Image', value: 'blue' },
          { title: 'Dark', value: 'dark' },
          { title: 'Light', value: 'light' },
        ],
        layout: 'radio',
      },
      initialValue: 'blue',
    }),
    defineField({
      name: 'innerBackgroundImage',
      type: 'image',
      options: { hotspot: true },
      description: 'Optional. Falls back to default SVG if empty. This is the background for the headline panel.',
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return {
        title: title || 'Untitled Hero',
        subtitle: 'Hero',
      }
    },
  },
})
