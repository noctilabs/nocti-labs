import { type SchemaTypeDefinition } from 'sanity'

// Objects
import { ctaType } from './objects/ctaType'
import { officeType } from './objects/officeType'

// Documents
import { serviceType } from './documents/serviceType'
import { projectType } from './documents/projectType'
import { blogPostType } from './documents/blogPostType'
import { siteSettingsType } from './documents/siteSettingsType'
import { pageType } from './documents/pageType'

// Blocks
import { heroType } from './blocks/heroType'
import { introSectionType } from './blocks/introSectionType'
import { servicesShowcaseType } from './blocks/servicesShowcaseType'
import { projectsShowcaseType } from './blocks/projectsShowcaseType'
import { insightsGridType } from './blocks/insightsGridType'
import { contactSectionType } from './blocks/contactSectionType'
import { missionSectionType } from './blocks/missionSectionType'
import { aboutSectionType } from './blocks/aboutSectionType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    // Objects
    ctaType,
    officeType,
    // Documents
    serviceType,
    projectType,
    blogPostType,
    siteSettingsType,
    pageType,
    // Blocks
    heroType,
    introSectionType,
    servicesShowcaseType,
    projectsShowcaseType,
    insightsGridType,
    contactSectionType,
    missionSectionType,
    aboutSectionType,
  ],
}
