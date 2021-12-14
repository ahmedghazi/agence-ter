import React from "react"
import { _localizeText } from "../../core/utils"

const ScrollToTop = () => {
  const _onClick = () => {
    // window.scrollTo(0, 0)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className=" text-center cursor-pointer" onClick={() => _onClick()}>
      <div
        className="absolute left-1/2 -top-full "
        style={{ transform: "translate(-50%, -20%)" }}
      >
        <i className="icon-chevron-n block"></i>
        <i
          className="icon-chevron-n block"
          style={{ transform: "translateY(-.4em)" }}
        ></i>
      </div>

      <div className="label">{_localizeText("back")}</div>
    </div>
  )
}

export default ScrollToTop
