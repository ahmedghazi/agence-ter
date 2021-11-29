import React, { createContext, useContext, useState } from "react"

const FiltersContext = createContext()
const initialFiltersState = ""

export const FiltersWrapper = ({ children }) => {
  const [filter, dispatchFilter] = useState(initialFiltersState)
  // console.log("FiltersWrapper", filter)
  return (
    <FiltersContext.Provider value={{ filter, dispatchFilter }}>
      {children}
    </FiltersContext.Provider>
  )
}
export default function useFilters() {
  return useContext(FiltersContext)
}
