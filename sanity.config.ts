'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/studio/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {documentInternationalization} from '@sanity/document-internationalization'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

export const i18nConfig = {
  supportedLanguages: [
    {id: 'en', title: 'English'},
    {id: 'es', title: 'Spanish'},
  ],
  defaultLanguages: ['en'],
}

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    structureTool({structure}),
    visionTool({defaultApiVersion: apiVersion}),
    documentInternationalization({
      supportedLanguages: i18nConfig.supportedLanguages,
      schemaTypes: ['page', 'blogPost', 'service', 'project', 'siteSettings'],
    }),
  ],
})
