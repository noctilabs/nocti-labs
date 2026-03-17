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
      name: 'formFields',
      title: 'Form Field Labels',
      type: 'object',
      fields: [
        defineField({ name: 'firstName', title: 'First Name Label', type: 'string', initialValue: 'First Name *' }),
        defineField({ name: 'lastName', title: 'Last Name Label', type: 'string', initialValue: 'Last Name *' }),
        defineField({ name: 'email', title: 'Work Email Label', type: 'string', initialValue: 'Work Email *' }),
        defineField({ name: 'company', title: 'Company Name Label', type: 'string', initialValue: 'Company Name *' }),
        defineField({ name: 'platform', title: 'E-Commerce Platform Label', type: 'string', initialValue: 'Current E-Commerce Platform' }),
        defineField({ name: 'country', title: 'Country / Region Label', type: 'string', initialValue: 'Country / Region *' }),
        defineField({ name: 'phone', title: 'Phone Number Label', type: 'string', initialValue: 'Phone Number' }),
        defineField({ name: 'hearAboutUs', title: 'How Did You Hear About Us Label', type: 'string', initialValue: 'How did you hear about us?' }),
        defineField({ name: 'projectDescription', title: 'Project Description Label', type: 'string', initialValue: 'Project Description' }),
        defineField({ name: 'submitButton', title: 'Submit Button Text', type: 'string', initialValue: 'Submit' }),
      ],
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
