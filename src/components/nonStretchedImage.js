import React from 'react';
import Img from 'gatsby-image';

const NonStretchedImage = props => {
  const { fluid } = props;
  let normalizedProps = props;

  if (fluid && fluid.presentationWidth) {
    normalizedProps = {
      ...props,
      style: {
        ...(props.style || {}),
        maxWidth: props.fluid.presentationWidth,
        margin: '0 auto', // Used to center the image
      },
    };
  }

  return <Img {...normalizedProps} />;
};

export { NonStretchedImage as default };
