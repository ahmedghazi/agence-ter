import React, { useContext } from "react"
import { graphql } from "gatsby"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { repositoryConfigs } from "../core/prismicPreviews"
import SEO from "../components/seo"
import Post from "../components/Post"
// import { CategoriesWrapper } from "../contexts/CategoriesWrapper"
import PostCategories from "../components/PostCategories"
// import SummaryDetail from "../components/ui/SummaryDetail"

export const pageQuery = graphql`
  query NewsCategory($uid: String!) {
    # prismicNews {
    #   data {
    #     meta_title {
    #       text
    #     }
    #     meta_description {
    #       text
    #     }
    #     meta_image {
    #       url
    #     }
    #   }
    # }
    prismicCategory(uid: { eq: $uid }) {
      data {
        title {
          text
        }
      }
    }

    allPrismicPost(
      filter: { data: { category: { uid: { eq: $uid } } } }
      sort: { fields: first_publication_date }
    ) {
      nodes {
        data {
          title {
            text
          }
          title_en {
            text
          }
          texte_fr {
            richText
          }
          texte_en {
            richText
          }
          image {
            gatsbyImageData(width: 500, placeholder: BLURRED)
            url
            alt
          }
          category {
            document {
              ... on PrismicCategory {
                uid
                data {
                  title {
                    text
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
const NewsCategory = ({ data }) => {
  // const { meta_title, meta_description, meta_image } = data.prismicNews.data
  const { title } = data.prismicCategory.data
  const items = data.allPrismicPost.nodes
  // console.log(items)
  // const { categories } = useContext(CategoriesContext)

  return (
    <div className="page-template page-news px-xs md:px-md ">
      <SEO
        pageTitle={title.text}
        pageDescription={""}
        pageImage={""}
        template={`template-news bg-yellow`}
        page={true}
      />

      <div className="header-filters text-md py-sm md:py-md sticky top-0 md:mb-lg z-10">
        <div className="row">
          <div className="col-md-2 hidden-sm"></div>
          <div className="col-xs md:text-lg">
            <PostCategories />
          </div>
        </div>
      </div>

      <div className="row ">
        <div className="col-md-2 hidden-sm"></div>
        <div className="col-md-8 col-xs-12">
          {items.map((item, i) => (
            <Post key={i} input={item} />
          ))}
        </div>
        <div className="col-md-2 hidden-sm"></div>
      </div>
    </div>
  )
}

export default withPrismicPreview(NewsCategory, repositoryConfigs)
