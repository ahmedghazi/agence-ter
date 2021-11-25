import React, { useEffect, useState } from "react"
import { graphql } from "gatsby"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { repositoryConfigs } from "../core/prismicPreviews"
import PubSub from "pubsub-js"
import SEO from "../components/seo"
import { FiltersWrapper } from "../contexts/FiltersWrapper"
import ProjectsFilter from "../components/ProjectsFilters"
// import ProjectCard from "../components/ProjectCard"
import ProjectsGridMasonry from "../components/ProjectsGridMasonry"
import ProjectsTable from "../components/ProjectsTable"

export const pageQuery = graphql`
  query Projects {
    prismicProjects {
      data {
        meta_title {
          text
        }
        meta_description {
          text
        }
        meta_image {
          url
        }
        title {
          text
        }
        projects_featured {
          offset
          marge_interne
          largeur
          item {
            document {
              ... on PrismicProject {
                uid
                type
                data {
                  ...projetCard
                }
              }
            }
          }
        }
      }
    }
  }
`

const PageProjects = ({ data }) => {
  // const tags = [{ title: "2020" }, { title: "2019" }];
  const { meta_title, meta_description, meta_image, projects_featured } =
    data.prismicProjects.data

  const [isTableView, setIsTableView] = useState(false)
  useEffect(() => {
    const tokenA = PubSub.subscribe("TABLE_TOGGLE", (e, d) => {
      setIsTableView(!isTableView)
    })
    const tokenB = PubSub.subscribe("TABLE_HIDE", (e, d) => {
      setIsTableView(false)
    })

    return () => {
      PubSub.unsubscribe(tokenA)
      PubSub.unsubscribe(tokenB)
    }
  }, [isTableView, setIsTableView])

  return (
    <div
      className="page-template page-projects p-xs pt-lg md:p-md md:pt-xl"
      style={
        {
          // background: "#F07E64",
        }
      }
    >
      <SEO
        pageTitle={meta_title.text}
        pageDescription={meta_description.text}
        pageImage={meta_image.url}
        template={`template-projects`}
        page={true}
      />

      <FiltersWrapper>
        <div className="header mb-lg">
          <div className="row">
            <div className="col-md-2 hidden-sm"></div>
            <div className="col-xs">
              <ProjectsFilter />
            </div>
          </div>
        </div>
        {isTableView && <ProjectsTable input={projects_featured} />}
        {!isTableView && <ProjectsGridMasonry input={projects_featured} />}
      </FiltersWrapper>
    </div>
  )
}

export default withPrismicPreview(PageProjects, repositoryConfigs)
