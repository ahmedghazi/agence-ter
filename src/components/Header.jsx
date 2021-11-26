import React, { useContext } from "react"
import { Link } from "gatsby"
import clsx from "clsx"
import { WrapperContext } from "./Layout"
import Menu from "./Menu"
// import Burger from "./ui/Burger"
import LogoSvg from "./LogoSvg"
import Social from "./ui/Social"
import LocaleSwitcher from "./ui/LocaleSwitcher"

const Header = ({ direction }) => {
  const _WrapperContext = useContext(WrapperContext)
  const { settings } = _WrapperContext
  // console.log(settings)
  return (
    <header
      className={clsx(
        "p-xs md:p-md fixed w-full font-bold text-sm md:text-lg",
        direction
      )}
    >
      <div className="row middle-xs">
        <div className="col-md-2 col-xs">
          <Link to="/">
            <LogoSvg />
          </Link>
        </div>
        <div className="col-xs">
          <Menu />
        </div>
        <div className="col-md-3 hidden-sm">
          <div className="flex justify-end items-center font-light">
            <Social input={settings.data.links} />
            <Link to="/contacts" className="btn outline mx-sm">
              Contacts
            </Link>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
      {/* <Burger /> */}
    </header>
  )
}

export default Header
