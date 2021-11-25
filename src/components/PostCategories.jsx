import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import PostCategory from "./PostCategory"

const query = graphql`
  query {
    allPrismicCategory {
      nodes {
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

const PostCategories = () => {
  const { allPrismicCategory } = useStaticQuery(query)

  // console.log(allPrismicCategory)
  return (
    <ul className="flex mb-lg">
      {allPrismicCategory.nodes.map((li, i) => (
        <PostCategory key={i} input={li} />
      ))}
    </ul>
  )
}

export default PostCategories
