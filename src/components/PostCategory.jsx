import clsx from "clsx"
import React, { useEffect, useState } from "react"
import useCategories from "../contexts/CategoriesWrapper"
import { _localizeText } from "../core/utils"

const PostCategory = ({ input }) => {
  // const { category, dispatch } = useContext(CategoriesContext)
  const { category, dispatchCategory } = useCategories()
  const [active, setActive] = useState()

  useEffect(() => {
    if (active) dispatchCategory(input.uid)
    else dispatchCategory("")
  }, [active])

  return (
    <li className="">
      <button
        className={clsx(
          "outline pr-xs capitalize",
          active ? "is-active button-deletable" : ""
        )}
        onClick={() => setActive(!active)}
      >
        {_localizeText(input.uid)}
      </button>
    </li>
  )
}

export default PostCategory
