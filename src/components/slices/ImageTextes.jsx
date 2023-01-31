import React, { useContext } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { RichText } from "prismic-reactjs"
import { LocaleContext } from "../../contexts/LocaleWrapper"
import clsx from "clsx"
import styled from "styled-components"
import AnimateOnScroll from "../ui/AnimateOnScroll"
import { linkResolver } from "../../core/utils"

const Container = styled.section`
  iframe {
    width: 100%;
    height: auto;
    aspect-ratio: 16 / 9;
  }
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
  // const { localeCtx } = useContext(LocaleContext)
  const isTranslatable = input.items.length === 2
  return (
    <AnimateOnScroll>
      <Container
        className={clsx(
          "slice-image-textes mb-xl",
          isTranslatable ? "is-translatable" : ""
        )}
      >
        {input.primary.image && input.primary.image.gatsbyImageData && (
          <figure className="mb-md-alt">
            <GatsbyImage
              image={getImage(input.primary.image)}
              alt={input.primary.image.alt || ""}
            />
            {/* <pre>{JSON.stringify(input.primary.image)}</pre> */}
          </figure>
        )}
        <div className={clsx("row")}>
          {input.items.map((el, i) => (
            <div
              key={i}
              className={clsx(
                "col-xs text-center ",
                `col-${i} ${isTranslatable && i > 0 ? "hidden-sm" : ""}`
              )}
            >
              <div className="text-justify-">
                <RichText
                  render={el.texte.richText}
                  linkResolver={linkResolver}
                />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </AnimateOnScroll>
  )
}

export default ImageTextes
