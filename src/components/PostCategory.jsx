import clsx from "clsx"
import React, { useContext, useEffect, useState } from "react"
import { CategoriesContext } from "../contexts/CategoriesWrapper"

const PostCategory = ({ input }) => {
  const { category, dispatch } = useContext(CategoriesContext)
  const [active, setActive] = useState()
  // useEffect(() => {
  //   setActive(category === input.uid)
  // }, [category])

  useEffect(() => {
    if (active) dispatch(input.uid)
    else dispatch("")
  }, [active])
  //dispatch(input.uid)
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
