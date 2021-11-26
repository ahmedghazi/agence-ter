import React, { useEffect, useState, useRef } from "react"
import ReactSlick from "react-slick"
import SliderCursorPrevNextText from "./SliderCursorPrevNextText"
import PubSub from "pubsub-js"
import "./slick.css" //impossible de l'importer direct ici à cause de purge-css

const Slider = ({ children, settingsOverride }) => {
  const sliderRef = useRef()

  const [index, setIndex] = useState(0)

  const _sliderBeforeChange = (oldIndex, newIndex) => {
    // setH2(input[newIndex].project.document.data.title.text);
    setIndex(newIndex)
  }

  useEffect(() => {
    // console.log(sliderRef)
    const token = PubSub.subscribe("SLIDER_INDEX", (e, d) => {
      sliderRef.current.slickGoTo(d)
    })

    return () => PubSub.unsubscribe(token)
  }, [])

  useEffect(() => {
    PubSub.publish("SLIDER_CHANGE", index)
  }, [index])

  const settingsDefault = {
    // autoplay: !isMobile,
    autoplaySpeed: 3000,
    autoplay: false,
    dots: false,
    // speed: isMobile ? 250 : 500,
    speed: 500,
    swipeToSlide: true,
    slidesToScroll: 1,
    cssEase: "cubic-bezier(0.53, 0, 0.36, 1)",
    beforeChange: _sliderBeforeChange,
    prevArrow: <SliderCursorPrevNextText label="prev" left="0%" />,
    nextArrow: <SliderCursorPrevNextText label="next" left="50%" />,
  }
  const settings = {
    ...settingsDefault,
    ...settingsOverride,
  }
  // console.log(settings)

  return (
    <ReactSlick {...settings} ref={sliderRef}>
      {children}
    </ReactSlick>
  )
}

export default Slider
