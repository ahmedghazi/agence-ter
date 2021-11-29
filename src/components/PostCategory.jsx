import clsx from "clsx"
import React, { useEffect, useState } from "react"
import useCategories from "../contexts/CategoriesWrapper"

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
        className={clsx("outline pr-xs", active ? "is-active" : "")}
        onClick={() => setActive(!active)}
      >
        {input.data.title.text}
      </button>
    </li>
  )
}

export default PostCategory
