import React, { useEffect, useMemo } from "react"
import { graphql } from "gatsby"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { repositoryConfigs } from "../core/prismicPreviews"
import SEO from "../components/seo"
import { RichText } from "prismic-reactjs"
// import FigurePixel from "../components/FigurePixel"
// import Figure from "../components/Figure"

// console.log(repositoryConfigs);
export const query = graphql`
  query PageBySlug($uid: String!) {
    prismicPage(uid: { eq: $uid }) {
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
        texte {
          text
          raw
        }
      }
    }
  }
`

const PageDefault = ({ data }) => {
  //
  const { title, texte, meta_title, meta_description, meta_image } =
    data.prismicPage.data
  // console.log(image);
  // useEffect(() => {}, [])

  return (
    <div className="page-template page-page p-xs pt-lg md:p-md md:pt-xl">
      <SEO
        pageTitle={meta_title.text}
        pageDescription={meta_description.text}
        pageImage={meta_image.url}
        template={`template-page`}
        page={true}
      />

      <div className="row ">
        <div className="col-md-2 hidden-sm"></div>
        <div className="col-md-8 col-xs-12">
          <h1>{title.text}</h1>
          {RichText.render(texte.raw)}
        </div>
        <div className="col-md-2 hidden-sm"></div>
      </div>
    </div>
  )
}

export default withPrismicPreview(PageDefault, repositoryConfigs)
