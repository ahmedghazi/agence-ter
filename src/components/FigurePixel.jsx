import React, { useEffect, useRef, useState } from "react";
// import { GatsbyImage, getImage } from "gatsby-plugin-image";
// import ClosePixelation from "close-pixelate";
import styled from "styled-components";
import clsx from "clsx";
import { useInView } from "react-intersection-observer";

const Figure = styled.figure`
  &.ready {
    img {
      opacity: 1;
    }
    canvas {
      // image-rendering: unset;
      opacity: 0;
    }
  }
`;

const Canvas = styled.canvas`
  image-rendering: -moz-crisp-edges;
  image-rendering: -webkit-crisp-edges;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  width: 100%;
`;

const FigurePixel = ({ input }) => {
  // console.log(input);
  const [ready, setReady] = useState();
  const figureRef = useRef(null);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const imageRef = useRef(null);
  // const canvas = canvasRef.current;
  // const context = canvas.getContext("2d");

  useEffect(() => {
    const { width, height } = getBounding();
    // console.log(width, height);
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    // This is what gives us that blocky pixel styling, rather than a blend between pixels.
    // canvas.style.cssText =
    //   "image-rendering: optimizeSpeed;" + // FireFox < 6.0
    //   "image-rendering: -moz-crisp-edges;" + // FireFox
    //   "image-rendering: -o-crisp-edges;" + // Opera
    //   "image-rendering: -webkit-crisp-edges;" + // Chrome
    //   "image-rendering: crisp-edges;" + // Chrome
    //   "image-rendering: -webkit-optimize-contrast;" + // Safari
    //   "image-rendering: pixelated; " + // Future browsers
    //   "-ms-interpolation-mode: nearest-neighbor;"; // IE

    contextRef.current = canvas.getContext("2d");
    const context = contextRef.current;
    context.imageSmoothingEnabled = false;
    context.msImageSmoothingEnabled = false;
    context.mozImageSmoothingEnabled = false;
    context.webkitImageSmoothingEnabled = false;

    // setUpCanvas();

    imageRef.current = new Image();
    imageRef.current.onload = function () {
      pixelate(6);
      // context.drawImage(imageRef.current, 0, 0, width, height);
    };
    imageRef.current.src = input.fluid.src;

    // setTimeout(pixelOut, 2500);
  }, []);

  const [ref, inView, entry] = useInView({
    /* Optional options */
    threshold: 0,
  });

  useEffect(() => {
    // console.log(inView);
    if (inView) setTimeout(pixelOut, 250);
  }, [inView]);

  const getBounding = () => {
    const { width } = figureRef.current.getBoundingClientRect();
    const height = width * input.fluid.aspectRatio;
    return { width, height };
  };

  const pixelate = (v) => {
    const context = contextRef.current;
    const { width, height } = getBounding();
    // console.log(v);
    const percent = v ? v * 0.01 : 1;
    const scaledWidth = width * percent;
    const scaledHeight = height * percent;

    // draw the original image at a fraction of the final size
    context.drawImage(imageRef.current, 0, 0, scaledWidth, scaledHeight);

    // enlarge the minimized image to full size
    context.drawImage(
      canvasRef.current,
      0,
      0,
      scaledWidth,
      scaledHeight,
      0,
      0,
      width,
      height
    );
  };

  const pixelOut = () => {
    let v = 1,
      dx = 2.75;

    anim();

    function anim() {
      v += dx;

      if (v >= 100) {
        v = 100;
        setReady(true);
      }
      pixelate(v);

      if (v < 100) {
        requestAnimationFrame(anim);
      }
    }
  };

  const animate = (time) => {};
  const lerp = (start, end, t) => start * (1 - t) + end * t;

  return (
    <Figure ref={figureRef} className={clsx("relative", ready ? "ready" : "")}>
      <div ref={ref}>
        {ready && (
          <img
            className='opacity-0 transition-opacity absolute w-full'
            src={input.fluid.src}
            srcSet={input.fluid.srcSet}
            sizes={input.fluid.sizes}
          />
        )}
        <Canvas ref={canvasRef} className='transition-opacity' />
      </div>
    </Figure>
  );
};

export default FigurePixel;
