import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import PostCategory from "./PostCategory"

const query = graphql`
  query {
    allPrismicCategory(sort: { fields: data___order }) {
      nodes {
        uid
        type
        data {
          title {
            text
          }
        }
      }
    }
  }
`

const PostCategories = () => {
  const { allPrismicCategory } = useStaticQuery(query)

  // console.log(allPrismicCategory)
  return (
    <ul className="flex md:mb-lg ">
      {allPrismicCategory.nodes.map((li, i) => (
        <PostCategory key={i} input={li} />
      ))}
    </ul>
  )
}

export default PostCategories
