import React, { useContext } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { RichText } from "prismic-reactjs"
import { LocaleContext } from "../../contexts/LocaleWrapper"
import clsx from "clsx"
import styled from "styled-components"
import AnimateOnScroll from "../ui/AnimateOnScroll"
import { linkResolver } from "../../core/utils"

const Container = styled.section`
  &.is-translatable {
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
  }
`

const ImageTextes = ({ input }) => {
  const { localeCtx } = useContext(LocaleContext)
  const isTranslatable = input.items.length === 2
  return (
    <AnimateOnScroll>
      <Container
        className={clsx(
          "slice-image-textes mb-xl",
          isTranslatable ? "is-translatable" : ""
        )}
      >
        <figure className="mb-md-alt">
          <GatsbyImage
            image={getImage(input.primary.image)}
            alt={input.primary.image.alt || ""}
          />
        </figure>
        <div
          className={clsx(
            // "ttttttttttttttttt",
            "row"
            // localeCtx === "en-gb" ? "reverse" : ""
          )}
        >
          {input.items.map((el, i) => (
            <div
              key={i}
              className={clsx(
                "col-xs text-center",
                `col-${i} ${isTranslatable && i > 0 ? "hidden-sm" : ""}`
              )}
            >
              <RichText render={el.texte.raw} linkResolver={linkResolver} />
            </div>
          ))}
        </div>
      </Container>
    </AnimateOnScroll>
  )
}

export default ImageTextes
