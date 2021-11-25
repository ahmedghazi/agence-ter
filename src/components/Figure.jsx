import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Figure = ({ input }) => (
  <figure>
    <GatsbyImage image={getImage(input)} alt={input.alt || ""} />
  </figure>
);

export default Figure;
