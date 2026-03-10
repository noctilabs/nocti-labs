import { defineType, defineField, defineArrayMember } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const contactSectionType = defineType({
  name: 'contactSection',
  title: 'Contact Section',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
    }),
    defineField({
      name: 'email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'offices',
      type: 'array',
      of: [defineArrayMember({ type: 'office' })],
    }),
    defineField({
      name: 'formHeading',
      title: 'Form Heading',
      type: 'string',
    }),
    defineField({
      name: 'ecommercePlatforms',
      title: 'E-Commerce Platform Options',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Options for the Current E-Commerce Platform dropdown in the contact form',
      initialValue: [
        'Shopify',
        'WooCommerce',
        'Salesforce Commerce Cloud',
        'Magento',
        'Adobe Commerce',
        'Centra',
        'BigCommerce',
        'Tienda Nube',
        'Linx',
        'Fenicio',
        'Other',
      ],
    }),
    defineField({
      name: 'hearAboutUsOptions',
      title: 'How did you hear about us? Options',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Options for the How did you hear about us? dropdown in the contact form',
      initialValue: [
        'I found you on Google',
        'Someone recommended you',
        'I saw a post on LinkedIn',
        'I read your blog or an article about Nocti Labs',
        'Other',
      ],
    }),
  ],
  preview: {
    select: { title: 'heading' },
    prepare({ title }) {
      return {
        title: title || 'Contact Section',
        subtitle: 'Contact Section',
      }
    },
  },
})
