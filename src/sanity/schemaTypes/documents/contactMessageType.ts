import { defineField, defineType } from 'sanity'
import { EnvelopeIcon } from '@sanity/icons'

export const contactMessageType = defineType({
  name: 'contactMessage',
  title: 'Contact Message',
  type: 'document',
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: 'firstName', title: 'First Name', type: 'string', readOnly: true }),
    defineField({ name: 'lastName', title: 'Last Name', type: 'string', readOnly: true }),
    defineField({ name: 'email', title: 'Email', type: 'string', readOnly: true }),
    defineField({ name: 'company', title: 'Company', type: 'string', readOnly: true }),
    defineField({ name: 'country', title: 'Country / Region', type: 'string', readOnly: true }),
    defineField({ name: 'platform', title: 'E-Commerce Platform', type: 'string', readOnly: true }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string', readOnly: true }),
    defineField({ name: 'hearAboutUs', title: 'How did you hear about us?', type: 'string', readOnly: true }),
    defineField({ name: 'description', title: 'Project Description', type: 'text', readOnly: true }),
    defineField({ name: 'submittedAt', title: 'Submitted At', type: 'datetime', readOnly: true }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      company: 'company',
      submittedAt: 'submittedAt',
    },
    prepare({ firstName, lastName, email, company, submittedAt }) {
      const name = [firstName, lastName].filter(Boolean).join(' ') || 'Unknown'
      const date = submittedAt ? new Date(submittedAt).toLocaleDateString() : ''
      return {
        title: `${name}${company ? ` — ${company}` : ''}`,
        subtitle: `${email}${date ? ` · ${date}` : ''}`,
      }
    },
  },
})
