const PrismicDOM = require("prismic-dom")
const Elements = PrismicDOM.RichText.Elements
const linkResolver = require("./linkResolver")

module.exports = (type, element) => {
  // const htmlSerializer = function (type, element, content, children) {
  // console.log(type)
  switch (type) {
    case "hyperlink":
      console.log(element.data)
      const target = element.data.target
        ? `target="${element.data.target}" rel="noopener"`
        : ""
      const linkUrl = PrismicDOM.Link.url(element.data, linkResolver)
      return null
      return `<a ${target} href="${linkUrl}">${children.join("")}</a>`

    // case "paragraph":
    //   const paragraph
    //break
    default:
      return null
  }
}
