import React, { useContext } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ExcerptToTexte from "../ui/ExcerptToTexte"
import { LocaleContext } from "../../contexts/LocaleWrapper"
import clsx from "clsx"
import AnimateOnScroll from "../ui/AnimateOnScroll"

const Team = ({ input }) => {
  const { localeCtx } = useContext(LocaleContext)

  return (
    <section className="slice-team ">
      {input.items.map((item, i) => (
        <AnimateOnScroll key={i}>
          <div className="mb-xl">
            <div className="row">
              <div className="col-md-2 col-xs">
                <figure className="mb-sm">
                  <GatsbyImage
                    image={getImage(item.image)}
                    alt={item.image.alt || ""}
                  />
                </figure>
              </div>
              <div className="col-md-1 hidden-sm"></div>
              <div
                className={clsx(
                  "col-md-3 col-xs",
                  localeCtx === "en-gb" ? "last-xs hidden-sm" : ""
                )}
              >
                <h3 className="font-bold">{item.name.text}</h3>
                <div className="position">{item.position_fr}</div>
              </div>
              <div
                className={clsx(
                  "col-md-3 col-xs",
                  localeCtx === "fr-fr" ? "last-xs hidden-sm" : ""
                )}
              >
                <h3 className="font-bold">{item.name.text}</h3>
                <div className="position">{item.position_en}</div>
              </div>
            </div>
            {item.bio_fr && (
              <div
                className={clsx("row", localeCtx === "en-gb" ? "reverse" : "")}
              >
                <div
                  className={clsx(
                    "col-xs",
                    localeCtx !== "fr-fr" ? "text-gray hidden-sm" : ""
                  )}
                >
                  <ExcerptToTexte
                    excerpt={item.bio_fr.text}
                    content={item.bio_fr.raw}
                    maxWords={50}
                  />
                </div>
                <div
                  className={clsx(
                    "col-xs",
                    localeCtx !== "en-gb" ? "text-gray hidden-sm" : ""
                  )}
                >
                  <ExcerptToTexte
                    excerpt={item.bio_en.text}
                    content={item.bio_en.raw}
                    maxWords={50}
                  />
                </div>
              </div>
            )}
          </div>
        </AnimateOnScroll>
      ))}
    </section>
  )
}

export default Team
