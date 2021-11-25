import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Hero = ({ input }) => {
  return (
    <section className='hero'>
      <figure>
        <GatsbyImage
          image={getImage(input.gatsbyImageData)}
          alt={input.alt || ""}
        />
      </figure>
    </section>
  );
};

export default Hero;
