import React, { useContext } from "react"
import { RichText } from "prismic-reactjs"
import clsx from "clsx"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { LocaleContext } from "../../contexts/LocaleWrapper"

const Philosophie = ({ input }) => {
  console.log(input)
  const { localeCtx } = useContext(LocaleContext)

  return (
    <section className="slice-philosphie px-md py-lg ">
      <div className="row center-xs">
        <div className="col-md-2 hidden-sm"></div>
        <div className="col-md-6 col-xs-12">
          {input.items.map((el, i) => (
            <article key={i} className="mb-lg text-left">
              {/* <div className="col-md-2 col-xs">
                  {el.image && (
                    <figure className="">
                      <GatsbyImage
                        image={getImage(el.image)}
                        alt={el.image.alt || ""}
                        style={{
                          aspectRatio: "1/1",
                        }}
                      />
                    </figure>
                  )}
                </div> */}
              {/* <div className="col-md-1 hidden-sm"></div> */}

              <div
                className={clsx("row", localeCtx === "en-gb" ? "reverse" : "")}
              >
                <div
                  className={clsx(
                    "col-xs-12",
                    localeCtx !== "fr-fr" ? "text-gray hidden-sm" : ""
                  )}
                >
                  <div className="mb-sm ">
                    <RichText render={el.texte_fr.raw} />
                  </div>
                </div>
                {el.texte_en.text && (
                  <div
                    className={clsx(
                      "col-xs-12",
                      localeCtx !== "en-gb" ? "text-gray--" : ""
                    )}
                  >
                    <div className="mb-sm text-yellow">
                      <RichText render={el.texte_en.raw} />
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
        <div className="col-md-2 hidden-sm"></div>
      </div>
    </section>
  )
}

export default Philosophie
