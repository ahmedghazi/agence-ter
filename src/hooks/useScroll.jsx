import { useState, useEffect, useRef } from "react"

export function useScroll() {
  // const [lastScrollTop, setLastScrollTop] = useState(0)
  const [bodyOffset, setBodyOffset] = useState(
    document.body.getBoundingClientRect()
  )
  const [scrollY, setScrollY] = useState(bodyOffset.top)
  const [scrollX, setScrollX] = useState(bodyOffset.left)
  const [scrollDirection, setScrollDirection] = useState()
  const [isBottom, setIsBottom] = useState(false)
  const bottomThreshold = 100
  // let _prevScrollTop = 0
  const lastScrollTopRef = useRef(0)
  const lastScrollTop = lastScrollTopRef.current

  const EmptySSRRect = {
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  }

  const listener = (e) => {
    setBodyOffset(
      typeof window === "undefined" || !window.document
        ? EmptySSRRect
        : document.body.getBoundingClientRect()
    )
    setScrollY(-bodyOffset.top)
    setScrollX(bodyOffset.left)
    setScrollDirection(lastScrollTop > -bodyOffset.top ? "down" : "up")
    // lastScrollTopRef.current = -bodyOffset.top

    const distanceToBottom =
      document.body.scrollHeight - (window.innerHeight + window.scrollY)
    setIsBottom(distanceToBottom <= bottomThreshold)
    // _prevScrollTop = window.pageYOffset
    lastScrollTopRef.current = -bodyOffset.top
  }

  useEffect(() => {
    window.addEventListener("scroll", listener)
    return () => {
      window.removeEventListener("scroll", listener)
    }
  })

  return {
    scrollY,
    scrollX,
    scrollDirection,
    isBottom,
  }
}
