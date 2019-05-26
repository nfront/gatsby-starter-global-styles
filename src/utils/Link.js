import React from 'react';
import { Link as GatsbyLink } from 'gatsby';

function Link(props) {
  // DOM elements <a> cannot receive activeClassName
  // and partiallyActive, so we destructure the prop here and
  // pass those props only to GatsbyLink
  const { children, to, activeClassName, partiallyActive, ...other } = props;
  console.log('Link props:', props);

  // Captures all paths starting with /, except those starting with // and /#
  const LOCAL_URL_EXCEPT_IN_ROUTE = /^\/(?!\/)(?!\#)/;
  const gatsbyLink = LOCAL_URL_EXCEPT_IN_ROUTE.test(to);

  // return <ListItem button component={comp} href={to} {...props} />;

  if (gatsbyLink) {
    return (
      <GatsbyLink to={to} activeClassName={activeClassName} partiallyActive={partiallyActive} {...other}>
        {children}
      </GatsbyLink>
    );
  }
  return (
    <a href={to} {...other}>
      {children}
    </a>
  );
}

export default Link;
