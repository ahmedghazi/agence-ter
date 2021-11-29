import React, { useContext } from "react"
import { Link } from "gatsby"
import clsx from "clsx"
import loadable from "@loadable/component"
import { WrapperContext } from "./Layout"
import Menu from "./Menu"
// import Burger from "./ui/Burger"
import LogoSvg from "./LogoSvg"
import Social from "./ui/Social"
import LocaleSwitcher from "./ui/LocaleSwitcher"
// import ProjectsFilter from "./ProjectsFilters"
const ProjectsFilters = loadable(() => import("./ProjectsFilters"))

const Header = ({ direction }) => {
  const _WrapperContext = useContext(WrapperContext)
  const { settings, template } = _WrapperContext
  // console.log(template)
  return (
    <header
      className={clsx(
        "p-xs md:p-md fixed w-full font-bold text-sm md:text-lg",
        direction
      )}
    >
      <div className="row middle-xs">
        <div className="col-md-2 col-xs col-left">
          <Link to="/">
            <LogoSvg />
          </Link>
        </div>
        <div className="col-xs">
          <Menu />
        </div>
        <div className="col-md-3 hidden-sm col-right">
          <nav className="flex justify-end items-center font-light">
            <Social input={settings.data.links} />
            <Link to="/contacts" className="btn outline mx-sm">
              Contacts
            </Link>
            <LocaleSwitcher />
          </nav>
        </div>
      </div>
      {template === "template-projects" && (
        <div className="wrapper text-md py-sm">
          <div className="row">
            <div className="col-md-2 hidden-sm"></div>
            <div className="col-xs">
              <ProjectsFilters />
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
