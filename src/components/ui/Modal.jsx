import React from "react"
import styled from "styled-components"
import { _localizeText } from "../../core/utils"

const Container = styled.section`
  background: var(--color-yellow);
  transition: opacity 0.4s ease;
  /* transform: ${(props) =>
    props.open ? "translateY(0)" : "translateY(100%)"}; */
  pointer-events: ${(props) => (props.open ? "all" : "none")};
  // max-height: calc(100vh - var(--header-height));
  /* padding-top: var(--header-height); */
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
  opacity: ${(props) => (props.open ? 1 : 0)};
  z-index: 251;
`

const Modal = ({ children, open, setOpen }) => {
  return (
    <Container
      className="modal fixed inset-0 w-full h-screen bg-yellow "
      open={open}
    >
      <div className="body py-lg-">{children}</div>
      <div className="header  absolute top-0 right-0 z-10- bg-gray- p-xs md:p-md z-50">
        <button className="outline" onClick={() => setOpen(false)}>
          {/* {_localizeText("close")} */}
          <i className="icon icon-close text-lg"></i>
        </button>
      </div>
    </Container>
  )
}

export default Modal
