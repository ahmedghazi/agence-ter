import React, { useState } from "react"
import { Link } from "gatsby"
import { linkResolver } from "../core/utils"
import styled from "styled-components"
import { _localizeText } from "../core/utils"

const Table = styled.table`
  width: 100%;
  border-collapse: initial;
`
const Td = styled.td`
  position: relative;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding-right: 0.5em;
  &:last-child {
    // text-align: right;
    padding-right: 0;
  }
  thead & {
    // padding-bottom: 4px;
  }
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: black;
  }
  a {
    display: block;
    // padding: 5px 0 4px;
  }
  &.col-symbole {
    width: 120px;
  }
  img {
    height: 46px;
    max-width: 100px;
  }

  @media all and (max-width: 768px) {
    &.col-symbole,
    &.col-theme,
    &.col-status {
      display: none;
    }
    &.col-year {
      text-align: right;
      padding-right: 0;
    }
  }
`

const ProjectsTable = ({ input }) => {
  // console.log(input);
  const [data, setData] = useState()
  const [sorted, setSorted] = useState(false)
  const [order, setOrder] = useState("ASC")

  const columns = [
    "superficie",
    "symbole",
    "title",
    "localisation",
    "year",
    "theme",
    "status",
  ]

  const _sortBy = (key) => {
    let arrayCopy = [...input]
    arrayCopy.sort(_compareBy(key))
    // console.table(arrayCopy[0].data.title.text);
    setData(arrayCopy)
    setSorted(true)
    setOrder(order === "ASC" ? "DESC" : "ASC")
  }

  const _compareBy = (key) => {
    console.log(order, key)
    if (order == "ASC") {
      return function (a, b) {
        const _a = _getValueByColumn(key, a.item.document.data)
          ? _getValueByColumn(key, a.item.document.data)
          : ""
        const _b = _getValueByColumn(key, b.item.document.data)
          ? _getValueByColumn(key, b.item.document.data)
          : ""
        if (_a.toLowerCase() < _b.toLowerCase()) return -1
        if (_a.toLowerCase() > _b.toLowerCase()) return 1
        return 0
      }
    } else {
      return function (a, b) {
        const _a = _getValueByColumn(key, a.item.document.data)
          ? _getValueByColumn(key, a.item.document.data)
          : ""
        const _b = _getValueByColumn(key, b.item.document.data)
          ? _getValueByColumn(key, b.item.document.data)
          : ""
        if (_a.toLowerCase() < _b.toLowerCase()) return 1
        if (_a.toLowerCase() > _b.toLowerCase()) return -1
        return 0
      }
    }
  }

  const _getValueByColumn = (col, itemData) => {
    switch (col) {
      case "title":
        return itemData.title.text
      case "superficie":
        return itemData.superficie
      case "status":
        return itemData.phase
      case "symbole":
        return itemData.pictogramme.url
      case "localisation":
        return itemData.localisation_short
      case "year":
        return itemData.year_short

      case "theme":
        return itemData.theme.document
          ? itemData.theme.document.data.title.text
          : null
      default:
        return itemData[col]
    }
  }
  const _getHmlByColumn = (col, itemData) => {
    const columnValue = _getValueByColumn(col, itemData)
    // console.log(columnValue)
    switch (col) {
      case "title":
        return <h2>{columnValue}</h2>
      case "superficie":
        return <span>{columnValue}</span>
      case "status":
        return <span>{columnValue}</span>
      case "symbole":
        return <img src={columnValue} alt={`picto `} loading="lazy" />
      case "localisation":
        return <span>{itemData.localisation_short}</span>
      case "year":
        return <span>{itemData.year_short}</span>
      case "theme":
        return <span>{itemData.theme.document.data.title.text}</span>
      default:
        return <span>{columnValue}</span>
    }
  }

  const projets = sorted ? data : input

  return (
    <section className="table-view ">
      <div className="backdrop bg-white fixed top-0 left-0 w-screen h-screen"></div>
      <Table>
        <thead>
          <tr>
            {columns.map((column, i) => (
              <Td
                key={i}
                className={`col-${column} capitalize font-bold py-xs cursor-pointer `}
                onClick={() => _sortBy(column === "projet" ? "title" : column)}
              >
                {_localizeText(column)}
              </Td>
            ))}
          </tr>
        </thead>
        <tbody>
          {projets.map((el, i) => (
            <tr key={i}>
              {columns.map((column, j) => (
                <Td key={j} className={`col-${column} `}>
                  <Link to={linkResolver(el.item.document)} className="py-xs">
                    <div>{_getHmlByColumn(column, el.item.document.data)}</div>
                  </Link>
                </Td>
              ))}
            </tr>
          ))}
        </tbody>
      </Table>
    </section>
  )
}

export default ProjectsTable
