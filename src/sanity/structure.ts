import type { StructureResolver } from 'sanity/structure'
import { CogIcon, DocumentIcon, BulbOutlineIcon, CaseIcon, DocumentTextIcon, EnvelopeIcon } from '@sanity/icons'

const SINGLETONS: string[] = []
const TRANSLATED_TYPES = ['page', 'service', 'project', 'blogPost', 'siteSettings']
const LOCALES = [
  { id: 'en', title: 'English', flag: '🇬🇧' },
  { id: 'es', title: 'Spanish', flag: '🇪🇸' },
]

type SBuilder = Parameters<StructureResolver>[0]
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IconComponent = any

const translatedTypeList = (S: SBuilder, schemaType: string, title: string, icon: IconComponent) =>
  S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.list()
        .title(title)
        .items(
          LOCALES.map((locale) =>
            S.listItem()
              .title(`${locale.flag} ${locale.title}`)
              .id(`${schemaType}-${locale.id}`)
              .child(
                S.documentList()
                  .title(`${locale.title} ${title}`)
                  .schemaType(schemaType)
                  .filter('_type == $type && language == $lang')
                  .params({ type: schemaType, lang: locale.id })
              )
          )
        )
    )

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Translated document types — grouped by language
      translatedTypeList(S, 'siteSettings', 'Site Settings', CogIcon),
      translatedTypeList(S, 'page', 'Pages', DocumentIcon),
      translatedTypeList(S, 'service', 'Services', BulbOutlineIcon),
      translatedTypeList(S, 'project', 'Projects', CaseIcon),
      translatedTypeList(S, 'blogPost', 'Blog Posts', DocumentTextIcon),

      S.divider(),

      // Inbox (not translated)
      S.documentTypeListItem('contactMessage').title('Contact Messages').icon(EnvelopeIcon),

      // Remaining types (filtered)
      ...S.documentTypeListItems().filter(
        (listItem) =>
          !SINGLETONS.includes(listItem.getId() as string) &&
          ![...TRANSLATED_TYPES, 'contactMessage'].includes(listItem.getId() as string)
      ),
    ])
