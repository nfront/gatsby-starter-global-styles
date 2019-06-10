import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import styled from 'styled-components';
import { darken, fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/styles';

// Import other components
import StyledSection from '../components/section';
import Image from '../components/image';
// import SEO from '../components/SEO';

const StyledButton = styled(Button)`
  color: ${props => {
    return props.theme.palette.primary.contrastText;
  }};
  background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
  /* cursor: pointer;
  outline: none; */
  /* border: 2px solid; */
  border-radius: ${props => props.theme.shape.borderRadius}px;
  /* border-color: ${props => props.theme.palette.primary.main}; */
  /* color: white; */
  height: 48px;
  padding: 0 30px;
  box-shadow: 0 3px 5px 2px rgba(255, 105, 135, 0.3);
  &:hover {
    /* filter: brightness(80%); */
    background: ${props => {
      return `linear-gradient(45deg, ${darken(`#fe6b8b`, 0.2)} 30%, ${darken(`#ff8e53`, 0.2)} 90%)`;
    }};
    /* background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.1)),
      linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%); */
  };
  &:focus {
    /* box-shadow: 0 0 0 0.2rem ${props => fade(props.theme.palette.primary.main, 0.5)}; */
  };
  font-size: 1.2rem;
  ${props => props.theme.breakpoints.up('md')} {
    font-size: 1rem;
  }
`;

const StyledH2 = styled.h2`
  color: red;
`;

const H1Styled = styled(Typography)`
  .MuiTypography-h1 {
    margin-bottom: 1rem;
    color: red;
  }
`;

const H1Styled2 = styled(Typography)`
  margin-bottom: 1rem;
  color: red;
`;

const useStylesClassNames = makeStyles({
  h1: {
    marginBottom: '0.5rem',
  }, // a style rule
});

const useStylesClasses = makeStyles({
  h1: {
    marginBottom: '10rem',
  }, // a style rule
});

styled(Typography)`
  .my-class2 {
    color: orange;
  }
`;

const IndexPage = props => {
  // console.log('props on index:', props);
  const classes1 = useStylesClassNames();
  const classes2 = useStylesClasses();
  // const { location, handleSetLocation } = props;
  // handleSetLocation(location);

  return (
    <>
      {/* <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} /> */}
      <Typography id="about" variant="h1" style={{ marginBottom: '1rem' }}>
        About Us: gatsby-starter-global-styles
      </Typography>
      <p>
        Below you can see how the different styling providers play together and overwrite each other. <br />
        <br />
        Parenthesis indicates style, for example margin-bottom: 3rem (mb-3).
      </p>
      <p>
        The cascade is as follows (right overwrites left):
        <br />
        typography.js (least specific) <b>{'<'}</b> gatsby-plugin-global-styles <b>{'<'}</b> Material-UI styles{' '}
        <b>{'<'}</b> styled-components (most specific)
      </p>
      <Typography variant="h1" style={{ marginTop: '3rem' }}>
        MuiTypography-h1 using theme values (mb: 3rem)
      </Typography>
      Note to below: When using styled components, do not try to overwrite specific MUI classes, it will NOT work.
      Instead, just use styled-components the normal way. They are higher than MUI in the cascade, and will therefore
      overwrite MUI anyways. The below attempted to set color:red and mb-1.
      <H1Styled variant="h1">
        MuiTypography-h1 with MUI class overwritten with styled-components (color: red, mb: 1rem).
      </H1Styled>
      Above point can be seen here (it works using styled-components normally).
      <H1Styled2 variant="h1">
        MuiTypography-h1 with MUI class overwritten with styled-components (color: red, mb: 1rem).
      </H1Styled2>
      xxx
      <Typography variant="h1" className={classes1.h1}>
        MuiTypography-h1 overwritten with className (mb: 0.5rem).
      </Typography>
      xxx
      <Typography variant="h1" classes={{ h1: classes2.h1 }}>
        MuiTypography-h1 overwritten with classes (mb: 10rem).
      </Typography>
      xxx
      <h2>Regular h2</h2>
      xxx
      <Typography className="my-class2" component="h2" variant="h2">
        MuiTypography-h2, attempting to add new class via className using class injected with styled-components. When
        using styled-components, it does not work to overwrite MUI class names. Just use the styled-components the
        normal way, as it is higher in the cascade than MUI. (Failed: color: orange).
      </Typography>
      xxx
      <h2 style={{ color: 'yellow' }}>Regular h2 with inline style (color: yellow).</h2>
      xxxx
      <StyledH2>H2 styled-component (color: red).</StyledH2>
      xxxxxxxxxxxxxxx
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Typography id="contact" variant="h1" classes={{ h1: classes2.h1 }}>
        Contact Us.
      </Typography>
      <StyledButton>Hello World</StyledButton>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Typography variant="body1">body1</Typography>
      <Typography variant="subtitle1">subtitle</Typography>
      <Button>Button</Button>
      <StyledSection />
      <StyledSection textRight />
      <Link component={GatsbyLink} variant="body1" to="/page-2/">
        Go to page 2
      </Link>
    </>
  );
};

export default IndexPage;
