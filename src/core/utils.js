import { useContext } from "react"
import { LocaleContext } from "../contexts/LocaleWrapper"
import locales from "../../config/i18n"

export function fileNameByUrl(url) {
  const decoded = decodeURIComponent(url)
  return decoded.substring(decoded.lastIndexOf("/") + 1)
}

export const _getLocale = () => {
  const { localeCtx } = useContext(LocaleContext)
  return localeCtx || "fr"
}
/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
export function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function randomID(length) {
  var result = ""
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export const linkResolver = (doc) => {
  // if (doc.data.home_page) {
  //   return "/"
  // }
  // console.log(doc)
  switch (doc.type) {
    case "home":
      return `/`
    case "project":
      return `/project/${doc.uid}`
    case "associate":
      return `/associate/${doc.uid}`
    case "category":
      return `/category/${doc.uid}`

    default:
      return `/${doc.uid}`
  }
}

export const _localizeText = (text) => {
  const locale = _getLocale()
  return locales[locale] && locales[locale][text] ? locales[locale][text] : text
}

export const _localizeTitle = (data) => {
  const locale = _getLocale()
  if (!data) return ""
  // console.log(locale)
  // console.table(data)
  if (locale === "en-gb") {
    return data.title_en && data.title_en.text
      ? data.title_en.text
      : data.title.text
  } else {
    return data.title.text
  }
  // return field && field[locale] ? field[locale] : field["en"]
}
// export const _fixYears = (nodes) => {
//   return nodes.map((el) => ({
//     uid: `tag_year-${el.uid}`,
//     type: "tag_year",
//     data: {
//       title: {
//         text: el.data.title.text,
//       },
//     },
//   }))
// }

// debounce so filtering doesn't happen every millisecond
export const _debounce = (fn, threshold) => {
  var timeout
  threshold = threshold || 100
  return function debounced() {
    clearTimeout(timeout)
    var args = arguments
    var _this = this
    function delayed() {
      fn.apply(_this, args)
    }
    timeout = setTimeout(delayed, threshold)
  }
}
