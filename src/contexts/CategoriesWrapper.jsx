import React, { createContext, useState, useContext } from "react"

const CategoriesContext = createContext()
const initialCategoriesState = ""

export const CategoriesWrapper = ({ children }) => {
  const [category, dispatchCategory] = useState(initialCategoriesState)

  return (
    <CategoriesContext.Provider value={{ category, dispatchCategory }}>
      {children}
    </CategoriesContext.Provider>
  )
}
export default function useCategories() {
  return useContext(CategoriesContext)
}
// export { CategoriesContext, CategoriesWrapper }
