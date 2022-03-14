import React, { useState } from "react"
import { graphql, Link, useStaticQuery } from "gatsby"

import PubSub from "pubsub-js"
import styled from "styled-components"
import { linkResolver, _localizeText } from "../core/utils"

const query = graphql`
  query {
    allPrismicProject {
      nodes {
        uid
        type
        data {
          ...projetCard
        }
      }
    }
  }
`

const TableWrapper = styled.div`
  @media all and (max-width: 768px) {
    width: calc(100vw - var(--space-sm));
    overflow-x: auto;
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: initial;
  @media all and (min-width: 768px) {
    &:before {
      content: "";
      position: fixed;
      width: 100%;
      left: 0;
      height: var(--header-height);
      background: white;
      z-index: 1;
      top: 0;
    }
  }
`
const Thead = styled.thead`
  position: sticky;
  top: var(--header-height);
  background: white;
  z-index: 1;
  @media all and (max-width: 768px) {
    top: 0;
  }
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
  @media all and (min-width: 768px) {
    h2 {
      min-height: 66px;
      line-height: 66px;
    }
  }
  @media all and (max-width: 768px) {
    h2 {
      min-height: 56px;
      line-height: 56px;
    }
    &.col-symbole,
    &.col-theme,
    &.col-status {
      display: none;
      // padding-right: var(--space-md);
    }
    &.col-status {
      // text-align: right;
      // padding-right: 0;
    }
  }
`

const ProjectsTable = () => {
  const { allPrismicProject } = useStaticQuery(query)
  // console.log(allPrismicProject)

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
    let arrayCopy = [...allPrismicProject.nodes]
    arrayCopy.sort(_compareBy(key))
    // console.table(arrayCopy[0].data.title.text);
    setData(arrayCopy)
    setSorted(true)
    setOrder(order === "ASC" ? "DESC" : "ASC")
  }

  const _compareBy = (key) => {
    // console.log(order, key)
    if (order == "ASC") {
      return function (a, b) {
        const _a = _getValueByColumn(key, a.data, true)
          ? _getValueByColumn(key, a.data, true)
          : ""
        const _b = _getValueByColumn(key, b.data, true)
          ? _getValueByColumn(key, b.data, true)
          : ""
        // console.log(_a, _b)
        if (key === "superficie") {
          if (_a < _b) return -1
          if (_a > _b) return 1
        } else {
          if (_a.toLowerCase() < _b.toLowerCase()) return -1
          if (_a.toLowerCase() > _b.toLowerCase()) return 1
        }
        return 0
      }
    } else {
      return function (a, b) {
        const _a = _getValueByColumn(key, a.data, true)
          ? _getValueByColumn(key, a.data, true)
          : ""
        const _b = _getValueByColumn(key, b.data, true)
          ? _getValueByColumn(key, b.data, true)
          : ""
        if (key === "superficie") {
          if (_a < _b) return 1
          if (_a > _b) return -1
        } else {
          if (_a.toLowerCase() < _b.toLowerCase()) return 1
          if (_a.toLowerCase() > _b.toLowerCase()) return -1
        }
        return 0
      }
    }
  }

  const _getValueByColumn = (col, itemData, raw) => {
    switch (col) {
      case "title":
        return itemData.title.text
      case "superficie":
        return raw
          ? _valueToNumberToString(itemData.superficie)
          : itemData.superficie
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
  const _valueToNumberToString = (val) => {
    return parseFloat(val)
  }
  const _getHmlByColumn = (col, itemData) => {
    const isArchive = itemData.archive
    const columnValue = _getValueByColumn(col, itemData, false)
    // console.log(columnValue)
    switch (col) {
      case "title":
        return <h2>{columnValue}</h2>
      case "superficie":
        return <span>{columnValue}</span>
      case "status":
        return <span>{columnValue}</span>
      case "symbole":
        return isArchive || !columnValue ? (
          ""
        ) : (
          <img src={columnValue} alt={`picto `} loading="lazy" />
        )
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

  const projets = sorted ? data : allPrismicProject.nodes
  // console.log(projets)
  const _handleSwitchView = () => {
    PubSub.publish("TABLE_TOGGLE")
  }

  return (
    <section className="table-view ">
      <div className="backdrop bg-whitesmoke fixed top-0 left-0 w-screen h-screen"></div>
      <div className="header text-md py-sm md:py-md sticky- top-0 md:mb-lg z-10">
        <div className="row">
          <div className="col-md-2 hidden-sm"></div>
          <div className="col-xs">
            <button
              onClick={() => _handleSwitchView()}
              className="font-bold flex items-center text-lg"
            >
              <i className="icon-chevron-w  absolute -left-xs"></i>{" "}
              <span>{_localizeText("back")}</span>
            </button>
          </div>
        </div>
      </div>

      <TableWrapper>
        <Table>
          <Thead>
            <tr>
              {columns.map((column, i) => (
                <Td
                  key={i}
                  className={`col-${column} capitalize font-bold py-xs cursor-pointer `}
                  onClick={() =>
                    _sortBy(column === "projet" ? "title" : column)
                  }
                >
                  {_localizeText(column)}
                </Td>
              ))}
            </tr>
          </Thead>
          <tbody>
            {projets.map((el, i) => (
              <tr key={i}>
                {columns.map((column, j) => (
                  <Td key={j} className={`col-${column} `}>
                    {el.data.archive ? (
                      <div>{_getHmlByColumn(column, el.data)}</div>
                    ) : (
                      <Link to={linkResolver(el)} className="py-xs">
                        <div>{_getHmlByColumn(column, el.data)}</div>
                      </Link>
                    )}
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </section>
  )
}

export default ProjectsTable
