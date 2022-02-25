import React, { useContext } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import ExcerptToTexte from "../ui/ExcerptToTexte"
import { LocaleContext } from "../../contexts/LocaleWrapper"
import clsx from "clsx"
import AnimateOnScroll from "../ui/AnimateOnScroll"
import SummaryDetail from "../ui/SummaryDetail"
import { useState } from "react"

const Team = ({ input }) => {
  const { localeCtx } = useContext(LocaleContext)
  const [filtre, setFiltre] = useState()

  const bureaux = input.items.map((el) => el.bureau)
  const bureauxUniq = bureaux.filter((value, index, self) => {
    return self.indexOf(value) === index
  })
  // console.log(filtre)

  const _getFiltres = () => (
    <ul className="team-filtres flex">
      {bureauxUniq.map((item, i) => (
        <li key={i}>
          <button
            onClick={() => setFiltre(filtre ? "" : item)}
            className={clsx("cursor-pointer pr-xs hover:font-bold ")}
          >
            {item}
          </button>
        </li>
      ))}
    </ul>
  )

  const getDataByFiltre = () => input.items.filter((el) => el.bureau === filtre)
  // console.log(input.items)
  const data = filtre ? getDataByFiltre() : input.items

  return (
    <section className="slice-team ">
      <div className="header-filters py-sm md:py-md sticky top-header-height z-10">
        <SummaryDetail
          summary={"filtrer"}
          detail={_getFiltres()}
        ></SummaryDetail>
      </div>

      {data.map((item, i) => (
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
                  localeCtx === "en-gb" ? "last-xs hidden-sm" : "",
                  localeCtx !== "fr-fr" ? "text-gray " : ""
                )}
              >
                <h3 className="font-bold">{item.name.text}</h3>
                <div className="position mb-1e">{item.position_fr}</div>
                <ExcerptToTexte
                  excerpt={item.bio_fr.text}
                  content={item.bio_fr.raw}
                  maxWords={50}
                />
              </div>
              <div
                className={clsx(
                  "col-md-3 col-xs",
                  localeCtx === "fr-fr" ? "last-xs hidden-sm" : "",
                  localeCtx !== "en-gb" ? "text-gray " : ""
                )}
              >
                <h3 className="font-bold text-black">{item.name.text}</h3>
                <div className="position mb-1e">{item.position_en}</div>
                <ExcerptToTexte
                  excerpt={item.bio_en.text}
                  content={item.bio_en.raw}
                  maxWords={50}
                />
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      ))}
    </section>
  )
}

export default Team
