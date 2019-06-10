import React from 'react';
import { Link as GatsbyLink } from 'gatsby';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, makeStyles } from '@material-ui/styles';
import ListItem from '@material-ui/core/ListItem';
import { Link as SmoothScrollLink } from 'react-scroll';

function Link(props) {
  const { children, to, activeClassName, partiallyActive, isHome, ...other } = props;
  const LOCAL_URL = /^\/(?!\/)/;
  const HASH_URL = /^\/(?=#)/;

  function stopPropagation(e) {
    e.stopPropagation();
  }

  if (!LOCAL_URL.test(to)) {
    // Foreign route, use <a>
    // All routes starting with a single slash
    // Except those with a second slash thereafter
    return (
      <a href={to} {...other} onClick={stopPropagation}>
        {children}
      </a>
    );
  }

  // Local route, either with hashtag or not
  if (HASH_URL.test(to)) {
    // hash URL, should use <a> on HomePage, otherwise Gatsby Link
    if (isHome) {
      // Hash link at home page (in-route), should use <a>
      return (
        <a href={to} {...other} onClick={stopPropagation}>
          {children}
        </a>
      );
    }
    // Hash link at NOT at home page, should use Gatsby Link
    return (
      <GatsbyLink
        to={to}
        activeClassName={activeClassName}
        partiallyActive={partiallyActive}
        {...other}
        onClick={stopPropagation}
      >
        {children}
      </GatsbyLink>
    );
  }

  // Regular local route, not hash route, should use Gatsby Link
  return (
    <GatsbyLink
      to={to}
      activeClassName={activeClassName}
      partiallyActive={partiallyActive}
      {...other}
      onClick={stopPropagation}
    >
      {children}
    </GatsbyLink>
  );
}

const RenderLink = React.forwardRef((itemProps, ref) => (
  // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
  // Components using RenderLink, can get a ref to the underlying Link
  // component (for focus etc.)
  <GatsbyLink {...itemProps} ref={ref} />
));

const useStyles = makeStyles(theme => ({
  onSpy: {
    textDecoration: 'none',
    backgroundColor: theme.palette.action.hover,
  },
}));

function ListItemLink(props) {
  const phone = !useMediaQuery('(min-width:768px)');
  const theme = useTheme();
  const { to, isHome, ...other } = props;
  const LOCAL_URL = /^\/(?!\/)/;
  const HASH_URL = /^\/(?=#)/;
  const classes = useStyles();

  if (!LOCAL_URL.test(to)) {
    // Foreign route, use <a>
    // All routes starting with a single slash
    // Except those with a second slash thereafter
    // console.log('Foreign route, use <a>:', to);
    return <ListItem button component="a" href={to} {...other} />;
  }

  // Local route, either with hashtag or not
  if (HASH_URL.test(to)) {
    // hash URL, should use <a> on HomePage, otherwise Gatsby Link
    if (isHome) {
      // Hash link at home page (in-route), should use <a>
      // Remove slash and hashtag
      const cutTo = to.substring(2);
      // return <SmoothScrollLink to={cutTo} spy smooth offset={50} duration={500} {...other} onClick={stopPropagation} />;
      // TODO: Close drawer when clicked (right now, click event does not bubble at all)
      return (
        <ListItem
          activeClass={classes.onSpy}
          button
          component={SmoothScrollLink}
          to={cutTo}
          spy
          smooth
          offset={(phone ? -theme.mixins.toolbar.minHeightPhone : -theme.mixins.toolbar.minHeightDesktop) - 20}
          duration={500}
          {...other}
        />
        // <ListItem button component={RenderLink} to={to} onClick={() => console.log('click on Link')} {...other} />
      );
      // return <a href={to} {...other} onClick={stopPropagation} />;
    }
    // console.log('Hash link at NOT at home page, should use Link:', to);
    // Hash link at NOT at home page, should use Link
    return <ListItem button component={RenderLink} to={to} {...other} />;
  }

  // console.log('Regular local route, not hash route, should use Gatsby Link:', to);
  // Regular local route, not hash route, should use Gatsby Link
  return <ListItem button component={RenderLink} to={to} {...other} />;
}

export { Link, ListItemLink };
