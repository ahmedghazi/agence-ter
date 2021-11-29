import React, { useEffect, useRef, useState } from "react"
import Isotope from "isotope-layout"
import imagesLoaded from "imagesloaded"
// import PubSub from "pubsub-js"
import ProjectCard from "./ProjectCard"
import useFilters from "../contexts/FiltersWrapper"
// import { FiltersContext } from "../contexts/FiltersWrapper"

const ProjectsGridMasonry = ({ input }) => {
  //infinite
  // console.log(MasonryLayout)
  // const inputPaged =
  // let PAGE = -1
  let _isotopeRendered = false
  const backDropRef = useRef()
  const gridRef = useRef()
  const isoRef = useRef()
  // const { filter } = useContext(FiltersContext)
  const { filters } = useFilters()

  const [page, setPage] = useState(0)
  const PER_PAGE = 25
  const MAX_PAGE = Math.floor(input.length / PER_PAGE)
  const [inputPaged, setInputPaged] = useState([])
  const [hasMore, setHasMore] = useState(true)

  useEffect(() => {
    // _addContent()
    window.addEventListener("scroll", _onScroll)
    // _renderIsotope()

    return () => window.removeEventListener("scroll", _onScroll)
  }, [page])

  useEffect(() => {
    console.log(page)
    // const contentByPage = _getContentByPage()
    const start = page * PER_PAGE
    const end = start + PER_PAGE
    const nextPageContent = input.slice(start, end)
    // console.log(nextPageContent)
    // setHasMore(data.totalPages > pageToLoad.current);
    setInputPaged((inputPaged) => [...inputPaged, ...nextPageContent])
  }, [page])

  useEffect(() => {
    // console.log(inputPaged)
    if (!inputPaged.length) return

    if (!_isotopeRendered) {
      _renderIsotope()
    } else {
      isoRef.current.layout()
    }
    _isAppending = false
  }, [inputPaged])

  let _prevScrollTop = 0
  let _isAppending = false
  const _onScroll = () => {
    const gap = "ontouchstart" in window || navigator.maxTouchPoints ? 50 : 100
    const distanceToBottom =
      document.body.scrollHeight - (window.innerHeight + window.scrollY)

    // console.log(distanceToBottom);
    if (distanceToBottom <= gap) {
      _isAppending = true
      // _getContentByPage()
      const nextPage = page + 1 < MAX_PAGE ? page + 1 : 0
      setPage(nextPage)
    }

    _prevScrollTop = window.pageYOffset
  }

  // const _getContentByPage = () => {
  //   // PAGE += 1
  //   const start = page * PER_PAGE
  //   const end = start + PER_PAGE
  //   const nextPage = input.slice(start, end)
  //   // const cards = _renderCard(nextPage)
  //   return cards
  //   console.log(cards)
  //   return
  //   gridRef.current.appendChild(cards)
  //   isoRef.current.appended(elem)
  //   isoRef.current.layout()
  // }

  // const _renderCard = (arr) => {
  //   return arr.map((item, i) => <ProjectCard key={i} input={item} />)
  // }

  const _renderIsotope = () => {
    if (_isotopeRendered) return

    const cardS = gridRef.current.querySelector(".card-s")

    const columnWidth = cardS ? cardS.getBoundingClientRect().width : 150
    // const columnWidth = 300
    // console.log(columnWidth)
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
        _isotopeRendered = true
      }, 150)
    })
  }

  useEffect(() => {
    if (isoRef.current) {
      //.filtre .filtre .filtre
      const _filter = filters.length ? _renderFilterClassNames() : "*"
      console.log(_filter)
      isoRef.current.arrange({ filter: _filter })
    }
  }, [filters])

  const _renderFilterClassNames = () => {
    return filters
      .map((el) => `.${el.uid} `)
      .toString()
      .replace(",", "")
  }

  // console.log(inputPaged)
  return (
    <section className="grid-view min-h-screen  ">
      <div
        className="backdrop  fixed top-0 left-0 w-screen h-screen transition-all"
        style={{ backgroundColor: "#CCE6C7" }}
        ref={backDropRef}
      ></div>
      <div className="projects-grid-masonry" ref={gridRef}>
        {inputPaged.map((item, i) => (
          <ProjectCard key={i} input={item} />
        ))}
      </div>
    </section>
  )
}

export default ProjectsGridMasonry
