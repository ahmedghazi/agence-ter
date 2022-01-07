import React, { useState, useContext } from "react"
import clsx from "clsx"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import AnimateOnScroll from "../ui/AnimateOnScroll"
import SummaryDetail from "../ui/SummaryDetail"
import { LocaleContext } from "../../contexts/LocaleWrapper"

const TeamMosaic = ({ input }) => {
  const { localeCtx } = useContext(LocaleContext)
  const [filtre, setFiltre] = useState()

  const bureaux = input.items.map((el) => el.bureau)
  const bureauxUniq = bureaux.filter((value, index, self) => {
    return self.indexOf(value) === index
  })
  console.log(filtre)

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
      <div className="header-filters py-sm md:pb-md sticky top-header-height z-10">
        <SummaryDetail
          summary={"filtrer"}
          detail={_getFiltres()}
        ></SummaryDetail>
      </div>

      <div className="grid md:grid-cols-3 gap-sm">
        {data.map((item, i) => (
          <AnimateOnScroll key={i} delay={i * 0.2}>
            <article>
              {/* <pre>{JSON.stringify(item)}</pre> */}
              <figure className="mb-sm">
                <GatsbyImage
                  image={getImage(item.image)}
                  alt={item.image.alt || ""}
                />
              </figure>
              <div className="overlay w-full h-full absolute top-0 left-0 p-sm md:opacity-0 hover:opacity-100 transition-opacity">
                <h3 className="font-bold">{item.name.text}</h3>
                <div className="position mb-1e">
                  {localeCtx === "en-gb" ? item.position_en : item.position_fr}
                </div>
              </div>
            </article>
          </AnimateOnScroll>
        ))}
      </div>
    </section>
  )
}

export default TeamMosaic
