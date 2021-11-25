import React, { useEffect, createContext } from "react"
import { useState } from "react"

const LocaleContext = createContext()

const LocaleWrapper = ({ children }) => {
  const [localeCtx, dispatch] = useState("fr-fr")
  // console.log(localeCtx)

  useEffect(() => {
    const userLang = _detectUserLang()
    // console.log("userLang:", userLang)
    dispatch(userLang)
  }, [])

  const _detectUserLang = () => {
    const userLang = navigator.language || navigator.userLanguage
    // console.log(userLang)
    return userLang.toLowerCase().indexOf("fr") === -1 ? "en-gb" : "fr-fr"
  }

  return (
    <LocaleContext.Provider value={{ localeCtx, dispatch }}>
      {children}
    </LocaleContext.Provider>
  )
}

// export default LocaleWrapper;
export { LocaleContext, LocaleWrapper }
