import React from "react"
import { graphql } from "gatsby"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { repositoryConfigs } from "../core/prismicPreviews"
import SEO from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { RichText } from "prismic-reactjs"
import Slider from "../components/ui/slick-slider"
import SliderPagerNum from "../components/ui/slick-slider/SliderPagerNum"

// import PubSub from "pubsub-js"

export const pageQuery = graphql`
  query ProjectBySlug($uid: String!) {
    prismicProject(uid: { eq: $uid }) {
      _previewable
      data {
        ...project
      }
    }
  }
`

const PageProject = ({ data }) => {
  // console.log(data)
  const {
    meta_title,
    meta_description,
    meta_image,
    title,
    texte_fr,
    texte_en,
    theme,
    localisation,
    year,
    images,
  } = data.prismicProject.data

  // useEffect(() => {}, [])
  const _getTagByName = (tag) => {
    // console.log(tag)
    switch (tag) {
      case "theme":
        return theme.document.data.title.text
      case "localisation":
        return localisation.document.data.title.text
      case "year":
        return year.document.data.title.text
      default:
        return ""
    }
  }

  return (
    <div className="page-template page-project">
      <SEO
        pageTitle={meta_title.text}
        pageDescription={meta_description.text}
        pageImage={meta_image.url}
        template={`template-project`}
        page={true}
      />

      <div className="fixed left-0 top-0 w-screen h-screen">
        <Slider>
          {images.map((item, i) => (
            <div className="slide" key={i}>
              <GatsbyImage
                image={getImage(item.image)}
                alt={item.image.alt || ""}
                className="w-screen h-screen"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div className="sidebar px-md">
        <div className="row ">
          <div className="col-md-9"></div>
          <div className="col-md-3 col-md-offset-9-- ">
            <aside className="px-sm h-screen">
              <SliderPagerNum length={images.length} />

              <h1 className="text-lg md-1e">{title.text}</h1>
              <ul className="tags font-bold md-1e">
                <li>{_getTagByName("theme")}</li>
                <li>{_getTagByName("year")}</li>
                <li>{_getTagByName("localisation")}</li>
              </ul>
              <div className="texte mb-1e">
                <RichText render={texte_fr.raw} />
              </div>
              <div className="texte text-gray">
                <RichText render={texte_en.raw} />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default withPrismicPreview(PageProject, repositoryConfigs)
