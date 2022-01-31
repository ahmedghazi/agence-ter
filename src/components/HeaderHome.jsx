import React, { useContext } from "react"
import { Link } from "gatsby"
import clsx from "clsx"

import { WrapperContext } from "./Layout"
import Menu from "./Menu"
// import Burger from "./ui/Burger"
import LogoSvg from "./LogoSvg"
import Social from "./ui/Social"
import LocaleSwitcher from "./ui/LocaleSwitcher"
import { useEffect } from "react"
import { useState } from "react"
// import ProjectsFilter from "./ProjectsFilters"

const HeaderHome = () => {
  // const [visible, setVisible] = useState()
  // // const _WrapperContext = useContext(WrapperContext)
  // // const { settings, template } = _WrapperContext
  // // console.log(template)
  // useEffect(() => {
  //   document.addEventListener("mousemove", _reveal)
  //   document.addEventListener("click", _reveal)

  //   const timer = setTimeout(() => {
  //     _reveal()
  //   }, 2000)

  //   return () => {
  //     document.removeEventListener("mousemove", _reveal)
  //     document.removeEventListener("click", _reveal)
  //     clearTimeout(timer)
  //   }
  // }, [])

  // const _reveal = () => {
  //   setVisible(true)
  // }

  return (
    <header
      className={clsx(
        "p-xs md:p-md absolute w-full h-screen font-bold text-sm md:text-lg z-40"
        // visible ? "is-visible" : ""
      )}
    >
      <div className="absolute">
        <div className="row">
          <div className="col-md-2"></div>
        </div>
      </div>
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <Link to="/" className="site-name">
            <LogoSvg />
          </Link>
          <Menu />
        </div>
      </div>
    </header>
  )
}

export default HeaderHome
