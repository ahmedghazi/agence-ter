import React, { useContext } from "react"
import { LocaleContext } from "../../contexts/LocaleWrapper"
const locales = require("../../../config/i18n")

const LocaleSwitcher = () => {
  const { localeCtx, dispatch } = useContext(LocaleContext)
  // const { localeCtx, dispatch } = _LocaleContext
  // console.log(_LocaleContext)

  const renderLanguages = () => {
    const alternateLang = Object.values(locales).filter(
      (item) => item.locale !== localeCtx
    )
    return alternateLang.map((item, i) => (
      <li key={`locale-${i.toString()}`} className={``}>
        <button onClick={() => dispatch(item.locale)}>{item.label}</button>
      </li>
    ))
  }

  return <ul className="locale-switcher ">{renderLanguages()}</ul>
}

export default LocaleSwitcher
