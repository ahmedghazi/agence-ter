import React, { useEffect, useRef, useContext } from "react"
import Isotope from "isotope-layout"
import imagesLoaded from "imagesloaded"
import PubSub from "pubsub-js"
import ProjectCard from "./ProjectCard"
import { FiltersContext } from "../contexts/FiltersWrapper"

const ProjectsGridMasonry = ({ input }) => {
  //infinite
  // console.log(MasonryLayout)
  const PER_PAGE = 10
  const backDropRef = useRef()
  const gridRef = useRef()
  const isoRef = useRef()
  const { filter } = useContext(FiltersContext)

  useEffect(() => {
    // const token = PubSub.subscribe("GRID_VIEW_COLOR", (e, color) => {
    //   console.log(color)
    //   backDropRef.current.style.backgroundColor = color
    // })

    const columnWidth = gridRef.current
      .querySelector(".card-s")
      .getBoundingClientRect().width

    isoRef.current = new Isotope(gridRef.current, {
      itemSelector: "article.card",
      // stagger: 30,
      percentPosition: true,
      masonry: {
        columnWidth: columnWidth,
      },
    })

    imagesLoaded(isoRef.current, () => {
      setTimeout(() => {
        isoRef.current.layout()
        gridRef.current
          .querySelectorAll(".card")
          .forEach((el) => el.classList.add("reveal"))
      }, 150)
    })

    // return () => PubSub.unsubscribe(token)
  }, [])

  useEffect(() => {
    if (isoRef.current) {
      const _filter = filter !== "" ? `.${filter}` : "*"
      isoRef.current.arrange({ filter: _filter })
    }
  }, [filter])

  return (
    <section className="grid-view min-h-screen  ">
      <div
        className="backdrop  fixed top-0 left-0 w-screen h-screen transition-all"
        style={{ backgroundColor: "#CCE6C7" }}
        ref={backDropRef}
      ></div>
      <div className="projects-grid-masonry" ref={gridRef}>
        {input.map((item, i) => (
          <ProjectCard key={i} input={item} />
        ))}
      </div>
    </section>
  )
}

export default ProjectsGridMasonry
