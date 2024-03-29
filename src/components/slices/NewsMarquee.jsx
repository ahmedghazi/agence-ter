import { Link } from "gatsby"
import React from "react"
// import Slider from "../ui/slick-slider"

const NewsMarquee = ({ input }) => {
  // console.log(input);
  // const _slides = input.items.map(({ item }, i) => (
  //   <div className="slide" key={i}>
  //     <h3>{item.document.data.title.text}</h3>
  //   </div>
  // ))
  const _truncate = (source, maxWords) => {
    const explode = source.split(" ")
    let string = explode.splice(0, maxWords).join(" ")
    string += "..."
    // console.log(explode)
    return string
    // const
  }

  return (
    <section
      className="slice-news-marquee bg-yellow py-md"
      style={{
        padding: "17px 0 14px",
      }}
    >
      <Link to="/actualites">
        <marquee>
          <div className="flex">
            {input.items.map(({ item }, i) => (
              <div
                className="slide pr-lg flex items-baseline text-md md:text-lg"
                key={i}
              >
                <h3 className="font-strong pr-xs text-md md:text-lg">
                  {item.document.data.title.text} :
                </h3>
                <p>{_truncate(item.document.data.texte_fr.text, 10)}</p>
              </div>
            ))}
          </div>
        </marquee>
      </Link>
    </section>
  )
}

export default NewsMarquee
