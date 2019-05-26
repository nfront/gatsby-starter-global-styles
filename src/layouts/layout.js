import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
// import Helmet from 'react-helmet';

import Header from '../components/header';

const Layout = props => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      site {
        siteMetadata {
          title
          nav {
            path
            name
            hidden
          }
        }
      }
    }
  `);

  const { children, location } = props;

  return (
    <>
      <Header location={location} siteTitle={data.site.siteMetadata.title} nav={data.site.siteMetadata.nav}>
        {children}
      </Header>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
