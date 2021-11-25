import React, { createContext, useState } from "react"

const CategoriesContext = createContext()
const initialCategoriesState = ""

const CategoriesWrapper = ({ children }) => {
  const [category, dispatch] = useState(initialCategoriesState)

  return (
    <CategoriesContext.Provider value={{ category, dispatch }}>
      {children}
    </CategoriesContext.Provider>
  )
}

export { CategoriesContext, CategoriesWrapper }
