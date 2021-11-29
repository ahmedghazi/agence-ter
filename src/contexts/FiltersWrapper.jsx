import React, { createContext, useContext, useState, useReducer } from "react"

const FiltersContext = createContext([{}, () => {}])
const initialFiltersState = []

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload]
    case "REMOVE":
      return state.filter((item) => item !== action.payload)
    case "REMOVE_BY_TYPE":
      return state.filter((item) => item.type !== action.payload)
    case "REMOVE_ALL":
      return []
    default:
      throw new Error()
  }
}

export const FiltersWrapper = ({ children }) => {
  const [filters, dispatchFilter] = useReducer(reducer, initialFiltersState)
  // const [filter, dispatchFilter] = useState(initialFiltersState)
  // console.log("FiltersWrapper", filter)
  return (
    <FiltersContext.Provider value={{ filters, dispatchFilter }}>
      {children}
    </FiltersContext.Provider>
  )
}
export default function useFilters() {
  return useContext(FiltersContext)
}
