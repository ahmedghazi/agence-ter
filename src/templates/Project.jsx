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
import {
  linkResolver,
  shuffle,
  _localizeText,
  _localizeTitle,
} from "../core/utils"
import { LocaleContext } from "../contexts/LocaleWrapper"

// import PubSub from "pubsub-js"

export const pageQuery = graphql`
  query ProjectBySlug($uid: String!, $theme: String!) {
    project: prismicProject(uid: { eq: $uid }) {
      _previewable
      data {
        ...project
      }
    }
    related: allPrismicProject(
      filter: { uid: { ne: $uid }, data: { theme: { uid: { eq: $theme } } } }
      limit: 10
    ) {
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
    // localisation,
    // year,
    year_short,
    localisation_short,
    images,
    // archive,
  } = project.data

  shuffle(related.nodes)
  // console.log(related.nodes)

  const { localeCtx } = useContext(LocaleContext)

  const scrollerRef = useRef()
  const [isFirstSlide, setIsFirstSlide] = useState(true)
  const [asideOff, setAsideOff] = useState()

  useEffect(() => {
    _format()
    window.addEventListener("resize", _format)

    const token = PubSub.subscribe("SLIDER_CHANGE", (e, d) => {
      // setIsFirstSlide(d === 0)
      setAsideOff(d > 0)
      // if (d > 0) {
      //   PubSub.unsubscribe(token)
      // }
    })
    return () => {
      window.removeEventListener("resize", _format)
      PubSub.unsubscribe(token)
    }
  }, [])

  const _format = () => {
    return
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
        return _localizeTitle(theme.document.data)
      case "localisation":
        return localisation.document.data.title.text
      case "year":
        return year.document.data.title.text
      default:
        return ""
    }
  }

  // const _toggle = () => {

  // }

  return (
    <div
      className={clsx(
        "page-template page-project ",
        asideOff ? "is-aside-off" : ""
      )}
    >
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

      <aside className="md:fixed md:h-screen right-md p-xs md:px-0 md:py-sm">
        <div className="flex flex-col ">
          <div className="header md:px-md md:pb-sm">
            <SliderPagerNum length={images.length} />

            <h1 className="text-lg md-1e">{title.text}</h1>
            <ul className="tags  flex py-sm md:py-0">
              <li className="pr-xs">{_getTagByName("theme")}</li>
              <li className="pr-xs">{year_short}</li>
              <li className="pr-xs">{localisation_short}</li>
            </ul>
          </div>

          <div
            className="content md:px-md md:pb-sm md:mb-sm scroller md:overflow-y-scroll no-scrollbar flex- flex-col- font-semibold"
            ref={scrollerRef}
          >
            <div className="texte mb-1e">
              <RichText
                render={
                  localeCtx === "fr-fr" ? texte_fr.richText : texte_en.richText
                }
              />
            </div>
            <div className="texte text-gray mb-1e font-regular">
              <RichText
                render={
                  localeCtx === "en-gb" ? texte_fr.richText : texte_en.richText
                }
              />
            </div>
          </div>

          <div className="footer md:px-md ">
            <ul className="flex justify-between projects-related font-semibold">
              <li>
                <Link
                  to={linkResolver(related.nodes[0])}
                  className="pr-xs flex items-center hover:text-opacity-80"
                >
                  <span className="icon icon-chevron-w pr-xs font-black"></span>
                  <span>{_localizeText("prevProject")}</span>
                </Link>
              </li>
              <li>
                <Link
                  to={linkResolver(related.nodes[1])}
                  className="pl-xs flex items-center"
                >
                  <span>{_localizeText("nextProject")}</span>
                  <span className="icon icon-chevron-e pl-xs font-black"></span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <div className="aside-mini md:px-md fixed bottom-sm right-md hidden-sm">
        <SliderPagerNum length={images.length} />
        <ul className="flex justify-between projects-related font-semibold">
          <li>
            <Link
              to={linkResolver(related.nodes[0])}
              className="pr-xs flex items-center hover:text-opacity-80"
            >
              <span className="icon icon-chevron-w pr-xs font-black"></span>
              <span>{_localizeText("prevProject")}</span>
            </Link>
          </li>
          <li>
            <Link
              to={linkResolver(related.nodes[1])}
              className="pl-xs flex items-center"
            >
              <span>{_localizeText("nextProject")}</span>
              <span className="icon icon-chevron-e pl-xs font-black"></span>
            </Link>
          </li>
        </ul>
      </div>

      <div
        id="toggle"
        className="p-xs flex flex-col justify-center items-center cursor-pointer  fixed right-0 hidden-sm w-md "
        onClick={() => setAsideOff(!asideOff)}
      >
        {asideOff && (
          <span className="icon-chevron-w text-lg font-black"></span>
        )}
        {!asideOff && (
          <span className="icon-chevron-e text-lg font-black"></span>
        )}
      </div>
    </div>
  )
}

export default withPrismicPreview(PageProject, repositoryConfigs)
