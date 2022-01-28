import React, { useEffect, useState } from "react"
import clsx from "clsx"
import useTeam from "../../contexts/TeamWrapper"

const TeamFilter = ({ input }) => {
  const [active, setActive] = useState()
  const { location, dispatchLocation } = useTeam()
  // console.log(location)
  useEffect(() => {
    if (active) dispatchLocation(input)
    else dispatchLocation("")
  }, [active])

  return (
    <li className="">
      <button
        // onClick={() => setFiltre(filtre ? "" : input)}
        onClick={() => setActive(!active)}
        className={clsx(
          "cursor-pointer pr-xs hover:font-bold ",
          active ? "is-active button-deletable" : ""
        )}
      >
        {input}
      </button>
    </li>
  )
}

const TeamFilters = ({ input }) => {
  // const [filtre, setFiltre] = useState()

  const bureaux = input.items.map((el) => el.bureau)
  const bureauxUniq = bureaux.filter((value, index, self) => {
    return self.indexOf(value) === index
  })

  return (
    <ul className="team-filtres flex">
      {bureauxUniq.map((item, i) => (
        <TeamFilter input={item} key={i} />
      ))}
    </ul>
  )
}

export default TeamFilters
