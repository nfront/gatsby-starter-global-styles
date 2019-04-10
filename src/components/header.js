import { Link } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`;

const StyledLink = styled(Link)`
  text-shadow: 0.03em 0 rebeccapurple, -0.03em 0 rebeccapurple, 0 0.03em rebeccapurple, 0 -0.03em rebeccapurple,
    0.06em 0 rebeccapurple, -0.06em 0 rebeccapurple, 0.09em 0 rebeccapurple, -0.09em 0 rebeccapurple,
    0.12em 0 rebeccapurple, -0.12em 0 rebeccapurple, 0.15em 0 rebeccapurple, -0.15em 0 rebeccapurple;
  background-image: linear-gradient(
    to top,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0) 1px,
    white 1px,
    white 2px,
    rgba(0, 0, 0, 0) 2px
  );
  color: white;
  text-decoration: none;
  :hover {
    background-image: none;
  }
`;

const H1 = styled.h1`
  margin-bottom: 0;
  text-align: center;
`;

const HeadingWrapper = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`;

const Header = ({ siteTitle }) => (
  <StyledHeader>
    <HeadingWrapper>
      <H1>
        <StyledLink to="/">{siteTitle}</StyledLink>
      </H1>
    </HeadingWrapper>
  </StyledHeader>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
