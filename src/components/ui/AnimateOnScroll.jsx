import React from "react"
import { Reveal, Tween } from "react-gsap"

const AnimateOnScroll = ({ children, delay = 0 }) => {
  return (
    <div className="aos">
      <Reveal repeat threshold={0.4}>
        <Tween
          from={{ opacity: 0, transform: "translate3d(0, 30px, 0)" }}
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
