import type { StructureResolver } from 'sanity/structure'
import { CogIcon, DocumentIcon, BulbOutlineIcon, CaseIcon, DocumentTextIcon, EnvelopeIcon } from '@sanity/icons'

const SINGLETONS = ['siteSettings']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton: Site Settings
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings')
        ),

      S.divider(),

      // Pages
      S.documentTypeListItem('page').title('Pages').icon(DocumentIcon),

      S.divider(),

      // Content
      S.documentTypeListItem('service').title('Services').icon(BulbOutlineIcon),
      S.documentTypeListItem('project').title('Projects').icon(CaseIcon),
      S.documentTypeListItem('blogPost').title('Blog Posts').icon(DocumentTextIcon),

      S.divider(),

      // Inbox
      S.documentTypeListItem('contactMessage').title('Contact Messages').icon(EnvelopeIcon),

      // Remaining types (filtered)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !SINGLETONS.includes(listItem.getId() as string) &&
          !['page', 'service', 'project', 'blogPost', 'contactMessage'].includes(listItem.getId() as string)
      ),
    ])
