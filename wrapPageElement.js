/* eslint react/prop-types: 0, react/display-name: 0 */
import React from "react"
import Helmet from "react-helmet"
// import { PreviewStoreProvider } from "gatsby-source-prismic";
import { PrismicPreviewProvider } from "gatsby-plugin-prismic-previews"
import { Layout } from "./src/components/Layout"
import { LocaleWrapper } from "./src/contexts/LocaleWrapper"

// import { withPrefix } from 'gatsby'
// const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>

// export default wrapPageElement

const _wrapRootElement = ({ element }) => {
  return (
    <PrismicPreviewProvider>
      <Helmet>
        <script src="https://unpkg.com/pace-js@1.0.2/pace.min.js"></script>
      </Helmet>
      {element}
    </PrismicPreviewProvider>
  )
}

const _wrapPageElement = ({ element, props }) => {
  // console.log(Layout)
  // return element;
  return (
    <LocaleWrapper>
      <Layout {...props}>{element}</Layout>
    </LocaleWrapper>
  )
}

const _onClientEntry = () => {
  //console.log("We've started!")
  // callAnalyticsAPI()
  const isTouch = "ontouchstart" in window ? true : false

  if (isTouch) {
    document.documentElement.classList.add("touch")
  } else {
    document.documentElement.classList.add("no-touch")
  }
}

export { _wrapRootElement, _wrapPageElement, _onClientEntry }
