import clsx from "clsx"
import React, { useEffect, useState } from "react"

const CallToScroll = ({ color = "black" }) => {
  const [hide, setHide] = useState()
  const _onClick = () => {
    const windowHeight = window.innerHeight
    // window.scrollBy(0, windowHeight)
    window.scrollTo({ top: windowHeight, behavior: "smooth" })
  }

  useEffect(() => {
    _onScroll()
    window.addEventListener("scroll", _onScroll)

    return () => window.removeEventListener("scroll", _onScroll)
  }, [])

  const _onScroll = () => {
    console.log(window.pageYOffset)
    if (window.pageYOffset > 0) {
      setHide(true)
    } else {
      setHide(false)
    }
  }

  return (
    <div
      className={clsx(
        "call-to-scroll fixed text-center bottom-0 left-0 w-full pb-md cursor-pointer text-lg z-50",
        hide ? "slideDown" : ""
      )}
      onClick={_onClick}
    >
      <i
        className={clsx(
          "icon-chevron-s animate-bounce inline-block font-bold",
          `text-${color}`
        )}
        // style={{
        //   color: color,
        // }}
      ></i>
    </div>
  )
}

export default CallToScroll
