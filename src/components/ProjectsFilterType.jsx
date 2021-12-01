import React, { useState, useContext, useEffect } from "react"
import clsx from "clsx"
import styled from "styled-components"
import useFilters from "../contexts/FiltersWrapper"
// import { FiltersContext } from "../contexts/FiltersWrapper"

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

const ProjectsFilterType = ({ input }) => {
  // const { filter, dispatch } = useContext(FiltersContext)
  const { filters, dispatchFilter } = useFilters()
  // const [collapsed, setCollapsed] = useState(true)
  // const _toggle = () => setCollapsed(!collapsed)
  const { title, values, color } = input

  const _change = (item) => {
    // dispatchFilter(filter === item.uid ? "" : item.uid)
    const filterExist = filters.filter((el) => el.uid === item.uid)
    const filterTypeExist = filters.filter((el) => el.type === item.type)
    // console.log("filterExist", filterExist.length)
    if (filterExist.length > 0) {
      dispatchFilter({ type: "REMOVE", payload: item })
    } else if (filterTypeExist.length) {
      dispatchFilter({ type: "REMOVE_BY_TYPE", payload: item.type })
      dispatchFilter({ type: "ADD", payload: item })
      _updateBackgroundColor()
    } else {
      dispatchFilter({ type: "ADD", payload: item })
      _updateBackgroundColor()
    }

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
  const _updateBackgroundColor = () => {
    setTimeout(() => {
      console.log(color)
      document.querySelector(".grid-view .backdrop").style.backgroundColor =
        color
    }, 150)
  }
  useEffect(() => {
    if (filters.length) {
      // PubSub.publish("TABLE_HIDE")
      // PubSub.publish("GRID_VIEW_COLOR", color)
      // console.log(color)
      // document.querySelector(".grid-view .backdrop").style.backgroundColor =
      //   color
    }
  }, [filters])

  return (
    <Wrapper className="mb-xs">
      <div className="label font-bold">{title}</div>
      <ul className="flex">
        {values.map((item, i) => (
          <li key={i}>
            <button
              onClick={() => _change(item)}
              className={clsx(
                "cursor-pointer pr-xs hover:font-bold"
                // filter === item.uid ? "font-bold" : ""
              )}
            >
              {item.data.title.text}
            </button>
          </li>
        ))}
      </ul>
    </Wrapper>
  )
}

export default ProjectsFilterType
