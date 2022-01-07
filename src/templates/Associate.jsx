import React, { useContext } from "react"
import { graphql, Link } from "gatsby"
import { withPrismicPreview } from "gatsby-plugin-prismic-previews"
import { repositoryConfigs } from "../core/prismicPreviews"
import clsx from "clsx"
// import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { RichText } from "prismic-reactjs"
import { LocaleContext } from "../contexts/LocaleWrapper"
import SEO from "../components/seo"
import { linkResolver } from "../core/utils"

export const pageQuery = graphql`
  query AssociateBySlug($uid: String!) {
    prismicAssociate(uid: { eq: $uid }) {
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
        texte_fr {
          raw
        }
        texte_en {
          raw
        }
        image {
          url
        }
      }
    }
    associates: allPrismicAssociate(filter: { uid: { ne: $uid } }) {
      nodes {
        type
        uid
        data {
          title {
            text
          }
        }
      }
    }
  }
`

const Associate = ({ data }) => {
  const {
    meta_title,
    meta_description,
    meta_image,
    title,
    texte_fr,
    texte_en,

    image,
  } = data.prismicAssociate.data

  const associates = data.associates.nodes

  const { localeCtx } = useContext(LocaleContext)

  return (
    <div
      className={clsx(
        "page-template page-associate p-xs pt-lg md:p-md md:pt-xl "
      )}
    >
      <SEO
        pageTitle={meta_title.text}
        pageDescription={meta_description.text}
        pageImage={meta_image.url}
        template={`template-associate`}
        page={true}
      />

      <div
        className="bg p-sm md:p-0 md:w-screen md:h-screen md:fixed top-0 left-0 mb-xs md:mb-0"
        style={{
          backgroundImage: `url(${image.url})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "right bottom",
        }}
      ></div>

      <div className="row ">
        <div className="col-md-2 hidden-sm"></div>
        <div className="col-md-4 col-xs-12">
          <div className="header mb-md">
            <ul className="flex items-baseline">
              <li className="mr-sm md:mr-md">
                <h1 className="font-bold">{title.text}</h1>
              </li>
              {associates.map((li, i) => (
                <li key={i} className="mr-sm md:mr-md font-bold text-md">
                  <Link to={linkResolver(li)}>{li.data.title.text}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={clsx("texte mb-sm")}>
            <RichText
              render={localeCtx === "fr-fr" ? texte_fr.raw : texte_en.raw}
            />
          </div>
          <div className={clsx("texte", "text-gray")}>
            <RichText
              render={localeCtx === "en-gb" ? texte_en.raw : texte_fr.raw}
            />
          </div>
        </div>
        <div className="col-xs hidden-sm"></div>
      </div>
    </div>
  )
}

export default withPrismicPreview(Associate, repositoryConfigs)
