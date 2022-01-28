import React, { createContext, useState, useContext } from "react"

const TeamContext = createContext()
const initialTeamState = ""

export const TeamWrapper = ({ children }) => {
  const [location, dispatchLocation] = useState(initialTeamState)

  return (
    <TeamContext.Provider value={{ location, dispatchLocation }}>
      {children}
    </TeamContext.Provider>
  )
}
export default function useTeam() {
  return useContext(TeamContext)
}
// export { TeamLocationContext, TeamLocationWrapper }
