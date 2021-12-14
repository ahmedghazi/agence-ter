import clsx from "clsx"
import React from "react"

const CallToScroll = ({ color = "black" }) => {
  const _onClick = () => {
    const windowHeight = window.innerHeight
    // window.scrollBy(0, windowHeight)
    window.scrollTo({ top: windowHeight, behavior: "smooth" })
  }

  return (
    <div
      className={clsx(
        "absolute text-center bottom-0 left-0 w-screen p-md cursor-pointer"
      )}
      onClick={_onClick}
    >
      <i
        className={clsx(
          "icon-chevron-s animate-bounce inline-block",
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
