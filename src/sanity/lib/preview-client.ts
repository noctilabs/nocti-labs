import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId } from '../env'

export const previewClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_READ_TOKEN,
  stega: {
    enabled: true,
    studioUrl: process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'https://nocti-labs.sanity.studio',
  },
})
