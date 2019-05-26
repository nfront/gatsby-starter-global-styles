import React, { useContext, useEffect } from 'react';
import { Link } from 'gatsby';
import Context from '../utils/context';

import SEO from '../components/SEO';

const SecondPage = ({ location, ...otherProps }) => {
  console.log('RENDERING PAGE 2');

  // const context = useContext(Context);
  // const { mergeData } = context;

  // useEffect(() => {
  //   mergeData({
  //     location,
  //   });
  // }, [location, mergeData]);

  return (
    <>
      <a href="#foo">Should not cause re-render</a>
      <SEO title="Page two" />
      <h1 style={{ width: '100%' }}>Hi from the second page</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
    </>
  );
};

export default SecondPage;
