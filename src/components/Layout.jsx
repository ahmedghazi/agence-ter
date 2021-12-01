import React, { useState, useEffect, createContext } from "react"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./Header"
import Footer from "./Footer"
import Cursor from "./ui/Cursor"
import { FiltersWrapper } from "../contexts/FiltersWrapper"
import { CategoriesWrapper } from "../contexts/CategoriesWrapper"

const WrapperContext = createContext()

const query = graphql`
  query {
    settings: prismicSettings {
      ...settings
    }
  }
`

const Layout = ({ children, pageContext }) => {
  const { settings } = useStaticQuery(query)
  const { template } = pageContext
  // console.log(pageContext)
  // const [direction, setDirection] = useState()

  useEffect(() => {
    // _onScroll()
    _format()
    // window.addEventListener("scroll", _onScroll)
    window.addEventListener("resize", _format)
    const token = PubSub.subscribe("ROUTE_UPDATE", () => {
      _format()
    })
    // if (window.innerWidth < 1080 && "ontouchstart" in window) setIsMobile(true)

    return () => {
      // window.removeEventListener("scroll", _onScroll)
      window.removeEventListener("resize", _format)
      PubSub.unsubscribe(token)
    }
  }, [])

  // let _prevScrollTop = 0
  // const _onScroll = () => {
  //   window.pageYOffset > _prevScrollTop
  //     ? setDirection("down")
  //     : setDirection("up")

  //   if (window.pageYOffset === 0) {
  //     setDirection("")
  //   }

  //   _prevScrollTop = window.pageYOffset
  // }
  const _format = () => {
    // console.log("format");
    // const ww = window.innerWidth;
    // const wh = window.innerHeight;
    document.documentElement.style.setProperty(
      "--app-height",
      window.innerHeight + "px"
    )

    const headerBounding = document
      .querySelector("header")
      .getBoundingClientRect()

    document.documentElement.style.setProperty(
      "--header-height",
      headerBounding.height + "px"
    )

    const colMd2Bounding = document
      .querySelector("header .col-md-2")
      .getBoundingClientRect()
    document.documentElement.style.setProperty(
      "--col-md-2--width",
      colMd2Bounding.width + "px"
    )
  }

  return (
    <WrapperContext.Provider value={{ settings, template }}>
      <FiltersWrapper>
        <CategoriesWrapper>
          <div id="page">
            <Header />
            <main>{children}</main>
            <Footer />
            {/* <Cursor color="black" size="20" /> */}
          </div>
        </CategoriesWrapper>
      </FiltersWrapper>
    </WrapperContext.Provider>
  )
}

export { WrapperContext, Layout }
