import React, { useContext } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { RichText } from "prismic-reactjs"
import { LocaleContext } from "../../contexts/LocaleWrapper"
import clsx from "clsx"
import styled from "styled-components"
import AnimateOnScroll from "../ui/AnimateOnScroll"

const Container = styled.section`
  .row {
    .col-O {
      // color: var(--color-black);
    }
    .col-1 {
      color: var(--color-gray);
    }
    &.reverse {
      .col-1 {
        color: var(--color-black);
      }
      .col-0 {
        color: var(--color-gray);
      }
    }
  }
`

const ImageTextes = ({ input }) => {
  const { localeCtx } = useContext(LocaleContext)

  return (
    <AnimateOnScroll>
      <Container className="slice-image-textes mb-lg">
        <figure className="mb-sm">
          <GatsbyImage
            image={getImage(input.primary.image)}
            alt={input.primary.image.alt || ""}
          />
        </figure>
        <div className={clsx("row", localeCtx === "en-gb" ? "reverse" : "")}>
          {input.items.map((el, i) => (
            <div key={i} className={clsx("col-xs", `col-${i}`)}>
              <RichText render={el.texte.raw} />
            </div>
          ))}
        </div>
      </Container>
    </AnimateOnScroll>
  )
}

export default ImageTextes
