import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./Header"
import Footer from "./Footer"
import Cursor from "./ui/Cursor"
import { FiltersWrapper } from "../contexts/FiltersWrapper"

const WrapperContext = React.createContext()

const query = graphql`
  query {
    settings: prismicSettings {
      ...settings
    }
  }
`

const Layout = ({ children, pageContext }) => {
  const { settings } = useStaticQuery(query)
  // console.log(settings)
  const [direction, setDirection] = useState()

  useEffect(() => {
    _onScroll()
    _format()
    window.addEventListener("scroll", _onScroll)
    window.addEventListener("resize", _format)
    // if (window.innerWidth < 1080 && "ontouchstart" in window) setIsMobile(true)

    return () => {
      window.removeEventListener("scroll", _onScroll)
      window.removeEventListener("resize", _format)
    }
  }, [])

  let _prevScrollTop = 0
  const _onScroll = () => {
    window.pageYOffset > _prevScrollTop
      ? setDirection("down")
      : setDirection("up")

    if (window.pageYOffset === 0) {
      setDirection("")
    }

    _prevScrollTop = window.pageYOffset
  }
  const _format = () => {
    // console.log("format");
    // const ww = window.innerWidth;
    // const wh = window.innerHeight;
    document.documentElement.style.setProperty(
      "--appHeight",
      window.innerHeight + "px"
    )

    const headerBounding = document
      .querySelector("header")
      .getBoundingClientRect()

    document.documentElement.style.setProperty(
      "--headerHeight",
      headerBounding.height + "px"
    )
  }

  return (
    <WrapperContext.Provider value={{ settings }}>
      <FiltersWrapper>
        <div id="page">
          <Header direction={direction} />
          <main>{children}</main>
          <Footer />
          {/* <Cursor color="black" size="20" /> */}
        </div>
      </FiltersWrapper>
    </WrapperContext.Provider>
  )
}

export { WrapperContext, Layout }
