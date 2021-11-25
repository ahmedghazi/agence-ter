import React, { useContext } from "react"
import { LocaleContext } from "../contexts/LocaleWrapper"
import { RichText } from "prismic-reactjs"
import clsx from "clsx"
import AnimateOnScroll from "./ui/AnimateOnScroll"

const ContactsAgence = ({ input }) => {
  const { localeCtx } = useContext(LocaleContext)

  return (
    <AnimateOnScroll>
      <article className="mb-lg">
        <div className="row">
          <div className="col-md-2 col-xs">image</div>
          <div className="col-md-1 hidden-sm"></div>
          <div className="col-xs">
            <div
              className={clsx("row", localeCtx === "en-gb" ? "reverse" : "")}
            >
              <div className="col-xs">
                <h2 className="font-bold">{input.nom.text}</h2>
                <RichText render={input.infos_fr.raw} />
              </div>
              <div className="col-xs">
                <h2 className="font-bold">{input.nom.text}</h2>
                <RichText render={input.infos_en.raw} />
              </div>
            </div>
          </div>
        </div>
      </article>
    </AnimateOnScroll>
  )
}

export default ContactsAgence
