import React, { useEffect, useState } from "react"
import styled from "styled-components"
import clsx from "clsx"

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;

  pointer-events: none;
  // will-change: transform;

  .outter,
  .inner {
    will-change: transform;
    opacity: 0;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
  }
  .outter {
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    border: 1px solid ${(props) => props.color};
    border-radius: 100%;
    // transition: transform 500ms cubic-bezier(0.37, 0.01, 0, 0.98);
    transition: transform 250ms ease-in-out, width 250ms ease-in-out,
      height 250ms ease-in-out;
  }
  .inner {
    width: 4px;
    height: 4px;
    background: ${(props) => props.color};
    margin-left: calc(${(props) => props.size}px / 2);
    margin-top: calc(${(props) => props.size}px / 2);
    border-radius: 100%;
    transition: transform 250ms cubic-bezier(0.37, 0.01, 0, 0.98);
  }

  &.is-anchor-or-button {
    .outter {
      width: calc(${(props) => props.size}px * 2);
      height: calc(${(props) => props.size}px * 2);
    }
  }

  @media all and (max-width: 991px) {
    display: none;
  }
`

//https://codepen.io/Starglider/pen/LYEELVy?editors=0010
const Cursor = ({ color, size }) => {
  // const inertia = 0.3;
  const [css, setCss] = useState({ x: 0, y: 0, opacity: 0 })
  const [isAnchorOrButton, setIsAnchorOrButton] = useState(false)
  const [isMouseDown, setIsMouseDown] = useState(false)

  useEffect(() => {
    document.addEventListener("mousemove", _onMouseMove)
    document.addEventListener("mousedown", _onMouseDown)
    document.addEventListener("mouseup", _onMouseUp)

    return () => {
      document.removeEventListener("mousemove", _onMouseMove)
      document.removeEventListener("mousedown", _onMouseDown)
      document.removeEventListener("mouseup", _onMouseUp)
    }
  }, [])

  const _onMouseMove = (e) => {
    const __isAnchorOrButton = _getIsAnchorOrButton(e.target)
    setIsAnchorOrButton(__isAnchorOrButton)
    // console.log("eeee")
    let offset = __isAnchorOrButton ? size : size / 2

    setCss((css) => ({
      ...css,
      x: e.clientX - offset,
      y: e.clientY - offset,
      opacity: 1,
    }))
  }

  const _update = (e) => {}

  const _onMouseDown = () => setIsMouseDown(true)
  const _onMouseUp = () => setIsMouseDown(false)

  const _getIsAnchorOrButton = (target) => {
    // console.log(target.classList.contains("button"));
    return (
      target.tagName.toLowerCase() === "a" ||
      target.tagName.toLowerCase() === "button" ||
      target.classList.contains("button") ||
      target.classList.contains("pointer") ||
      target.classList.contains("cursor-pointer")
    )
  }
  console.log(css)
  return (
    <Wrapper
      color={color}
      size={size}
      className={clsx(
        "cursor-",
        isAnchorOrButton ? "is-anchor-or-button" : "",
        isMouseDown ? "is-mousedown" : ""
      )}
      // style={{
      //   transform: `translate(${css.x}px, ${css.y}px) rotate(${css.rotate}deg)`,
      //   opacity: css.opacity,
      // }}
    >
      <div
        className="outter"
        style={{
          transform: `translate(${css.x}px, ${css.y}px) `,
          opacity: css.opacity,
        }}
      ></div>
      {/* <div
        className="inner"
        style={{
          transform: `translate(${css.x}px, ${css.y}px) `,
          opacity: css.opacity,
        }}
      ></div> */}
    </Wrapper>
  )
}

export default Cursor
