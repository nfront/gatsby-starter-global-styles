import { graphql } from 'gatsby';

export const anyName1 = graphql`
  fragment w300Image on File {
    childImageSharp {
      fluid(maxWidth: 300) {
        ...GatsbyImageSharpFluid
        presentationWidth
      }
    }
  }
`;

export const anyName2 = graphql`
  fragment squareImage on File {
    childImageSharp {
      fluid(maxWidth: 200, maxHeight: 200) {
        ...GatsbyImageSharpFluid
        presentationWidth
      }
    }
  }
`;

// export { squareImage };
