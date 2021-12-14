import clsx from "clsx"
import React from "react"

const CallToScroll = ({ color = "black" }) => {
  return (
    <div className={clsx("absolute text-center bottom-0 left-0 w-screen p-md")}>
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
