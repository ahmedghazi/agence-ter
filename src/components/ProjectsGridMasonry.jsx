import React, { useEffect, useRef, useState } from "react"
import Isotope from "isotope-layout"
import imagesLoaded from "imagesloaded"
// import PubSub from "pubsub-js"
import ProjectCard from "./ProjectCard"
import useFilters from "../contexts/FiltersWrapper"
// import { FiltersContext } from "../contexts/FiltersWrapper"
// import { useScroll } from "../hooks/useScroll"
import { useInView } from "react-intersection-observer"
import loadable from "@loadable/component"
import { subscribe, unsubscribe } from "pubsub-js"
const ProjectsFilters = loadable(() => import("./ProjectsFilters"))

const ProjectsGridMasonry = ({ input }) => {
  // console.log(input)
  let _isotopeRendered = false
  // let _isotopeFilterRendered = false
  const backDropRef = useRef()
  const gridRef = useRef()
  const isoRef = useRef()
  const { filters } = useFilters()

  const _renderIsotope = () => {
    if (_isotopeRendered) return

    const cardS = gridRef.current.querySelector(".card-s")
    const columnWidth = cardS ? cardS.getBoundingClientRect().width : 150

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
        // _filterGrid()
        setTimeout(() => {
          gridRef.current
            .querySelectorAll(".card")
            .forEach((el) => el.classList.add("reveal"))
          _isotopeRendered = true
        }, 250)
      }, 250)
    })
  }

  // useEffect(async () => {
  //   _renderIsotope()
  // }, [])
  useEffect(() => {
    _renderIsotope()

    /**
     * Handle Search result
     */
    const token = subscribe("PROJECTS_SEARCH", (e, term) => {
      isoRef.current.arrange({
        filter: (item) => {
          return item.textContent.match(new RegExp(term, "gi"))
        },
      })
    })

    return () => unsubscribe(token)
  }, [])

  // useEffect(async () => {
  //   if (isoRef.current) {
  //     _filterGrid()
  //   }
  // }, [filters])
  useEffect(() => {
    if (isoRef.current) {
      _filterGrid()
    }
  }, [filters])

  const _filterGrid = () => {
    const f = filters.length ? _renderFilterClassNames() : "*"
    // console.log(f)
    isoRef.current.arrange({ filter: f })
  }

  const _renderFilterClassNames = () =>
    filters
      .map((el) => `.${el.uid}`)
      .toString()
      .replace(new RegExp(",", "g"), "")

  const headerFiltersRef = useRef()
  const { ref, inView, entry } = useInView({
    /* Optional options */
    threshold: 0,
  })

  useEffect(() => {
    if (!headerFiltersRef.current) return
    if (inView) headerFiltersRef.current.classList.add("slide-top")
    else headerFiltersRef.current.classList.remove("slide-top")
  }, [inView])

  // const data = filters.length > 0 ? input : inputPaged

  // console.log(inputPaged)
  return (
    <section className="grid-view min-h-screen  ">
      <div
        className="backdrop fixed top-0 left-0 right-0 bottom-0 w-screen h-screen h-app transition-all z-0"
        style={{ backgroundColor: "#CCE6C7" }}
        ref={backDropRef}
      ></div>

      <>
        <div
          className="header-filters text-md py-sm md:py-md sticky- top-0 md:mb-lg z-10"
          ref={ref}
        >
          <div className="row">
            <div className="col-md-2 hidden-sm"></div>
            <div className="col-xs">
              <ProjectsFilters />
            </div>
          </div>
        </div>
        <div
          className="header-filters--fixed text-md px-xs py-sm md:p-md fixed top-0 left-0 w-full transition-transform z-10"
          ref={headerFiltersRef}
        >
          <div className="row">
            <div className="col-md-2 hidden-sm"></div>
            <div className="col-xs">
              <ProjectsFilters />
            </div>
          </div>
        </div>
      </>

      <div className="projects-grid-masonry" ref={gridRef}>
        {input.map((item, i) => (
          <ProjectCard key={i} input={item} />
        ))}
        {/* {inputPaged} */}
      </div>
    </section>
  )
}

export default ProjectsGridMasonry
