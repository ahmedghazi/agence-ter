import React, { useContext } from "react"
import { Link } from "gatsby"
import { WrapperContext } from "./Layout"
import ScrollToTop from "./ui/ScrollToTop"
import Social from "./ui/Social"

const Footer = () => {
  const _WrapperContext = useContext(WrapperContext)
  const { settings } = _WrapperContext
  return (
    <footer className="p-xs md:p-md">
      <div className="flex justify-between">
        <div className="left flex">
          <Social input={settings.data.links} />
          <Link to="/contacts" className="btn outline mx-sm">
            Contacts
          </Link>
          <Link to="/mentions-legales" className="">
            Mentions légales
          </Link>
        </div>
        <ScrollToTop />
      </div>
      {/* <div className='flex'>
      <div className='col'>
        <div className='copyright'>© {new Date().getFullYear()} </div>
      </div>
      <div className='col'>
        <p>
          Made with ❤ by the{" "}
          <a href='ahmedghazi.com' target='_blank'>
            a_e_a_i_
          </a>
        </p>
      </div>
    </div> */}
    </footer>
  )
}

export default Footer
