import React from "react"
import Slider from "../ui/slick-slider"

const NewsSlider = ({ input }) => {
  // console.log(input);
  const _slides = input.items.map(({ item }, i) => (
    <div className="slide" key={i}>
      <h3>{item.document.data.title.text}</h3>
    </div>
  ))
  return (
    <section className="slice-news-slider px-md">
      <Slider>{_slides}</Slider>
    </section>
  )
}

export default NewsSlider
