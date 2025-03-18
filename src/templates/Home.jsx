import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { repositoryConfigs } from "../core/prismicPreviews"
import SEO from "../components/seo"
// import Hero from "../components/ui/Hero"
import NewsMarquee from "../components/slices/NewsMarquee"
import Philosophie from "../components/slices/Philosophie"
import VideoPlayer from "../components/ui/VideoPlayer"
import CallToScroll from "../components/ui/CallToScroll"
import useDeviceDetect from "../hooks/useDeviceDetect"

export const query = graphql`
  query {
    prismicHome {
      _previewable
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

        image {
          # gatsbyImageData(width: 1500, placeholder: BLURRED)
          url
          # alt
        }
        video_desktop {
          url
        }
        video_mobile {
          url
        }
        body {
          ... on PrismicHomeDataBodyNews {
            slice_type
            primary {
              title {
                text
              }
            }
            items {
              item {
                document {
                  ... on PrismicPost {
                    uid
                    type
                    data {
                      title {
                        text
                      }
                      texte_fr {
                        text
                      }
                      texte_en {
                        text
                      }
                    }
                  }
                }
              }
            }
          }
          ... on PrismicHomeDataBodyPhilosophie {
            slice_type
            primary {
              title {
                text
              }
            }
            items {
              title {
                text
              }
              texte_fr {
                richText
                text
              }
              texte_en {
                richText
                text
              }
              image {
                gatsbyImageData(width: 1500, placeholder: BLURRED)
                alt
              }
            }
          }
        }
      }
    }
  }
`

const Home = ({ data }) => {
  const {
    meta_title,
    meta_description,
    meta_image,
    video_desktop,
    video_mobile,
    image,
    body,
  } = data.prismicHome.data

  const [visible, setVisible] = useState()
  const { isMobile } = useDeviceDetect()
  // const _WrapperContext = useContext(WrapperContext)
  // const { settings, template } = _WrapperContext
  // console.log(template)
  useEffect(() => {
    document.addEventListener("mousemove", _reveal)
    document.addEventListener("click", _reveal)

    const timer = setTimeout(() => {
      _reveal()
    }, 2000)

    return () => {
      document.removeEventListener("mousemove", _reveal)
      document.removeEventListener("click", _reveal)
      clearTimeout(timer)
    }
  }, [])

  const _reveal = () => {
    setVisible(true)
  }

  useEffect(() => {
    if (visible) {
      document.querySelector("header").classList.add("is-visible")
      // document.querySelector(".call-to-scroll").classList.add("is-visible")
    }
  }, [visible])

  const slices = body.map((slice, i) => {
    // console.log(slice.slice_type);
    switch (slice.slice_type) {
      case "news":
        return <NewsMarquee key={i} input={slice} />
      case "philosophie":
        return <Philosophie key={i} input={slice} />

      default:
        return null
    }
  })

  return (
    <div>
      <SEO
        pageTitle={meta_title.text}
        pageDescription={meta_description.text}
        pageImage={meta_image.url}
        template={`template-home`}
        page={false}
      />
      {/* <Hero input={image} /> */}
      <div className="w-screen h-screen">
        <VideoPlayer
          input={{
            url: isMobile ? video_mobile.url : video_desktop.url,
            poster: image.url,
          }}
        />
        {/*<CallToScroll />*/}
      </div>
      {slices}
    </div>
  )
}

export default withPrismicPreview(Home, repositoryConfigs)
