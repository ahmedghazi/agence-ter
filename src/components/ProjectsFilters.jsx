import React, { useState } from "react"
import { graphql, useStaticQuery } from "gatsby"
import PubSub from "pubsub-js"
import clsx from "clsx"
import styled from "styled-components"
import ProjectsFilterType from "./ProjectsFilterType"
import useFilters from "../contexts/FiltersWrapper"
import { _localizeTitle, _localizeText } from "../core/utils"
import ProjectsSearch from "./ProjectsSearch"

const query = graphql`
  query ProjectsFiltersQ {
    allPrismicTagTheme(sort: { data: { ordre: ASC } }) {
      nodes {
        uid
        type
        data {
          title {
            text
          }
          title_en {
            text
          }
        }
      }
    }
    allPrismicTagLocalisation(sort: { uid: ASC }) {
      nodes {
        uid
        type
        data {
          title {
            text
          }
          title_en {
            text
          }
        }
      }
    }
    allPrismicTagYear(sort: { uid: ASC }) {
      nodes {
        uid
        type
        data {
          title {
            text
          }
          title_en {
            text
          }
        }
      }
    }
  }
`

const Wrapper = styled.div`
  z-index: 251;
  .header {
    line-height: 1;
  }
`
const DropDownButton = styled.button`
  text-align: left;
  position: relative;
  // width: 50px;
  &:hover .icon-chevron-s {
    transform: ${(props) =>
      props.collapsed
        ? "translateY(2px) rotate(0deg)"
        : "translateY(-2px) rotate(180deg)"};
  }
  .icon-chevron-s {
    font-size: 6px;
    transform-origin: center;
    transition: transform 0.2s;
    transform: ${(props) =>
      props.collapsed ? "rotate(0deg)" : "rotate(180deg)"};
  }
`
const DropDownContent = styled.div`
  width: 100%;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.3s, opacity 0.3s; // note that we're transitioning max-height, not height!
  transition-timing-function: ease;
  height: auto;
  max-height: 350px; // still have to hard-code a value!
  &.is-collapsed {
    max-height: 0;
    opacity: 0;
  }
`

const ProjectsFilters = () => {
  const { allPrismicTagTheme, allPrismicTagLocalisation, allPrismicTagYear } =
    useStaticQuery(query)

  const { filters, dispatchFilter } = useFilters()
  // console.log(filters)
  const [collapsed, setCollapsed] = useState(true)

  const _getPrefixedTags = (nodes, type) => {
    return nodes.map((el) => ({
      uid: `tag_${type}-${el.uid}`,
      type: `tag_${type}`,
      data: {
        title: {
          text: el.data.title.text,
        },
        title_en: {
          text: el.data.title_en.text,
        },
      },
    }))
  }

  const data = [
    {
      title: _localizeText("themes"),
      values: _getPrefixedTags(allPrismicTagTheme.nodes, "theme"),
      color: "#CCE6C7",
    },
    {
      title: _localizeText("localisations"),
      values: _getPrefixedTags(allPrismicTagLocalisation.nodes, "localisation"),
      color: "#6B8BC7",
    },
    {
      title: _localizeText("years"),
      values: _getPrefixedTags(allPrismicTagYear.nodes, "year"),
      color: "#F07E64",
    },
  ]
  // console.log(data)
  const _toggle = () => setCollapsed(!collapsed)

  const _handleSwitchView = () => {
    setCollapsed(true)
    PubSub.publish("TABLE_TOGGLE")
    setTimeout(() => {
      dispatchFilter({ type: "REMOVE_ALL" })
    }, 150)
  }

  // const _renderFiltersSelected = () => {}
  // console.log(filters)
  return (
    <Wrapper>
      {/* <pre>{JSON.stringify(filter)}</pre> */}
      <div className="header mb-xs flex items-center">
        <button
          onClick={() => _handleSwitchView()}
          className="font-bold pr-xs md:text-lg toggle w-[114px] text-left"
        >
          Liste
        </button>
        <DropDownButton
          className="drop-down--header pr-md"
          onClick={_toggle}
          collapsed={collapsed}
        >
          <span className="pr-xs font-bold md:text-lg">
            {_localizeText("filtre")}
          </span>
          <span className="icon-chevron-s absolute top-1/3 text-lg"></span>
        </DropDownButton>
        {filters && (
          <ul className="filters flex">
            {filters.map((item, i) => (
              <li key={i}>
                <button
                  onClick={() =>
                    dispatchFilter({ type: "REMOVE", payload: item })
                  }
                  className={clsx(
                    "cursor-pointer pr-xs hover:font-bold button-deletable"
                  )}
                >
                  {/* {item.data.title.text} */}
                  {_localizeTitle(item.data)}
                </button>
              </li>
            ))}
          </ul>
        )}

        <ProjectsSearch />
      </div>

      <DropDownContent
        className={clsx("drop-down--content", collapsed ? "is-collapsed" : "")}
      >
        {data.map((item, i) => (
          <ProjectsFilterType key={i} input={item} />
        ))}
      </DropDownContent>
    </Wrapper>
  )
}

export default ProjectsFilters
