import React, { useEffect, useRef, useState } from "react"
import { graphql, Link } from "gatsby"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { repositoryConfigs } from "../core/prismicPreviews"
import SEO from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { RichText } from "prismic-reactjs"
import Slider from "../components/ui/slick-slider"
import SliderPagerNum from "../components/ui/slick-slider/SliderPagerNum"
import { linkResolver, _localizeText } from "../core/utils"
import PubSub from "pubsub-js"
import clsx from "clsx"
// import PubSub from "pubsub-js"

export const pageQuery = graphql`
  query ProjectBySlug($uid: String!) {
    project: prismicProject(uid: { eq: $uid }) {
      _previewable
      data {
        ...project
      }
    }
    related: allPrismicProject(filter: { uid: { ne: $uid } }, limit: 2) {
      nodes {
        type
        uid
      }
    }
  }
`

const PageProject = ({ data }) => {
  // console.log(data)
  const { project, related } = data
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
  } = project.data
  // console.log(related)

  const scrollerRef = useRef()
  const [isFirstSlide, setIsFirstSlide] = useState(true)

  useEffect(() => {
    _format()
    window.addEventListener("resize", _format)

    const token = PubSub.subscribe("SLIDER_CHANGE", (e, d) => {
      setIsFirstSlide(d === 0)
    })
    return () => {
      window.removeEventListener("resize", _format)
      PubSub.unsubscribe(token)
    }
  }, [])

  const _format = () => {
    const headerHeight = document
      .querySelector("aside .header")
      .getBoundingClientRect().height
    // console.log(document.querySelector("aside .header").getBoundingClientRect())
    const scrollerHeight = window.innerHeight - (headerHeight + 185)
    scrollerRef.current.style.height = scrollerHeight + "px"
  }

  const _getTagByName = (tag) => {
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
    <div className="page-template page-project ">
      <SEO
        pageTitle={meta_title.text}
        pageDescription={meta_description.text}
        pageImage={meta_image.url}
        template={`template-project md:overflow-hidden`}
        page={true}
      />

      <div className="fixed left-0 top-0 w-screen h-screen">
        <Slider
          settingsOverride={{
            autoplaySpeed: 5000,
            autoplay: true,
            speed: 600,
          }}
        >
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
      <div className={clsx("sidebar px-md", !isFirstSlide ? "slideRight" : "")}>
        <div className="row ">
          <div className="col-md-9"></div>
          <div className="col-md-3 ">
            <aside className=" h-screen">
              <div className="header px-sm pb-xs">
                <SliderPagerNum length={images.length} />

                <h1 className="text-lg md-1e">{title.text}</h1>
                <ul className="tags font-bold ">
                  <li>{_getTagByName("theme")}</li>
                  <li>{_getTagByName("year")}</li>
                  <li>{_getTagByName("localisation")}</li>
                </ul>
              </div>
              <div
                className="content px-sm pb-sm scroller overflow-y-scroll"
                ref={scrollerRef}
              >
                <div className="texte mb-1e">
                  <RichText render={texte_fr.raw} />
                </div>
                <div className="texte text-gray">
                  <RichText render={texte_en.raw} />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "footer fixed bottom-0 w-full p-md text-right flex flex-col items-end",
          isFirstSlide ? "slideRight" : ""
        )}
      >
        <SliderPagerNum length={images.length} />
        <ul className="flex projects-related font-bold">
          <li>
            <Link to={linkResolver(related.nodes[0])} className="pr-xs">
              <span className="icon chevron-w"></span>
              <span>{_localizeText("prevProject")}</span>
            </Link>
          </li>
          <li>
            <Link to={linkResolver(related.nodes[1])} className="pl-xs">
              <span className="icon chevron-e"></span>
              <span>{_localizeText("nextProject")}</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default withPrismicPreview(PageProject, repositoryConfigs)
