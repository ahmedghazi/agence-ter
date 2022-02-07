import React, { useState, useEffect } from "react"
import clsx from "clsx"
import { _localizeText } from "../../core/utils"

const ScrollToTop = () => {
  const [hide, setHide] = useState()

  useEffect(() => {
    _onScroll()
    window.addEventListener("scroll", _onScroll)

    return () => window.removeEventListener("scroll", _onScroll)
  }, [])

  const _onScroll = () => {
    // console.log(window.pageYOffset)
    if (window.pageYOffset < window.innerHeight) {
      setHide(true)
    } else {
      setHide(false)
    }
  }

  const _onClick = () => {
    // window.scrollTo(0, 0)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div
      className={clsx(
        "fixed bottom-md right-md text-center cursor-pointer transition-all",
        hide ? "slideDown" : ""
      )}
      onClick={() => _onClick()}
    >
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
