import { defineType, defineField } from 'sanity'
import { LinkIcon } from '@sanity/icons'

export const ctaType = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'linkType',
      title: 'Link Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internal', value: 'internal' },
          { title: 'External', value: 'external' },
        ],
        layout: 'radio',
      },
      initialValue: 'internal',
    }),
    defineField({
      name: 'internalLink',
      title: 'Internal Link',
      type: 'string',
      description: 'Relative path, e.g. /services',
      hidden: ({ parent }) => parent?.linkType !== 'internal',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
      hidden: ({ parent }) => parent?.linkType !== 'external',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }),
    }),
  ],
  preview: {
    select: { title: 'label', linkType: 'linkType' },
    prepare({ title, linkType }) {
      return {
        title: title || 'Untitled CTA',
        subtitle: linkType === 'external' ? 'External link' : 'Internal link',
      }
    },
  },
})
