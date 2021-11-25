import React, { useContext } from "react"
import { WrapperContext } from "./Layout"
import Social from "./ui/Social"

const Footer = () => {
  const _WrapperContext = useContext(WrapperContext)
  const { settings } = _WrapperContext
  return (
    <footer className="p-xs md:p-md">
      <Social input={settings.data.links} />
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
