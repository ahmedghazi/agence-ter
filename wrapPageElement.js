/* eslint react/prop-types: 0, react/display-name: 0 */
import React from "react"
import Helmet from "react-helmet"
// import { PreviewStoreProvider } from "gatsby-source-prismic";
import {
  PrismicPreviewProvider,
  componentResolverFromMap,
} from "gatsby-plugin-prismic-previews"
import PubSub from "pubsub-js"
import { Layout } from "./src/components/Layout"
import { LocaleWrapper } from "./src/contexts/LocaleWrapper"
import { linkResolver } from "./src/core/utils"
import TemplateHome from "./src/templates/Home"
import templateAgency from "./src/templates/Agency"
import templateAssociate from "./src/templates/Associate"
import templateProjects from "./src/templates/Projects"
import templateProject from "./src/templates/Project"
import templateNews from "./src/templates/News"
import templateContact from "./src/templates/Contact"
import templatePageDefault from "./src/templates/PageDefault"
import templateNewsCategory from "./src/templates/NewsCategory"

// import { withPrefix } from 'gatsby'
// const wrapPageElement = ({ element, props }) => <Layout {...props}>{element}</Layout>

// export default wrapPageElement

const _wrapRootElement = ({ element }) => {
  return (
    <>
      <Helmet>
        <script src="https://unpkg.com/pace-js@1.0.2/pace.min.js"></script>
      </Helmet>
      <PrismicPreviewProvider
        repositoryConfigs={[
          {
            repositoryName: process.env.GATSBY_PRIMIC_REPO_NAME,
            linkResolver: linkResolver,
            componentResolver: componentResolverFromMap({
              home: TemplateHome,
              agency: templateAgency,
              associate: templateAssociate,
              projects: templateProjects,
              project: templateProject,
              news: templateNews,
              contact: templateContact,
              page: templatePageDefault,
              category: templateNewsCategory,
            }),
          },
        ]}
      >
        {element}
      </PrismicPreviewProvider>
    </>
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

const _onRouteUpdate = ({ location }) => {
  //console.log('new pathname', location.pathname)
  PubSub.publish("ROUTE_UPDATE")
}

export { _wrapRootElement, _wrapPageElement, _onClientEntry, _onRouteUpdate }
