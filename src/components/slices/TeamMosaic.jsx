import React, { useState, useContext, useMemo } from "react"
import clsx from "clsx"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import AnimateOnScroll from "../ui/AnimateOnScroll"
import SummaryDetail from "../ui/SummaryDetail"
import { LocaleContext } from "../../contexts/LocaleWrapper"
import { linkResolver, _localizeText } from "../../core/utils"
import TeamFilters from "./TeamFilters"
import useTeam from "../../contexts/TeamWrapper"
import { Link } from "gatsby"

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

  // const getDataByFiltre = () =>
  //   input.items.filter((el) => el.bureau === location)
  // const data = location ? getDataByFiltre() : input.items
  const data = useMemo(() => {
    const dataByFiltre = input.items.filter((el) => el.bureau === location)
    return location ? dataByFiltre : input.items
  }, [location])
  console.log(data)

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
          <AnimateOnScroll key={i} delay={i * 0.05}>
            <article className="relative">
              <figure className=" bg-gray" style={{ aspectRatio: "1/1" }}>
                {item.image && item.image.url && (
                  <GatsbyImage
                    image={getImage(item.image)}
                    alt={item.image.alt || ""}
                  />
                )}
                {!item.image && (
                  <div
                    className="placeholder"
                    style={{
                      aspectRatio: "1/1",
                      background: "var(--color-gray)",
                    }}
                  ></div>
                )}
              </figure>
              <div className="pt-xs bg-gray-">
                <h3 className="font-bold">{item.name.text}</h3>
                <div className="position hidden-sm">
                  {localeCtx === "en-gb" ? item.position_en : item.position_fr}
                </div>
              </div>
              {item.link && item.link.uid && (
                <Link
                  to={linkResolver(item.link)}
                  className="absolute inset-0"
                ></Link>
              )}
            </article>
          </AnimateOnScroll>
          // <article key={i}>
          //   <figure className=" bg-gray" style={{ aspectRatio: "1/1" }}>
          //     {item.image && item.image.url && (
          //       <GatsbyImage
          //         image={getImage(item.image)}
          //         alt={item.image.alt || ""}
          //       />
          //     )}
          //   </figure>
          //   <div className="pt-xs bg-gray-">
          //     <h3 className="font-bold">{item.name.text}</h3>
          //     <div className="position hidden-sm">
          //       {localeCtx === "en-gb" ? item.position_en : item.position_fr}
          //     </div>
          //   </div>
          // </article>
        ))}
      </div>
    </section>
  )
}

export default TeamMosaic
