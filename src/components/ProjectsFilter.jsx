import React, { useState, useContext, useEffect } from "react"
import clsx from "clsx"
import styled from "styled-components"
import { FiltersContext } from "../contexts/FiltersWrapper"

const Wrapper = styled.div``

const DropDownButton = styled.button`
  text-align: left;
  width: 100%;
  position: relative;
  padding: 0 var(--space-sm);
`

const DropDownContent = styled.div`
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.6s, opacity 0.6s; // note that we're transitioning max-height, not height!
  transition-timing-function: ease;
  height: auto;
  max-height: 350px; // still have to hard-code a value!
  &.is-collapsed {
    max-height: 0;
    opacity: 0;
  }
`

const ProjectsFilter = ({ input }) => {
  const { filter, dispatch } = useContext(FiltersContext)
  const [collapsed, setCollapsed] = useState(true)
  // const _toggle = () => setCollapsed(!collapsed)
  const { title, values, color } = input

  const _change = (item) => {
    dispatch(filter === item.uid ? "" : item.uid)
    setTimeout(() => {
      console.log(color)
      document.querySelector(".grid-view .backdrop").style.backgroundColor =
        color
    }, 150)

    // const isActive = filter === item.uid
    // if (isActive) {
    //   dispatch("")
    // } else {
    //   dispatch(item.uid)
    // }
    // const exist = filters.find((elem) => elem === item.uid)
    // if (exist) {
    //   dispatch(filters.filter((f) => f !== item.uid))
    // } else {
    //   dispatch((f) => [...f, item.uid])
    // }
  }

  useEffect(() => {
    if (filter !== "") {
      PubSub.publish("TABLE_HIDE")
      // PubSub.publish("GRID_VIEW_COLOR", color)
    }
  }, [filter])

  return (
    <Wrapper className="mb-xs">
      <div className="label font-bold">{title}</div>
      <ul className="flex">
        {values.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => _change(item)}
              className={clsx(
                "cursor-pointer pr-xs hover:font-bold",
                filter === item.uid ? "font-bold" : ""
              )}
            >
              {item.data.title.text}
              {/* <pre>{JSON.stringify(item)}</pre> */}
            </button>
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}

export default ProjectsFilter
