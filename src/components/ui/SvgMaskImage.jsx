import React, { useState, useEffect, useRef } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const SvgMaskImage = (props) => {
  const [svg, setSvg] = useState(null)
  const [viewBox, setViewBox] = useState("0 0 0 0")
  // const [dimensions, setDimensions] = useState();
  const [path, setPath] = useState(null)
  const svgRef = useRef()

  const makeID = (length) => {
    let result = ""
    const characters = "abcdefghijklmnopqrstuvwxyz"
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }

    return result
  }
  const randomID = `clip-${makeID(10)}`

  useEffect(() => {
    // console.log(props.svg)
    const abortController = new AbortController()

    const headers = {
      // mode: "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      signal: abortController.signal,
    }
    fetch(props.svg.url, headers)
      .then((res) => res.text())
      .then((res) => {
        // console.log(res);
        setSvg(res)
      })
      .catch(console.error.bind(console))

    return () => abortController.abort()
  }, [])

  useEffect(() => {
    if (svg) {
      const svgElement = svgRef.current.querySelector("svg")
      const path = svgElement.querySelector("path")
      // console.log(path)
      setViewBox(svgElement.getAttribute("viewBox"))
      if (path) setPath(path.getAttribute("d"))
      else {
        // console.log(props)
        var polys = svgElement.querySelectorAll("polygon,polyline")
        ;[].forEach.call(polys, _convertPolyToPath)
      }
    }
  }, [svg])

  const _convertPolyToPath = (poly) => {
    var svgNS = poly.ownerSVGElement.namespaceURI
    var path = document.createElementNS(svgNS, "path")
    var points = poly.getAttribute("points").split(/\s+|,/)
    var x0 = points.shift(),
      y0 = points.shift()
    var pathdata = "M" + x0 + "," + y0 + "L" + points.join(" ")
    if (poly.tagName == "polygon") pathdata += "z"
    path.setAttribute("d", pathdata)
    poly.parentNode.replaceChild(path, poly)
    // console.log(poly.parentNode)
    setPath(pathdata)
  }

  const _getAspectRatio = () => {
    const { width, height } = props.svg.dimensions
    const h = (height * 3) / width
    return `3 / ${Math.round(h)}`
  }

  const aspectRatio = _getAspectRatio()
  // console.log(aspectRatio)

  return (
    <div
      className="svg-mask-image"
      style={{
        aspectRatio: aspectRatio,
      }}
    >
      <div
        className="svg-ghost-renderer"
        ref={svgRef}
        dangerouslySetInnerHTML={{ __html: svg }}
        style={{
          position: "absolute",
          width: "0",
          height: "0",
        }}
      />

      <svg
        id={makeID(10)}
        data-name="Calque 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox={viewBox}
      >
        <clipPath id={randomID}>
          <path d={path}></path>
        </clipPath>
        <g clipPath={`url(#${randomID})`}>
          <rect
            width="100%"
            height="100%"
            fill={props.placeHolderColor}
            fillOpacity="50%"
          />

          <image
            xlinkHref={props.image}
            width="100%"
            height="100%"
            preserveAspectRatio="xMinYMin slice"
            className="transition-opacity--"
            crossOrigin="anonymous"
          ></image>
        </g>
      </svg>
      {props.outline && (
        <svg
          style={{
            position: "absolute",
            top: 0,
            // border: "1px solid red",
          }}
          className="outline pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox}
        >
          <path
            d={path}
            fill="transparent"
            stroke="black"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            // strokeLinecap="round"
          ></path>
        </svg>
      )}

      {/* <figure
        style={{
          clipPath: `url(#${randomID})`,
        }}>
        <div className='placeholder'></div>
        <img src={props.image} alt='' />
      </figure> */}
    </div>
  )
}

export default SvgMaskImage
