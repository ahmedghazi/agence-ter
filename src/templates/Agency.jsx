import React, { useContext } from "react"
import { graphql } from "gatsby"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { repositoryConfigs } from "../core/prismicPreviews"
import SEO from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { RichText } from "prismic-reactjs"
import { LocaleContext } from "../contexts/LocaleWrapper"
import clsx from "clsx"
import styled from "styled-components"
import AnimateOnScroll from "../components/ui/AnimateOnScroll"

import ImageTextes from "../components/slices/ImageTextes"
import TeamMosaic from "../components/slices/TeamMosaic"
import CallToScroll from "../components/ui/CallToScroll"

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
        # texte_fr {
        #   raw
        # }
        # texte_en {
        #   raw
        # }
        # image {
        #   gatsbyImageData(width: 2000, placeholder: BLURRED)
        #   url
        #   alt
        # }
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
                richText
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
                gatsbyImageData(width: 750, placeholder: BLURRED)
                url
                alt
              }
              name {
                text
              }
              position_fr
              position_en
              bio_fr {
                richText
                text
              }
              bio_en {
                richText
                text
              }
              bureau
              link {
                type
                uid
              }
            }
          }
        }
      }
    }
  }
`

// const IntroContainer = styled.section`
//   .row {
//     .col-O {
//       color: var(--color-black);
//     }
//     .col-1 {
//       color: var(--color-gray);
//     }
//     &.reverse {
//       .col-1 {
//         color: var(--color-black);
//       }
//       .col-0 {
//         color: var(--color-gray);
//       }
//     }
//   }
// `

const Agency = ({ data }) => {
  const {
    meta_title,
    meta_description,
    meta_image,
    // texte_fr,
    // texte_en,
    // image,
    body,
  } = data.prismicAgency.data

  const { localeCtx } = useContext(LocaleContext)

  const slices = body.map((slice, i) => {
    // console.log(slice.slice_type);
    switch (slice.slice_type) {
      case "image_textes":
        return <ImageTextes key={i} input={slice} />
      case "team":
        return <TeamMosaic key={i} input={slice} />
      default:
        return null
    }
  })

  return (
    <div className="page-template page-agency p-xs pt-lg md:p-md md:pt-xl">
      <SEO
        pageTitle={meta_title.text}
        pageDescription={meta_description.text}
        pageImage={meta_image.url}
        template={`template-agency bg-yellow`}
        page={true}
      />

      {/* <AnimateOnScroll>
        <IntroContainer className="slice-image-textes mb-xl min-h-main">
          <div className="row ">
            <div className="col-md-2 hidden-sm"></div>
            <div className="col-md-8 col-xs-12">
              <div className="mb-md-alt ">
                <figure>
                  <GatsbyImage image={getImage(image)} alt={image.alt || ""} />
                </figure>
              </div>
            </div>
            <div className="col-md-2 hidden-sm"></div>
          </div>
          <CallToScroll color="white" />
        </IntroContainer>
      </AnimateOnScroll> */}

      <div className="">
        <div className="row ">
          <div className="col-md-2 hidden-sm"></div>
          <div className="col-md-8 col-xs-12">{slices}</div>
          <div className="col-md-2 hidden-sm"></div>
        </div>
      </div>
    </div>
  )
}

export default withPrismicPreview(Agency, repositoryConfigs)
