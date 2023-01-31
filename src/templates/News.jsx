import React, { useContext, useEffect, useState } from "react"
import { graphql } from "gatsby"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { repositoryConfigs } from "../core/prismicPreviews"
import SEO from "../components/seo"
import Post from "../components/Post"
// import { CategoriesWrapper } from "../contexts/CategoriesWrapper"
import PostCategories from "../components/PostCategories"
import SummaryDetail from "../components/ui/SummaryDetail"
import Modal from "../components/ui/Modal"
import { subscribe, unsubscribe } from "pubsub-js"
import Slider from "../components/ui/slick-slider"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

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
                  slidershow {
                    image {
                      gatsbyImageData(width: 1500, placeholder: BLURRED)
                      url
                      alt
                    }
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
  const { meta_title, meta_description, meta_image, items } =
    data.prismicNews.data

  const [modalOpen, setModalOpen] = useState(false)
  const [slides, setSlides] = useState([])
  useEffect(() => {
    const token = subscribe("SLIDESHOW", (e, d) => {
      console.log(d)
      setSlides(d)
      setModalOpen(true)
    })

    return () => unsubscribe(token)
  }, [])

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
            {/* <SummaryDetail
              summary={"Filtre"}
              detail={<PostCategories />}
            ></SummaryDetail> */}
            <PostCategories />
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

      <Modal open={modalOpen} setOpen={setModalOpen}>
        {slides.length > 0 && (
          <div className="slideshow">
            <Slider
              settingsOverride={{
                autoplaySpeed: 5000,
                autoplay: false,
                speed: 600,
              }}
            >
              {slides.map((item, i) => (
                <div className="slide w-screen- h-screen-" key={i}>
                  <GatsbyImage
                    image={getImage(item.image)}
                    alt={item.image.alt || ""}
                    className="w-full h-screen"
                    objectFit="contain"
                  />
                </div>
              ))}
            </Slider>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default withPrismicPreview(News, repositoryConfigs)
