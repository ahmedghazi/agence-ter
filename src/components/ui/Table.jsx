import React, { useState } from "react";
import { Link } from "gatsby";
import { linkResolver } from "../../core/utils";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: initial;
`;
const Td = styled.td`
  position: relative;
  thead & {
    padding-bottom: 4px;
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
    padding: 5px 0 4px;
  }
`;

const ProjetsTable = ({ input }) => {
  const { columns, rows } = input;
  // console.log(input);
  const [data, setData] = useState();
  const [sorted, setSorted] = useState(false);
  const [order, setOrder] = useState("ASC");

  // const columns = [
  //   "sta",
  //   "cat",
  //   "abc",
  //   "br",
  //   "projet",
  //   "lieu",
  //   "phase",
  //   "date",
  // ];

  const _sortBy = (key) => {
    let arrayCopy = [...input];
    arrayCopy.sort(_compareBy(key));
    // console.table(arrayCopy[0].data.title.text);
    setData(arrayCopy);
    setSorted(true);
    setOrder(order === "ASC" ? "DESC" : "ASC");
  };

  const _compareBy = (key) => {
    // console.log(order, key);
    if (order == "ASC") {
      return function (a, b) {
        // console.log(a.data[key], b.data[key]);

        /**
         * prevent null values
         */
        const _a = a.data[key] ? a.data[key] : "";
        const _b = b.data[key] ? b.data[key] : "";
        if (_a.toLowerCase() < _b.toLowerCase()) return -1;
        if (_a.toLowerCase() > _b.toLowerCase()) return 1;
        return 0;
      };
    } else {
      return function (a, b) {
        if (typeof a.data[key] === "object") {
          if (a.data[key].text.toLowerCase() < b.data[key].text.toLowerCase())
            return 1;
          if (a.data[key].text.toLowerCase() > b.data[key].text.toLowerCase())
            return -1;
          return 0;
        } else {
          const _a = a.data[key] ? a.data[key] : "";
          const _b = b.data[key] ? b.data[key] : "";
          if (_a.toLowerCase() < _b.toLowerCase()) return 1;
          if (_a.toLowerCase() > _b.toLowerCase()) return -1;
          return 0;
        }
      };
    }
  };

  const rows = sorted ? data : rows;

  return (
    <Table>
      <thead>
        <tr>
          {columns.map((column, i) => (
            <Td
              key={i}
              className={`col-${column} ttu curp`}
              onClick={() => _sortBy(column === "projet" ? "title" : column)}>
              {column}
            </Td>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((el, i) => (
          <tr key={i}>
            {columns.map((column, j) => (
              <Td key={j} className={`col-${column}`}>
                <Link to={linkResolver(el)}>{el[column]}</Link>
              </Td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ProjetsTable;
