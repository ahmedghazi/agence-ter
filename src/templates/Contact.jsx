import React, { useContext } from "react"
import { graphql } from "gatsby"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { repositoryConfigs } from "../core/prismicPreviews"

import SEO from "../components/seo"

import ContactsAgence from "../components/ContactsAgence"

export const pageQuery = graphql`
  query {
    prismicContact {
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
        agences {
          nom {
            text
          }
          infos_fr {
            raw
          }
          infos_en {
            raw
          }
        }
      }
    }
  }
`
const Contact = ({ data }) => {
  const { meta_title, meta_description, meta_image, agences } =
    data.prismicContact.data

  return (
    <div className="page-template page-contact p-xs pt-lg md:p-md md:pt-xl ">
      <SEO
        pageTitle={meta_title.text}
        pageDescription={meta_description.text}
        pageImage={meta_image.url}
        template={`template-contact bg-yellow`}
        page={true}
      />
      <div className="row ">
        <div className="col-md-2 hidden-sm"></div>
        <div className="col-md-8 col-xs-12">
          {agences.map((item, i) => (
            <ContactsAgence key={i} input={item} />
          ))}
        </div>
        <div className="col-md-2 hidden-sm"></div>
      </div>
    </div>
  )
}

export default withPrismicPreview(Contact, repositoryConfigs)
