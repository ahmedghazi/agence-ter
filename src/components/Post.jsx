import React, { useState, useEffect, useContext } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
// import ExcerptToTexte from "../ui/ExcerptToTexte"
import { RichText } from "prismic-reactjs"
import { LocaleContext } from "../contexts/LocaleWrapper"
import useCategories from "../contexts/CategoriesWrapper"
import { _localizeText } from "../core/utils"
import clsx from "clsx"
import AnimateOnScroll from "./ui/AnimateOnScroll"
import { publish } from "pubsub-js"

const Post = ({ input }) => {
  const { image, title, title_en, texte_fr, texte_en, slidershow } = input.data
  const postCategoryUID = input.data.category.document?.uid

  const { localeCtx } = useContext(LocaleContext)

  // const { category } = useContext(CategoriesContext)
  const { category } = useCategories()

  const [active, setActive] = useState(true)
  useEffect(() => {
    setActive(category === postCategoryUID)
  }, [category])

  const _onImageClick = () => {
    console.log("_onImageClick", slidershow.length)
    if (slidershow.length) publish("SLIDESHOW", slidershow)
  }

  return (
    <AnimateOnScroll>
      <article
        className={clsx(
          "post mb-lg",
          category !== "" && !active ? "hidden" : ""
        )}
      >
        <div className="row">
          <div className="col-md-2 col-xs">
            {image && image.url && (
              <figure
                className={clsx(
                  "sm:aspectio-ratio-1-1",
                  slidershow.length > 0 ? "cursor-zoom-in" : ""
                )}
                onClick={_onImageClick}
              >
                <GatsbyImage
                  image={getImage(image)}
                  alt={image.alt || ""}
                  style={{
                    aspectRatio: "1/1",
                  }}
                />
              </figure>
            )}
          </div>
          <div className="col-md-1 hidden-sm"></div>
          <div className="col-xs">
            <div className="category capitalize italic">
              {_localizeText(postCategoryUID)}
            </div>
            <div
              className={clsx("row", localeCtx === "en-gb" ? "reverse" : "")}
            >
              <div
                className={clsx(
                  "col-xs",
                  localeCtx !== "fr-fr" ? "text-gray hidden-sm" : ""
                )}
              >
                <div className="mb-sm">
                  <h2 className="font-bold ">{title.text}</h2>
                  <RichText render={texte_fr.richText} />
                </div>
              </div>
              <div
                className={clsx(
                  "col-xs hidden-sm",
                  localeCtx !== "en-gb" ? "text-gray" : ""
                )}
              >
                <div className="mb-sm">
                  <h2 className="font-bold  text-black-">{title_en.text}</h2>
                  <RichText render={texte_en.richText} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </AnimateOnScroll>
  )
}

export default Post
