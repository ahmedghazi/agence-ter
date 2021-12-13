import React, { useContext } from "react"
import { Link } from "gatsby"
import clsx from "clsx"

import { WrapperContext } from "./Layout"
import Menu from "./Menu"
// import Burger from "./ui/Burger"
import LogoSvg from "./LogoSvg"
import Social from "./ui/Social"
import LocaleSwitcher from "./ui/LocaleSwitcher"
// import ProjectsFilter from "./ProjectsFilters"

const Header = () => {
  const _WrapperContext = useContext(WrapperContext)
  const { settings, template } = _WrapperContext
  // console.log(template)
  return (
    <header
      className={clsx(
        "p-xs md:p-md fixed- w-full font-bold text-sm md:text-lg"
      )}
    >
      <div className="row middle-xs">
        <div className="col-md-2 col-xs col-left ">
          <div className="sm-only">
            <Link to="/">
              <LogoSvg />
            </Link>
          </div>
        </div>
        <div className="col-xs">
          <Menu />
        </div>
        <div className="col-md-3 hidden-sm col-right sm-only">
          <nav className="flex justify-end items-center font-light">
            <Social input={settings.data.links} />
            <Link to="/contacts" className="btn outline mx-sm">
              Contacts
            </Link>
            <LocaleSwitcher />
          </nav>
        </div>
      </div>

      <div className="md:fixed w-full p-xs md:p-md top-0 left-0 hidden-sm">
        <div className="row justify-between">
          <div className="col-md-2 col-xs col-left">
            <Link to="/">
              <LogoSvg />
            </Link>
          </div>
          <div className="col-md-3- col hidden-sm col-right">
            <nav className="flex justify-end items-center font-light">
              <Social input={settings.data.links} />
              <Link to="/contacts" className="btn outline mx-sm">
                Contacts
              </Link>
              <LocaleSwitcher />
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
