import React, { useEffect, useState } from "react"
import { publish } from "pubsub-js"
import { _debounce, _localizeText } from "../core/utils"

const ProjectsSearch = () => {
  const [term, setTerm] = useState("")
  const _onSubmit = (e) => {
    e.preventDefault()
  }

  useEffect(
    _debounce(() => {
      // console.log(term)
      publish("PROJECTS_SEARCH", term)
    }),
    [term]
  )

  return (
    <div>
      <form action="" onSubmit={_onSubmit}>
        <input
          className="font-bold md:text-lg"
          type="text"
          name="s"
          id=""
          value={term}
          onChange={({ target }) => setTerm(target.value)}
          placeholder={_localizeText("recherche")}
        />
      </form>
      {/* <div className="results"></div> */}
    </div>
  )
}

export default ProjectsSearch
