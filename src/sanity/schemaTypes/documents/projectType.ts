import { defineType, defineField, defineArrayMember } from 'sanity'
import { CaseIcon } from '@sanity/icons'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        isUnique: () => true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'language',
      type: 'string',
      hidden: true,
    }),
    defineField({
      name: 'client',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'coverImage',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'coverVideo',
      title: 'Cover Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'url',
      title: 'Project URL',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: { title: 'title', client: 'client', media: 'coverImage' },
    prepare({ title, client, media }) {
      return {
        title: title || 'Untitled Project',
        subtitle: client || '',
        media,
      }
    },
  },
})
