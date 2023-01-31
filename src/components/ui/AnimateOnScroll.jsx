import React from "react"
import { Reveal, Tween } from "react-gsap"

const AnimateOnScroll = ({ children, delay = 0 }) => {
  // threshold={0.1}
  return (
    <div className="aos">
      <Reveal repeat threshold={0.01}>
        <Tween
          from={{ opacity: 0, transform: "translateY(20px)" }}
          to={{ opacity: 1, transform: "translateY(0px)" }}
          duration={0.2}
          delay={delay}
        >
          {children}
        </Tween>
      </Reveal>
    </div>
  )
}

export default AnimateOnScroll
