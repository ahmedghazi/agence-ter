import React from "react"
import { graphql } from "gatsby"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { repositoryConfigs } from "../core/prismicPreviews"
import SEO from "../components/seo"
import Hero from "../components/ui/Hero"
import NewsSlider from "../components/slices/NewsSlider"
import Philosophie from "../components/slices/Philosophie"

export const query = graphql`
  query {
    prismicHome {
      _previewable
      data {
        meta_title {
          text
        }
        meta_description {
          text
        }
        meta_image {
          url
        }

        image {
          gatsbyImageData(width: 1500, placeholder: BLURRED)
          url
          alt
        }

        body {
          # ... on PrismicHomeDataBodyNews {
          #   slice_type
          #   primary {
          #     title {
          #       text
          #     }
          #   }
          #   items {
          #     item {
          #       document {
          #         ... on PrismicNews {
          #           id
          #           data {
          #             title {
          #               text
          #             }
          #             texte_fr {
          #               raw
          #             }
          #             texte_en {
          #               raw
          #             }
          #             image {
          #               gatsbyImageData(width: 1500, placeholder: BLURRED)
          #               alt
          #             }
          #           }
          #         }
          #       }
          #     }
          #   }
          # }
          ... on PrismicHomeDataBodyPhilosophie {
            slice_type
            primary {
              title {
                text
              }
            }
            items {
              title {
                text
              }
              texte_fr {
                raw
              }
              texte_en {
                raw
              }
              image {
                gatsbyImageData(width: 1500, placeholder: BLURRED)
                alt
              }
            }
          }
        }
      }
    }
  }
`

const Home = ({ data }) => {
  const { meta_title, meta_description, meta_image, image, body } =
    data.prismicHome.data

  const slices = body.map((slice, i) => {
    // console.log(slice.slice_type);
    switch (slice.slice_type) {
      case "news":
        return <NewsSlider key={i} input={slice} />
      case "philosophie":
        return <Philosophie key={i} input={slice} />

      default:
        return null
    }
  })

  return (
    <div>
      <SEO
        pageTitle={meta_title.text}
        pageDescription={meta_description.text}
        pageImage={meta_image.url}
        template={`template-home`}
        page={false}
      />
      <Hero input={image} />
      {slices}
    </div>
  )
}

export default withPrismicPreview(Home, repositoryConfigs)
