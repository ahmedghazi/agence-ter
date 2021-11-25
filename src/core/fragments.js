import { graphql } from "gatsby"

//https://github.com/gatsbyjs/gatsby/blob/26582d31ab14f7bac6d5738e4245ceca2e6d411d/packages/gatsby-transformer-sharp/src/fragments.js#L6

export const query = graphql`
  fragment settings on PrismicSettings {
    data {
      title {
        text
      }
      description {
        text
      }
      image {
        url
      }
      links {
        url {
          url
        }
        label {
          text
        }
      }
    }
  }

  fragment projetCard on PrismicProjectDataType {
    title {
      text
    }
    image {
      gatsbyImageData(width: 800, placeholder: BLURRED)
      url
      alt
    }
    pictogramme {
      url
    }
    localisation {
      document {
        ... on PrismicTagLocalisation {
          uid
          data {
            title {
              text
            }
          }
        }
      }
    }
    theme {
      document {
        ... on PrismicTagTheme {
          uid
          data {
            title {
              text
            }
          }
        }
      }
    }
    year {
      document {
        ... on PrismicTagYear {
          uid
          data {
            title {
              text
            }
          }
        }
      }
    }
    superficie
    phase
  }

  fragment project on PrismicProjectDataType {
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
    texte_fr {
      raw
    }
    texte_en {
      raw
    }
    localisation {
      document {
        ... on PrismicTagLocalisation {
          id
          data {
            title {
              text
            }
          }
        }
      }
    }
    theme {
      document {
        ... on PrismicTagTheme {
          id
          data {
            title {
              text
            }
          }
        }
      }
    }
    year {
      document {
        ... on PrismicTagYear {
          id
          data {
            title {
              text
            }
          }
        }
      }
    }
    # image {
    #   gatsbyImageData(width: 1440, placeholder: BLURRED)
    #   url
    #   alt
    # }
    images {
      image {
        gatsbyImageData(width: 1440, placeholder: BLURRED)
        url
        alt
      }
    }
  }

  fragment sharp on PrismicImageType {
    gatsbyImageData(width: 800, placeholder: BLURRED)
    url
    alt
    # url
    # alt
    # dimensions {
    #   width
    #   height
    # }
    # fluid(
    #   maxWidth: 1920
    #   imgixParams: { q: 80 }
    #   srcSetBreakpoints: [900, 1440, 1920]
    # ) {
    #   ...GatsbyPrismicImageFluid_noBase64
    #   # ...GatsbyImageSharpFluid_withWebp
    #   # ...GatsbyPrismicImageFluid_withWebp
    # }
  }
  fragment sharpNoB64 on PrismicImageType {
    url
    alt
    fluid(
      maxWidth: 1920
      imgixParams: { q: 80 }
      srcSetBreakpoints: [900, 1440, 1920]
    ) {
      ...GatsbyPrismicImageFluid_noBase64
    }
  }
`
