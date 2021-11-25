import React, { useState, useContext } from "react"
import { graphql, useStaticQuery } from "gatsby"
import PubSub from "pubsub-js"
import clsx from "clsx"
import styled from "styled-components"
import ProjectsFilter from "./ProjectsFilter"
import { FiltersContext } from "../contexts/FiltersWrapper"
import { _localizeText } from "../core/utils"

const query = graphql`
  query {
    allPrismicTagTheme {
      nodes {
        uid
        type
        data {
          title {
            text
          }
        }
      }
    }
    allPrismicTagLocalisation {
      nodes {
        uid
        type
        data {
          title {
            text
          }
        }
      }
    }
    allPrismicTagYear {
      nodes {
        uid
        type

        data {
          title {
            text
          }
        }
      }
    }
  }
`

const Wrapper = styled.div`
  // width: 272px;
  // color: red;
  z-index: 251;
`
const DropDownButton = styled.button`
  text-align: left;
  position: relative;
  width: 50px;
  &:hover .chevron {
    transform: ${(props) =>
      props.collapsed
        ? "translateY(2px) rotate(0deg)"
        : "translateY(-2px) rotate(180deg)"};
  }
  .chevron {
    transition: transform 0.2s;
    transform: ${(props) =>
      props.collapsed ? "rotate(0deg)" : "rotate(180deg)"};
  }
`
const DropDownContent = styled.div`
  // position: absolute;
  // background: white;
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
  const { filter, dispatch } = useContext(FiltersContext)

  const [collapsed, setCollapsed] = useState(true)

  const _getFixedYears = () => {
    return allPrismicTagYear.nodes.map((el) => ({
      uid: `tag_year-${el.uid}`,
      type: "tag_year",
      data: {
        title: {
          text: el.data.title.text,
        },
      },
    }))
  }

  const data = [
    {
      title: _localizeText("themes"),
      values: allPrismicTagTheme.nodes,
      color: "#CCE6C7",
    },
    {
      title: _localizeText("localisations"),
      values: allPrismicTagLocalisation.nodes,
      color: "#6B8BC7",
    },
    {
      title: _localizeText("year"),
      values: _getFixedYears(),
      color: "#F07E64",
    },
  ]

  const _toggle = () => setCollapsed(!collapsed)

  const _handleSwitchView = () => {
    setCollapsed(true)
    PubSub.publish("TABLE_TOGGLE")
    dispatch("")
  }

  return (
    <Wrapper>
      {/* <pre>{JSON.stringify(filter)}</pre> */}
      <DropDownButton
        className="drop-down--header mb-xs flex items-center"
        onClick={_toggle}
        collapsed={collapsed}
      >
        <span className="pr-xs">{_localizeText("filtrer")}</span>
        <div className="chevron absolute right-0">
          <svg
            width="11"
            height="7"
            viewBox="0 0 11 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1,1l4.5,5L10,1" stroke="black" strokeWidth="0.5" />
          </svg>
        </div>
      </DropDownButton>

      <DropDownContent
        className={clsx("drop-down--content", collapsed ? "is-collapsed" : "")}
      >
        {data.map((item, i) => (
          <ProjectsFilter key={i} input={item} />
        ))}

        <button onClick={_handleSwitchView} className="font-bold">
          Liste
        </button>
      </DropDownContent>
    </Wrapper>
  )
}

export default ProjectsFilters
