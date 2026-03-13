import { defineQuery } from 'next-sanity'

export const PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    seo,
    pageBuilder[]{
      ...,
      _type == "servicesShowcase" => {
        ...,
        services[]->{
          _id,
          title,
          category,
          description,
          items
        }
      },
      _type == "projectsShowcase" => {
        ...,
        projects[]->{
          _id,
          title,
          slug,
          client,
          description,
          coverImage,
          "coverVideoUrl": coverVideo.asset->url,
          tags,
          url
        }
      },
      _type == "insightsGrid" => {
        ...,
        featuredPosts[]->{
          _id,
          title,
          slug,
          coverImage,
          excerpt,
          author,
          publishedAt
        }
      },
      _type == "contactSection" => {
        ...,
        ecommercePlatforms,
        hearAboutUsOptions
      }
    }
  }
`)

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  *[_type == "siteSettings"][0]{
    _id,
    companyName,
    email,
    offices,
    socialLinks,
    footerColumns
  }
`)
