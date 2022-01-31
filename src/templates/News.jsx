import React, { useContext } from "react"
import { graphql } from "gatsby"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { repositoryConfigs } from "../core/prismicPreviews"
import SEO from "../components/seo"
import Post from "../components/Post"
// import { CategoriesWrapper } from "../contexts/CategoriesWrapper"
import PostCategories from "../components/PostCategories"
import SummaryDetail from "../components/ui/SummaryDetail"

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
        items {
          item {
            document {
              ... on PrismicPost {
                id
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
        }
      }
    }
    allPrismicPost(sort: { fields: first_publication_date }) {
      nodes {
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
const News = ({ data }) => {
  const { meta_title, meta_description, meta_image, items } =
    data.prismicNews.data
  // const posts = data.allPrismicPost.nodes
  // console.log(items)
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
          <div className="col-xs md:text-lg">
            <SummaryDetail
              summary={"Filtre"}
              detail={<PostCategories />}
            ></SummaryDetail>
          </div>
        </div>
      </div>

      <div className="row ">
        <div className="col-md-2 hidden-sm"></div>
        <div className="col-md-8 col-xs-12">
          {items.map(({ item }, i) => (
            <Post key={i} input={item.document} />
            // <pre key={i}>{JSON.stringify(item)}</pre>
          ))}
        </div>
        <div className="col-md-2 hidden-sm"></div>
      </div>
    </div>
  )
}

export default withPrismicPreview(News, repositoryConfigs)
