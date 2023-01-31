import React, { useContext, useRef } from "react"
// import Figure from "./Figure"
import { Link } from "gatsby"
import useFilters, { FiltersContext } from "../contexts/FiltersWrapper"
import styled from "styled-components"
import clsx from "clsx"
import SvgMaskImage from "./ui/SvgMaskImage"
// import { _fixYears } from "../core/utils"

const Card = styled.article`
  // transition: opacity 0.2s ease;
  // opacity: 0;
  // &.reveal {
  //   opacity: 1;
  // }
  &.is-filtering {
    &.is-selected {
      // color: red;
      // background: yellow;
    }
    &.is-not-selected {
      // display: none;
    }
  }

  .h2,
  .location,
  .superficie {
    line-height: 1;
  }

  @media all and (max-width: 768px) {
    // min-width: 35vw;
    &.card-s {
      // width: 75px !important;
      width: 104px !important;
    }
    &.card-m {
      width: 154px !important;
    }
    &.card-l {
      width: 228px !important;
    }
    .project-header {
      min-width: 100px;
    }
  }
`

const Visuel = styled.div`
  &:hover {
    .outline {
      opacity: 0;
    }
    rect {
      opacity: 0.5;
    }
    image {
      opacity: 1;
    }
  }

  image {
    opacity: 0;
  }
  rect {
    opacity: 0;
  }
  // g:hover rect {
  //   // opacity: 0.5;
  // }
`

const ProjectCard = ({ input }) => {
  const carRef = useRef()
  // const { filters } = useFilters()
  // console.log(input)
  const { largeur, marge_interne, title_offset, surface_bold, item } = input
  const { uid, data } = item.document

  //
  const _getTagByName = (tag) => {
    // console.log(tag)
    switch (tag) {
      case "theme":
        return `tag_theme-${data.theme?.document.uid}`
      case "localisation":
        return `tag_localisation-${data.localisation?.document?.uid}`
      case "year":
        return `tag_year-${data.year?.document?.uid}`
      default:
        return ""
    }
  }
  const theme = _getTagByName("theme")
  const localisation = _getTagByName("localisation")
  const year = _getTagByName("year")
  const tags = [theme, localisation, year]
  const tagsClassString = tags.toString().replace(new RegExp(",", "g"), " ")
  // console.log(tagsClassString)

  // const _isSelected = () => {
  //   return true
  //   const isSelected = tags.find((elem) => elem === filter)
  //   return isSelected ? "is-selected" : "is-not-selected"
  // }

  const _getGridSize = () => {
    // console.log(largeur)
    switch (largeur) {
      case "S":
        return (153 * 100) / 1440
      case "M":
        return (267 * 100) / 1440
      case "L":
        return (382 * 100) / 1440
      default:
        return (153 * 100) / 1440
    }
  }

  const _getOffset = () => {
    const parts = title_offset ? title_offset.split(",") : [0, 0]
    return `translate(${parts[0]}%, ${parts[1]}%)`
  }

  // console.log(surface_bold, uid)
  return (
    <Card
      ref={carRef}
      className={clsx(
        "card p-xs px-sm md:p-sm",
        `card-${largeur.toLowerCase()}`,
        tagsClassString
      )}
      style={{
        width: `${_getGridSize()}%`,
      }}
    >
      <Link to={`/project/${uid}`}>
        <div
          className="inner"
          style={{
            padding: marge_interne,
          }}
        >
          <Visuel>
            <SvgMaskImage
              svg={data.pictogramme}
              image={data.image.url}
              placeHolderColor={"#ffffff"}
              outline={true}
            />
          </Visuel>
          <div
            className="project-header flex justify-end-"
            style={{
              transform: _getOffset(),
            }}
          >
            <div>
              <h2 className="font-semibold">{data.title.text}</h2>
              {data.localisation.document && (
                <div className="location">
                  {data.localisation.document.data.title.text}{" "}
                  {data.localisation_short}
                </div>
              )}
              <div
                className={clsx(
                  "superficie",
                  surface_bold ? "md:text-lg font-bold" : ""
                )}
              >
                {data.superficie} {surface_bold}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  )
}

export default ProjectCard
