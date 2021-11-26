import React, { createContext, useState } from "react"

const FiltersContext = createContext()
const initialFiltersState = ""

const FiltersWrapper = ({ children }) => {
  const [filter, dispatch] = useState(initialFiltersState)
  console.log(filter)
  return (
    <FiltersContext.Provider value={{ filter, dispatch }}>
      {children}
    </FiltersContext.Provider>
  )
}

export { FiltersContext, FiltersWrapper }
