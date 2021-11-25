import React from "react"
import { graphql } from "gatsby"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { repositoryConfigs } from "../core/prismicPreviews"
import SEO from "../components/seo"

import ImageTextes from "../components/slices/ImageTextes"
import Team from "../components/slices/Team"

export const pageQuery = graphql`
  query AgencyQ {
    prismicAgency {
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
        title {
          text
        }
        body {
          ... on PrismicAgencyDataBodyImageTextes {
            slice_type
            primary {
              image {
                gatsbyImageData(width: 1500, placeholder: BLURRED)
                url
                alt
              }
            }
            items {
              texte {
                raw
              }
            }
          }
          ... on PrismicAgencyDataBodyTeam {
            slice_type
            primary {
              title {
                text
              }
            }
            items {
              image {
                gatsbyImageData(width: 1500, placeholder: BLURRED)
                url
                alt
              }
              name {
                text
              }
              position_fr
              position_en
              bio_fr {
                raw
                text
              }
              bio_en {
                raw
                text
              }
            }
          }
        }
      }
    }
  }
`

const Agency = ({ data }) => {
  const { meta_title, meta_description, meta_image, body } =
    data.prismicAgency.data

  const slices = body.map((slice, i) => {
    // console.log(slice.slice_type);
    switch (slice.slice_type) {
      case "image_textes":
        return <ImageTextes key={i} input={slice} />
      case "team":
        return <Team key={i} input={slice} />
      default:
        return null
    }
  })

  return (
    <div className="page-template page-agency p-xs pt-lg md:p-md md:pt-xl ">
      <SEO
        pageTitle={meta_title.text}
        pageDescription={meta_description.text}
        pageImage={meta_image.url}
        template={`template-agency bg-yellow`}
        page={true}
      />
      <div className="row ">
        <div className="col-md-2 hidden-sm"></div>
        <div className="col-md-8 col-xs-12">{slices}</div>
        <div className="col-md-2 hidden-sm"></div>
      </div>
    </div>
  )
}

export default withPrismicPreview(Agency, repositoryConfigs)
