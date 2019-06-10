import React, { useState, useEffect, useMemo } from 'react';
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
import { withPrefix } from 'gatsby';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useScrollPosition from '@nfront/use-scroll-position';
import { ListItemLink } from '../utils/Link';

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

const NavItemLink = props => {
  const { top, to, icon, primary, secondary, handleDrawerClose, isHome } = props;

  return (
    <ListItemLink to={to} onClick={handleDrawerClose} isHome={isHome}>
      {icon && <ListItemIcon>{icon}</ListItemIcon>}
      <ListItemText primary={primary} secondary={secondary} primaryTypographyProps={top && { variant: 'h6' }} />
    </ListItemLink>
  );
};

const generateNavLinks = (nav, pathname) => {
  console.log('SETTING UP NAVLINKS. pathname:', pathname);
  // Returns new array of navlinks
  return nav.map((navItem, index) => (
    <NavItemLink
      top
      key={navItem.name}
      to={navItem.path}
      primary={navItem.name}
      isHome={pathname === withPrefix('/')}
    />
  ));
};

const getScrolledPastHeader = (phone, theme, scrollY) => {
  const headerHeight = phone ? theme.mixins.toolbar.minHeightPhone : theme.mixins.toolbar.minHeightDesktop;
  console.log('headerHeight, scrollY', headerHeight, scrollY);
  return scrollY > headerHeight;
};

const Header = props => {
  const { location, siteTitle, children, nav } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const phone = !useMediaQuery('(min-width:768px)'); // 768 and down: Smartphones
  const scrollPosition = useScrollPosition(100);

  const scrolledPastHeader = useMemo(() => getScrolledPastHeader(phone, theme, scrollPosition.scrollY), [
    phone,
    theme,
    scrollPosition.scrollY,
  ]);
  console.log('scrolledPastHeader', scrolledPastHeader);

  console.log('RENDERING HEADER, ONCE PER PAGE. NOW AT:', location.pathname);

  // Close drawer when swapping from phone to desktop size
  useEffect(() => {
    if (!phone && drawerOpen) handleDrawerClose();
  }, [phone, drawerOpen]);

  const navLinks = useMemo(() => generateNavLinks(nav, location.pathname), [location.pathname, nav]);

  function handleDrawerOpen(e) {
    e && e.stopPropagation();
    console.log('OPENING DRAWER');
    setDrawerOpen(true);
  }

  function handleDrawerClose(e) {
    e && e.stopPropagation();
    console.log('CLOSING DRAWER');
    setDrawerOpen(false);
  }

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classNames(classes.appBar, {
          [classes.appBarShift]: drawerOpen,
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
            className={classNames(drawerOpen && classes.hide, !phone && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <HorNavRight component="nav" hide={phone}>
            {navLinks}
          </HorNavRight>
        </Toolbar>
      </AppBar>
      <Container id="mainPage" onClick={handleDrawerClose}>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: drawerOpen,
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
        open={drawerOpen}
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
        <List component="nav">{navLinks}</List>
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
