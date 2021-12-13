import React, { useState, useEffect, useContext } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
// import ExcerptToTexte from "../ui/ExcerptToTexte"
import { RichText } from "prismic-reactjs"
import { LocaleContext } from "../contexts/LocaleWrapper"
import useCategories from "../contexts/CategoriesWrapper"
import { _localizeText } from "../core/utils"
import clsx from "clsx"
import AnimateOnScroll from "./ui/AnimateOnScroll"

const Post = ({ input }) => {
  const { image, title, texte_fr, texte_en } = input.data
  const postCategoryUID = input.data.category.document.uid

  const { localeCtx } = useContext(LocaleContext)

  // const { category } = useContext(CategoriesContext)
  const { category } = useCategories()

  const [active, setActive] = useState(true)
  useEffect(() => {
    setActive(category === postCategoryUID)
  }, [category])

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
              <figure className="">
                <GatsbyImage image={getImage(image)} alt={image.alt || ""} />
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
              <div className="col-xs">
                <div className="mb-sm">
                  <h2 className="font-bold">{title.text}</h2>
                  <RichText render={texte_fr.raw} />
                </div>
              </div>
              <div className="col-xs">
                <div className="mb-sm">
                  <h2 className="font-bold">{title.text}</h2>
                  <RichText render={texte_en.raw} />
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
