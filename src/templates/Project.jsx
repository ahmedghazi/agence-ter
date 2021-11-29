import React, { useEffect, useRef, useState, useContext } from "react"
import { graphql, Link } from "gatsby"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { repositoryConfigs } from "../core/prismicPreviews"
import PubSub from "pubsub-js"
import clsx from "clsx"
import SEO from "../components/seo"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { RichText } from "prismic-reactjs"
import Slider from "../components/ui/slick-slider"
import SliderPagerNum from "../components/ui/slick-slider/SliderPagerNum"
import { linkResolver, _localizeText } from "../core/utils"
import { LocaleContext } from "../contexts/LocaleWrapper"

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

  const { localeCtx } = useContext(LocaleContext)

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
    if (
      "ontouchstart" in window ||
      navigator.maxTouchPoint ||
      window.innerWidth <= 1280
    ) {
      scrollerRef.current.style.height = "auto"
      return
    }

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

      <div className="md:fixed left-0 top-0 md:w-screen md:h-screen py-sm pb-0 pt-lg md:p-0 ">
        <Slider
          settingsOverride={{
            autoplaySpeed: 5000,
            autoplay: false,
            speed: 600,
          }}
        >
          {images.map((item, i) => (
            <div className="slide" key={i}>
              <GatsbyImage
                image={getImage(item.image)}
                alt={item.image.alt || ""}
                className="md:w-screen md:h-screen"
                style={{
                  objectFit: "cover",
                }}
              />
            </div>
          ))}
        </Slider>
      </div>
      <div
        className={clsx(
          "sidebar p-sm pt-0 md:px-md",
          !isFirstSlide ? "slideRight" : ""
        )}
      >
        <div className="row ">
          <div className="col-md-9 hidden-sm"></div>
          <div className="col-md-3 col-xs">
            <aside className=" md:h-screen">
              <div className="header md:px-sm md:pb-xs">
                <SliderPagerNum length={images.length} />

                <h1 className="text-lg md-1e">{title.text}</h1>
                <ul className="tags font-bold flex py-sm md:py-0">
                  <li className="pr-xs">{_getTagByName("theme")}</li>
                  <li className="pr-xs">{_getTagByName("year")}</li>
                  <li className="pr-xs">{_getTagByName("localisation")}</li>
                </ul>
              </div>
              <div
                className="content md:px-sm md:pb-sm scroller md:overflow-y-scroll no-scrollbar flex flex-col"
                ref={scrollerRef}
              >
                <div className="texte mb-1e">
                  <RichText
                    render={localeCtx === "fr-fr" ? texte_fr.raw : texte_en.raw}
                  />
                </div>
                <div className="texte text-gray mb-1e">
                  <RichText
                    render={localeCtx === "en-gb" ? texte_en.raw : texte_fr.raw}
                  />
                </div>
              </div>
            </aside>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "footer md:fixed bottom-0 w-full p-sm md:p-md text-right flex flex-col items-center md:items-end ",
          isFirstSlide ? "slideRight" : ""
        )}
      >
        <div className="hidden-sm">
          <SliderPagerNum length={images.length} />
        </div>
        <ul className="flex projects-related font-bold">
          <li>
            <Link
              to={linkResolver(related.nodes[0])}
              className="pr-xs flex items-center"
            >
              <span className="icon icon-chevron-w pr-xs"></span>
              <span>{_localizeText("prevProject")}</span>
            </Link>
          </li>
          <li>
            <Link
              to={linkResolver(related.nodes[1])}
              className="pl-xs flex items-center"
            >
              <span>{_localizeText("nextProject")}</span>
              <span className="icon icon-chevron-e pl-xs"></span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default withPrismicPreview(PageProject, repositoryConfigs)
