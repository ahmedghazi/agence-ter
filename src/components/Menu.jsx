import React, { useContext } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { LocaleContext } from "../contexts/LocaleWrapper"

const query = graphql`
  query {
    prismicMenu(uid: { eq: "menu-header" }) {
      data {
        menu_items {
          item {
            uid
          }
          title_fr {
            text
          }
          title_en {
            text
          }
        }
      }
    }
  }
`

const Menu = () => {
  const { prismicMenu } = useStaticQuery(query)
  const { localeCtx } = useContext(LocaleContext)
  // console.log(prismicMenu);
  return (
    <nav id="nav-primary">
      <ul className="flex  uppercase">
        {prismicMenu.data.menu_items.map((li, i) => (
          <li key={i} className="menu-item">
            <Link
              to={`/${li.item.uid}`}
              className="pr-xxs md:pr-sm hover:text-white"
            >
              {localeCtx === "fr-fr" ? li.title_fr.text : li.title_en.text}
            </Link>
          </li>
        ))}
        <li className="menu-item sm-only">
          <Link to="/contacts" className="">
            Contacts
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Menu
