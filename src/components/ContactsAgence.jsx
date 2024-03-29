import React, { useContext } from "react"
import { LocaleContext } from "../contexts/LocaleWrapper"
import { RichText } from "prismic-reactjs"
import clsx from "clsx"
import AnimateOnScroll from "./ui/AnimateOnScroll"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { Link } from "gatsby"

const ContactsAgence = ({ input }) => {
  const { localeCtx } = useContext(LocaleContext)
  const { nom, image, infos_fr, infos_en, liens } = input
  // console.log(liens)
  return (
    <AnimateOnScroll>
      <article className="mb-lg">
        <div className="row">
          <div className="col-md-2 col-xs">
            {image && image.url && (
              <figure className="">
                <a href={liens.url} target="_blank" rel="noopener, noreferrer">
                  <GatsbyImage
                    image={getImage(image)}
                    alt={image.alt || ""}
                    style={{
                      aspectRatio: "1/1",
                    }}
                  />
                </a>
              </figure>
            )}
          </div>
          <div className="col-md-1 hidden-sm"></div>
          <div className="col-xs">
            <div
              className={clsx("row", localeCtx === "en-gb" ? "reverse" : "")}
            >
              <div
                className={clsx(
                  "col-xs ",
                  localeCtx !== "en-gb" ? "text-black" : "text-gray"
                )}
              >
                <h2 className="font-bold">{nom.text}</h2>
                <RichText render={infos_fr.richText} />
              </div>
              <div
                className={clsx(
                  "col-xs hidden-sm",
                  localeCtx !== "en-gb" ? "text-gray" : "text-black"
                )}
              >
                <h2 className="font-bold">{nom.text}</h2>
                <RichText render={infos_en.richText} />
              </div>
            </div>
          </div>
        </div>
      </article>
    </AnimateOnScroll>
  )
}

export default ContactsAgence
