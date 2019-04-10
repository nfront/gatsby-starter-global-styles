import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import NonStretchedImage from './nonStretchedImage';

const Image = () => {
  const data = useStaticQuery(graphql`
    query {
      astronaut: file(relativePath: { eq: "gatsby-astronaut.png" }) {
        ...squareImage
      }
    }
  `);
  return <NonStretchedImage fluid={data.astronaut.childImageSharp.fluid} alt="nFront mobile development" />;
};

export default Image;
