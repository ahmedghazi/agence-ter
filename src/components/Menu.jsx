import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const query = graphql`
  query {
    prismicMenu(uid: { eq: "menu-header" }) {
      data {
        menu_items {
          item {
            uid
          }
          title {
            text
          }
        }
      }
    }
  }
`

const Menu = () => {
  const { prismicMenu } = useStaticQuery(query)
  // console.log(prismicMenu);
  return (
    <nav>
      <ul className="flex  uppercase">
        {prismicMenu.data.menu_items.map((li, i) => (
          <li key={i} className="menu-item">
            <Link
              to={`/${li.item.uid}`}
              className="pr-xxs md:pr-sm hover:text-gray"
            >
              {li.title.text}
            </Link>
          </li>
        ))}
        <li className="menu-item sm-only">
          <Link to="/contacts" className="btn outline mx-sm">
            Contacts
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
