import React from "react";
// import Figure from "./Figure";
import styled from "styled-components";
import clsx from "clsx";
import SvgMaskImage from "./ui/SvgMaskImage";

const Article = styled.article`
  &.is-filtering {
    &.is-selected {
      color: red;
    }
  }
`;

const Visuel = styled.article`
  image {
    opacity: 0;
  }
  g:hover image {
    opacity: 1;
  }
`;

const ProjectSvgCard = ({ input }) => {
  return (
    <Article className={clsx("card col-md-4")}>
      <Visuel>
        <SvgMaskImage
          svg={input.data.pictogramme.url}
          image={input.data.image.url}
          placeHolderColor={"yellow"}
        />
      </Visuel>

      <h2>{input.data.title.text}</h2>
    </Article>
  );
};

export default ProjectSvgCard;
