import React from "react"
import { Reveal, Tween } from "react-gsap"

const AnimateOnScroll = ({ children }) => {
  return (
    <div className="aos">
      <Reveal repeat>
        <Tween
          from={{ opacity: 0, transform: "translate3d(0, 50px, 0)" }}
          duration={0.5}
        >
          {children}
        </Tween>
      </Reveal>
    </div>
  )
}

export default AnimateOnScroll
