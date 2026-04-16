import { defineQuery } from 'next-sanity'

export const PAGE_QUERY = defineQuery(/* groq */ `
  *[_type == "page" && slug.current == $slug && language == $locale][0]{
    _id,
    title,
    slug,
    language,
    seo,
    pageBuilder[]{
      ...,
      _type == "servicesShowcase" => {
        ...,
        "services": services[]->{ _id, language, title, category, description, items }
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
        officesSectionHeading,
        "formLabels": formLabels {
          namePlaceholder,
          companyPlaceholder,
          emailPlaceholder,
          phonePlaceholder,
          platformLabel,
          countryPlaceholder,
          hearAboutUsLabel,
          projectDescriptionLabel,
          submitLabel,
          successMessage,
          errorMessage
        },
        ecommercePlatforms,
        hearAboutUsOptions
      }
    }
  }
`)

export const BLOG_POST_QUERY = defineQuery(/* groq */ `
  *[_type == "blogPost" && slug.current == $slug && language == $locale][0]{
    _id,
    title,
    slug,
    language,
    coverImage,
    excerpt,
    body[]{
      ...,
      _type == "image" => {
        ...,
        asset->
      }
    },
    author,
    authorImage,
    publishedAt
  }
`)

export const SITE_SETTINGS_QUERY = defineQuery(/* groq */ `
  coalesce(
    *[_type == "siteSettings" && language == $locale][0]{
      _id,
      companyName,
      email,
      offices,
      socialLinks,
      footerColumns
    },
    *[_type == "siteSettings" && language == "en"][0]{
      _id,
      companyName,
      email,
      offices,
      socialLinks,
      footerColumns
    }
  )
`)
