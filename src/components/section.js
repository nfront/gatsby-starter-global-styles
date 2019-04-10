import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';

const StyledSection = styled.div`
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: center;
  border: 1px solid red;
  padding: 2rem 1rem;
`;

const TextDiv = styled.div`
  flex: 1 1 0;
  border: 1px solid green;
  order: ${props => (props.textRight ? 1 : 0)};
`;

const ImageDiv = styled.div`
  flex: 1 1 0;
  border: 1px solid blue;
  text-align: center;
`;

const Section = props => {
  return (
    <StyledSection>
      <TextDiv {...props}>
        <Typography component="h2" variant="h2" gutterBottom>
          About Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam
          beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti?
          Eum quasi quidem quibusdam.
        </Typography>
      </TextDiv>
      <ImageDiv>And here are some pictures</ImageDiv>
    </StyledSection>
  );
};

export default Section;
