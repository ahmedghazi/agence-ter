import React from "react"

const Social = ({ input }) => (
  <ul className="social flex justify-end- ">
    {input.map((li, i) => (
      <li key={i}>
        <a
          href={li.url.url}
          target="_blank"
          rel="noopener noreferrer"
          className={i < input.length - 1 ? "pr-sm" : ""}
        >
          <span
            className={`icon-${li.label.text}`}
            title={li.label.text}
          ></span>
        </a>
      </li>
    ))}
  </ul>
)

export default Social
