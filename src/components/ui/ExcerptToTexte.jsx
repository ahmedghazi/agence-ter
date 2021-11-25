import React, { useState } from "react"
import { RichText } from "prismic-reactjs"

const ExcerptToTexte = ({ excerpt, content, maxWords }) => {
  // const [excerpt, setExcerpt] = useState()
  const [collapsed, setCollapsed] = useState(true)

  const _truncate = () => {
    const explode = excerpt.split(" ")
    let string = explode.splice(0, maxWords).join(" ")
    string += "..."
    // console.log(explode)
    return string
    // const
  }

  return (
    <div className="excerpt-to-texte" onClick={() => setCollapsed(!collapsed)}>
      {collapsed ? (
        <p className="cursor-pointer">{_truncate()}</p>
      ) : (
        <RichText render={content} />
      )}
    </div>
  )
}

export default ExcerptToTexte
