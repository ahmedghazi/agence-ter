import React, { useState } from "react"
import clsx from "clsx"
import styled from "styled-components"
import { _localizeText } from "../../core/utils"

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

const SummaryDetail = ({ summary, detail, summary_extra }) => {
  // const [active, setActive] = useState()
  const [collapsed, setCollapsed] = useState(true)

  // const _className = active ? "is-active" : ""

  return (
    <div className={`summary-detail`}>
      <DropDownButton
        className="summary"
        collapsed={collapsed}
        onClick={() => setCollapsed(!collapsed)}
      >
        <span className="pr-xs font-bold">{_localizeText(summary)}</span>
        <span className="icon-chevron-s absolute top-1/3 text-sm"></span>
      </DropDownButton>

      <DropDownContent
        className={clsx("detail", collapsed ? "is-collapsed" : "")}
      >
        {detail}
      </DropDownContent>
    </div>
  )
}

export default SummaryDetail
