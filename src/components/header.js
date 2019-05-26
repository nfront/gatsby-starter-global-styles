import React, { useState, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import { makeStyles, useTheme } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import styled from 'styled-components';
import { Link, withPrefix } from 'gatsby';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const drawerWidth = 240;

const Container = styled.div`
  /* margin: 0 auto; */
  max-width: 960;
  padding: 0px 1.1rem 1.5rem;
  padding-top: 0;
`;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  },
  title: {
    flexGrow: 1,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-start',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
    marginLeft: -drawerWidth,
  },
  gutter: {
    marginLeft: '2rem',
  },
}));

const HorNavRight = styled(({ hide, ...otherProps }) => <List {...otherProps} />)`
  margin-left: auto;
  margin-right: 1rem;
  display: ${props => (props.hide ? 'none' : 'flex')};
`;

const RenderLink = React.forwardRef((itemProps, ref) => (
  // with react-router-dom@^5.0.0 use `ref` instead of `innerRef`
  // Components using RenderLink, can get a ref to the underlying Link
  // component (for focus etc.)
  <Link {...itemProps} ref={ref} />
));

function ListItemLink(props) {
  // console.log('ResolvedLink', <ResolvedLink {...props} />);
  const { to, isHomePage, ...other } = props;
  // console.log('isHomePage:', isHomePage);
  const LOCAL_URL = /^\/(?!\/)/;
  const HASH_URL = /^\/(?=#)/;

  // const LOCAL_URL_INC_IN_ROUTE = /^\/(?!\/)(?=#)/;

  // Starting with slash, no second slash or hashtag
  // These are local links, excluding in-route
  // const LOCAL_URL_NOT_IN_ROUTE = /^\/(?!\/)(?!#)/;
  // const gatsbyLink = LOCAL_URL_NOT_IN_ROUTE.test(to);
  // const comp = gatsbyLink ? RenderLink : 'a';

  function stopPropagation(e) {
    console.log('stopping propagation');
    e.stopPropagation();
  }

  // return <a href={to} onClick={stopPropagation}>{props.children}</a>;
  // return <ListItem button component="a" href={to} {...other} onClick={stopPropagation} />;

  if (!LOCAL_URL.test(to)) {
    // Foreign route, use <a>
    // All routes starting with a single slash
    // Except those with a second slash thereafter
    console.log('Foreign route, use <a>:', to);
    return <ListItem button component="a" href={to} {...other} onClick={stopPropagation} />;
  }

  // Local route, either with hashtag or not
  if (HASH_URL.test(to)) {
    // hash URL, should use <a> on HomePage, otherwise Gatsby Link
    if (isHomePage()) {
      // Hash link at home page (in-route), should use <a>
      console.log('Hash link at home page (in-route), should use <a>:', to);
      // return <ListItem button component="a" href={to} {...other} onClick={stopPropagation} />;
      return <a href={to} {...other} onClick={stopPropagation} />;
    }
    console.log('Hash link at NOT at home page, should use Link:', to);
    // Hash link at NOT at home page, should use Link
    return <ListItem button component={RenderLink} to={to} {...other} onClick={stopPropagation} />;
  }

  console.log('Regular local route, not hash route, should use Gatsby Link:', to);
  // Regular local route, not hash route, should use Gatsby Link
  return <ListItem button component={RenderLink} to={to} {...other} onClick={stopPropagation} />;
}

const NavItemLink = props => {
  const { top, to, icon, primary, secondary, handleDrawerClose, isHomePage } = props;

  const closeDrawer = top ? () => {} : handleDrawerClose;
  return (
    <ListItemLink to={to} onClick={closeDrawer} isHomePage={isHomePage}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={primary} secondary={secondary} primaryTypographyProps={top && { variant: 'h6' }} />
    </ListItemLink>
  );
};

let navLinks = null;

const Header = props => {
  const { location, siteTitle, children, nav } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const phone = !useMediaQuery('(min-width:768px)'); // 768 and down: Smartphones

  const isHomePage = useCallback(() => {
    // useCallback ensures this handler only changes when location changes
    // That ensures the useEffect below can have isHomePage as a dependency
    const isHome = location.pathname === withPrefix('/');
    console.log('isHomePage:', isHome);
    return isHome;
  }, [location]);

  useEffect(() => {
    if (!phone) handleDrawerClose();
  }, [phone]);

  useEffect(() => {
    console.log('SETTING UP NAVLINKS...');
    navLinks = nav.map((navItem, index) => (
      <NavItemLink top key={navItem.name} to={navItem.path} primary={navItem.name} isHomePage={isHomePage} />
    ));
  }, [location, isHomePage, nav]);

  function handleDrawerOpen(e) {
    e && e.stopPropagation();
    console.log('OPENING DRAWER');
    setOpen(true);
  }

  function handleDrawerClose(e) {
    e && e.stopPropagation();
    console.log('CLOSING DRAWER');
    setOpen(false);
  }

  console.log('RENDERING HEADER, ONCE PER PAGE. NOW AT:', location);
  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        onClick={handleDrawerClose}
      >
        <Toolbar disableGutters={!phone}>
          <Typography variant="h6" noWrap className={classNames(classes.title, !phone && classes.gutter)}>
            nFront
          </Typography>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={classNames(open && classes.hide, !phone && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <HorNavRight component="nav" hide={phone}>
            {navLinks}
            {/* {nav.map((navItem, index) => (
              <NavItemLink top key={navItem.name} to={navItem.path} primary={navItem.name} isHomePage={isHomePage} />
            ))} */}
            <a
              href="#about"
              onClick={e => {
                e.stopPropagation();
              }}
            >
              Anchor
            </a>
          </HorNavRight>
        </Toolbar>
      </AppBar>
      <Container id="mainPage" onClick={handleDrawerClose}>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
          {children}
          <footer>
            © {new Date().getFullYear()}, Built with {` `} <a href="https://www.gatsbyjs.org">Gatsby</a>
          </footer>
        </main>
      </Container>
      <Drawer
        className={classNames(classes.drawer)}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List component="nav">
          {navLinks}
          {/* {nav.map((navItem, index) => (
            <NavItemLink
              key={navItem.name}
              to={navItem.path}
              icon={index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              primary={navItem.name}
              handleDrawerClose={handleDrawerClose}
              isHomePage={isHomePage}
            />
          ))} */}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
    </div>
  );
};

export default Header;
