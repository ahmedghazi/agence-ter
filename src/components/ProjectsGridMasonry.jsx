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
const ProjectsFilters = loadable(() => import("./ProjectsFilters"))

const ProjectsGridMasonry = ({ input }) => {
  // console.log(input)
  let _isotopeRendered = false
  // let _isotopeFilterRendered = false
  const backDropRef = useRef()
  const gridRef = useRef()
  const isoRef = useRef()
  const { filters } = useFilters()
  // console.log(input.length)
  // const [page, setPage] = useState(0)
  // const PER_PAGE = 10
  // const MAX_PAGE = Math.floor(input.length / PER_PAGE)
  // const [inputPaged, setInputPaged] = useState([])
  // const [inputAll, setInputPaged] = useState([])
  // const [hasMore, setHasMore] = useState()
  // const { isBottom } = useScroll()
  // let _isAppending = false

  // console.log(inputPaged)

  // const getNextCards = (portion) =>
  //   portion.map((item, i) => (
  //     <ProjectCard
  //       key={`${item.item.document.uid}-${Math.floor(Math.random() * 1000)}`}
  //       input={item}
  //     />
  //   ))

  // //if is at bottom and has more content, set next page
  // useEffect(() => {
  //   if (filters.length > 0) return
  //   if (isBottom && hasMore) setPage(page + 1)
  // }, [isBottom, hasMore])

  // //on page change pull new content
  // useEffect(() => {
  //   console.log(filters)
  //   const start = page * PER_PAGE
  //   const end = start + PER_PAGE
  //   const nextPageContent = input.slice(start, end)
  //   // const unique = inputPaged.filter()
  //   // console.log(nextPageContent)
  //   const items = getNextCards(nextPageContent)
  //   setInputPaged((inputPaged) => [...inputPaged, ...items])
  //   // gridRef.current.append(items)

  //   if (isoRef.current) {
  //     isoRef.current.appended(items)
  //     isoRef.current.layout()
  //   } else {
  //   }
  //   // console.log(filters)
  //   // setInputPaged((inputPaged) => [...inputPaged, ...nextPageContent])

  //   setHasMore(page < MAX_PAGE)
  // }, [page])

  // //new content added, render it
  // useEffect(() => {
  //   // console.log(inputPaged)
  //   if (!inputPaged.length) return

  //   if (!_isotopeRendered) {
  //     _renderIsotope()
  //   } else {
  //     isoRef.current.layout()
  //   }
  //   _isAppending = false
  // }, [inputPaged])

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
        _filterGrid()
        gridRef.current
          .querySelectorAll(".card")
          .forEach((el) => el.classList.add("reveal"))
        _isotopeRendered = true
      }, 250)
    })
  }

  useEffect(async () => {
    _renderIsotope()
  }, [])

  useEffect(async () => {
    if (isoRef.current) {
      // inputPaged = _filterGrid()
      // const remaining = await _loadRemainingCards()
      _filterGrid()
      // _renderIsotope()
    }
  }, [filters])

  // const _loadRemainingCards = () => {
  //   if (_isotopeFilterRendered) return "already done"
  //   const start = page * PER_PAGE
  //   const end = input.length
  //   const nextPageContent = input.slice(start, end)
  //   // console.log(nextPageContent)
  //   const items = getNextCards(nextPageContent)
  //   setInputPaged((inputPaged) => [...inputPaged, ...items])
  //   // gridRef.current.append(items)

  //   if (isoRef.current) {
  //     isoRef.current.appended(items)
  //     isoRef.current.layout()
  //   }
  //   setHasMore(false)
  //   _isotopeFilterRendered = true
  //   return "done"
  // }

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
