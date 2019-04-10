import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import styled from 'styled-components';
import { darken, fade } from '@material-ui/core/styles/colorManipulator';
// import { palette, spacing, typography } from '@material-ui/system';

// Import other components
import StyledSection from '../components/section';
import Image from '../components/image';
// import SEO from '../components/SEO';

// Component-scoped CSS
// ...

// import GlobalStyleComponent from '../styles/createGlobalStyles';
// import CreateGlobalStyle from '../styles/createGlobalStyles';

// const GlobalStyleComponent = new CreateGlobalStyle();

// const ele = <CreateGlobalStyle whiteFont />;

// const ele2 = ele.render();

// console.log('JJJJJ: ', ele);

const StyledButton = styled(Button)`
  color: ${props => {
    // console.log('STYLEDBUTTON propss:', props);
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

styled(Typography)`
  &.my-class {
    margin-bottom: 5rem;
  }
`;

const IndexPage = () => (
  <>
    {/* <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} /> */}
    <h1>Hi people</h1>
    <Typography variant="h1" gutterBottom>
      Hi people
    </Typography>

    <h2>Testing h2</h2>

    <Typography className="my-class2" component="h2" variant="h2">
      Testing h2 (MUI)
    </Typography>
    <h2 style={{ color: 'yellow' }}>Testing h2 with inline</h2>
    <StyledH2>Testing StyledH2</StyledH2>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>

    <StyledButton>Hello World</StyledButton>

    <Button color="primary">Primary</Button>
    <Button color="secondary">Secondary</Button>

    <Typography>body1</Typography>
    <Typography variant="subtitle1">subtitle</Typography>

    <Button>Button</Button>

    <StyledSection />
    <StyledSection textRight />
    <Link component={GatsbyLink} variant="body2" to="/page-2/">
      Go to page 2
    </Link>
  </>
);

export default IndexPage;
