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
      name: 'officesSectionHeading',
      title: 'Offices Section Heading',
      type: 'string',
      description: 'e.g. "Our Offices" or "Nuestras Oficinas"',
      initialValue: 'Our Offices',
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
      name: 'formLabels',
      title: 'Form Labels',
      type: 'object',
      description: 'Customize field labels and button text (e.g. for Spanish translations)',
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: 'namePlaceholder', title: 'Name placeholder', type: 'string', initialValue: 'Name *' }),
        defineField({ name: 'companyPlaceholder', title: 'Company Name placeholder', type: 'string', initialValue: 'Company Name' }),
        defineField({ name: 'emailPlaceholder', title: 'Work Email placeholder', type: 'string', initialValue: 'Work Email *' }),
        defineField({ name: 'phonePlaceholder', title: 'Phone Number placeholder', type: 'string', initialValue: 'Phone Number' }),
        defineField({ name: 'platformLabel', title: 'E-Commerce Platform label', type: 'string', initialValue: 'Current E-Commerce Platform' }),
        defineField({ name: 'countryPlaceholder', title: 'Country / Region placeholder', type: 'string', initialValue: 'Country / Region *' }),
        defineField({ name: 'hearAboutUsLabel', title: '"How did you hear about us?" label', type: 'string', initialValue: 'How did you hear about us?' }),
        defineField({ name: 'projectDescriptionLabel', title: 'Project Description label', type: 'string', initialValue: 'Project Description' }),
        defineField({ name: 'submitLabel', title: 'Submit button text', type: 'string', initialValue: 'Submit' }),
        defineField({ name: 'successMessage', title: 'Success message', type: 'string', initialValue: "Thanks! We'll be in touch soon." }),
        defineField({ name: 'errorMessage', title: 'Error message', type: 'string', initialValue: 'Something went wrong. Please try again.' }),
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
