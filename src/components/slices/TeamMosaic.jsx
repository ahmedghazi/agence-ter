import React, { useState, useContext } from "react"
import clsx from "clsx"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import AnimateOnScroll from "../ui/AnimateOnScroll"
import SummaryDetail from "../ui/SummaryDetail"
import { LocaleContext } from "../../contexts/LocaleWrapper"
import { _localizeText } from "../../core/utils"
import TeamFilters from "./TeamFilters"
import useTeam from "../../contexts/TeamWrapper"

const TeamMosaic = ({ input }) => {
  const { localeCtx } = useContext(LocaleContext)
  // const [filtre, setFiltre] = useState()
  const { location, dispatchLocation } = useTeam()

  // const bureaux = input.items.map((el) => el.bureau)
  // const bureauxUniq = bureaux.filter((value, index, self) => {
  //   return self.indexOf(value) === index
  // })
  // // console.log(filtre)

  // const _getFiltres = () => (
  //   <ul className="team-filtres flex">
  //     {bureauxUniq.map((item, i) => (
  //       <li key={i}>
  //         <button
  //           onClick={() => setFiltre(filtre ? "" : item)}
  //           className={clsx("cursor-pointer pr-xs hover:font-bold ")}
  //         >
  //           {item}
  //         </button>
  //       </li>
  //     ))}
  //   </ul>
  // )

  const getDataByFiltre = () =>
    input.items.filter((el) => el.bureau === location)
  // console.log(input.items)
  const data = location ? getDataByFiltre() : input.items

  return (
    <section className="slice-team ">
      <div className="header-filters py-sm md:pb-md sticky top-header-height z-10 md:text-lg">
        <SummaryDetail
          summary={_localizeText("filtre")}
          // detail={_getFiltres()}
          detail={<TeamFilters input={input} />}
        ></SummaryDetail>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-xs md:gap-sm">
        {data.map((item, i) => (
          <AnimateOnScroll key={i} delay={i * 0.1}>
            <article>
              {/* <pre>{JSON.stringify(item)}</pre> */}
              <figure className=" bg-gray" style={{ aspectRatio: "1/1" }}>
                {item.image && item.image.url && (
                  <GatsbyImage
                    image={getImage(item.image)}
                    alt={item.image.alt || ""}
                  />
                )}
              </figure>
              <div className="pt-xs bg-gray-">
                <h3 className="font-bold">{item.name.text}</h3>
                <div className="position hidden-sm">
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
