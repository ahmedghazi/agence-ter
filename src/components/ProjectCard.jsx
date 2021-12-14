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
  }

  // image {
  //   opacity: 0;
  // }
  rect {
    opacity: 0;
  }
  // g:hover rect {
  //   // opacity: 0.5;
  // }
`

const ProjectCard = ({ input }) => {
  const carRef = useRef()
  const { filters } = useFilters()

  const { largeur, marge_interne, offset, surface_bold, item } = input
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
        return (2 * 100) / 12
      case "M":
        return (3 * 100) / 12
      case "L":
        return (4 * 100) / 12
      default:
        return (2 * 100) / 12
    }
  }

  const _getOffset = () => {
    const parts = offset ? offset.split(",") : [0, 0]
    return `translate(${parts[0]}%, ${parts[1]}%)`
  }

  // console.log(surface_bold, uid)
  return (
    <Card
      ref={carRef}
      className={clsx(
        "card p-xs md:p-sm",
        `card-${largeur.toLowerCase()}`,
        tagsClassString
        // _isFiltering ? "is-filtering" : "",
        // _isFiltering ? _isSelected() : ""
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
              svg={data.pictogramme.url}
              image={data.image.url}
              // placeHolderColor={_isSelected() ? "transparent" : "transparent"}
              // placeHolderColor={"#878787"}
              placeHolderColor={"#ffffff"}
              outline={true}
            />
          </Visuel>
          <div
            className="project-header flex justify-end"
            style={{
              transform: _getOffset(),
            }}
          >
            <div>
              <h2 className="font-semibold">{data.title.text}</h2>
              {data.localisation.document && (
                <div className="location">
                  {data.localisation.document.data.title.text}
                </div>
              )}
              <div
                className={clsx(
                  "superficie",
                  surface_bold ? "text-lg font-bold" : ""
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
