import React, { useContext } from "react"
import { graphql } from "gatsby"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { repositoryConfigs } from "../core/prismicPreviews"
import SEO from "../components/seo"
import Post from "../components/Post"
import { CategoriesWrapper } from "../contexts/CategoriesWrapper"
import PostCategories from "../components/PostCategories"

export const pageQuery = graphql`
  query {
    prismicNews {
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
        posts {
          item {
            document {
              ... on PrismicPost {
                data {
                  title {
                    text
                  }
                  texte_fr {
                    raw
                  }
                  texte_en {
                    raw
                  }
                  image {
                    gatsbyImageData(width: 1500, placeholder: BLURRED)
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
        }
      }
    }
  }
`
const News = ({ data }) => {
  const { meta_title, meta_description, meta_image, posts } =
    data.prismicNews.data
  // const { categories } = useContext(CategoriesContext)

  return (
    <div className="page-template page-news px-xs md:px-md ">
      <SEO
        pageTitle={meta_title.text}
        pageDescription={meta_description.text}
        pageImage={meta_image.url}
        template={`template-news bg-yellow`}
        page={true}
      />

      <div className="header-filters text-md py-sm md:py-md sticky top-0 md:mb-lg z-10">
        <div className="row">
          <div className="col-md-2 hidden-sm"></div>
          <div className="col-xs">
            <PostCategories />
          </div>
        </div>
      </div>

      <div className="row ">
        <div className="col-md-2 hidden-sm"></div>
        <div className="col-md-8 col-xs-12">
          {posts.map(({ item }, i) => (
            <Post key={i} input={item.document} />
          ))}
        </div>
        <div className="col-md-2 hidden-sm"></div>
      </div>
    </div>
  )
}

export default withPrismicPreview(News, repositoryConfigs)
