import React from 'react';
import { HashRouter, NavLink } from 'react-router-dom';
import {
  AppBar,
  Button,
  Toolbar,
  Tooltip,
  withStyles,
} from '@material-ui/core';
import classnames from 'classnames';
import DropdownMenu from './components/DropdownMenu';

const drawerWidth = 240;
// const FENCE_LOGIN_URL = process.env.FENCE_LOGIN_URL;
// const FENCE_LOGIN_URL = process.env.REACT_APP_LOGIN_URL;
// const BACKEND_GETUSERINFO_API = 'https://k9dc.essential-dev.com/fence/login/';

const NavBar = ({
  classes, isSidebarOpened, navBarData, navBarCartData, navBarstyling,
}) => {
  // const theme = useTheme();
  // const [authState, setAuthState] = React.useState({
  //   isAuthorized: localStorage.getItem('isAuthorized') === 'true',
  // });

  // Similar to componentDidMount and componentDidUpdate:
  // Empty second argument of react useEffect will avoid the infinte loop that
  // caused due to component update
  const [clickedEl, setClickedEl] = React.useState(null);

  function handleButtonClickEvent(eventName) {
    setClickedEl(eventName);
  }

  // React.useEffect(() => {
  //   const values = {};

  //   if (values.code) {
  //     fetch(BACKEND_GETUSERINFO_API + values.code)
  //       .then((response) => {
  //         if (!response.ok) {
  //           throw Error(response.statusText);
  //         }
  //         return response.json();
  //       })
  //       .then((result) => {
  //         setAuthState({
  //           ...authState,
  //           isAuthorized: true,
  //         });
  //         localStorage.setItem('username', JSON.stringify(result.user));
  //         localStorage.setItem('isAuthorized', 'true');
  //       })
  //       .catch(() => {
  //         // Ajay Need to update this
  //         // setAuthState(
  //         //  { ...authState, username: "", isAuthorized: false }
  //         //  );
  //         // localStorage.setItem("isAuthorized", "false");
  //       });
  //   }
  // }, []);

  const numberOfCases = 0;

  // const activeFilters = useSelector((state) => (
  //   state.dashboard.datatable
  //     && state.dashboard.datatable.filters
  //     ? state.dashboard.datatable.filters : []));
  return (
    <>
      <AppBar
        position="fixed"
        className={classnames(classes.appBar, {
          [classes.appBarShift]: isSidebarOpened,
        })}
      >
        <Toolbar className={classes.toolbar}>

          {/* Sidebar button */}

          {/* End Sidebar button */}
          <div id="navbar" className={classes.buttonContainer}>
            {navBarData.slice(0, 5).map((navButton) => (
              navButton.type === 'dropdown'
                ? (
                  <DropdownMenu
                    handleButtonClickEvent={handleButtonClickEvent}
                    clickedEl={clickedEl}
                    linkText={navButton.labelText}
                    dropDownElements={navButton.dropDownLinks.slice(0, 9)}
                    navBarstyling={navBarstyling}
                  />
                )
                : (
                  <Button id="button_navbar_navButton" disableRipple weight="medium" className={classes.logotype} classes={{ root: classes.buttonRoot }}>
                    <HashRouter>
                      <NavLink
                        className={classes.labelText}
                        activeClassName={classes.activeLabel}
                        to={navButton.link ? navButton.link : '/'}
                        onClick={() => handleButtonClickEvent(`${navButton.labelText}`)}
                      >
                        {navButton.labelText}
                      </NavLink>
                    </HashRouter>
                  </Button>
                )
            ))}
          </div>
          {/* Start of Theme Switching Icon and logic */}
          <div className={classes.myCasesPosition}>
            <Button id="button_navbar_mycases" disableRipple weight="medium" className={classes.logotype} classes={{ root: classes.buttonRootNoRightPadding }}>
              <HashRouter>
                <NavLink
                  className={classes.cartLabelText}
                  to={navBarCartData.cartLink}
                >
                  {navBarCartData.cartLabel}
                  {/* <IconButton
                color="inherit"
                aria-haspopup="true"
                aria-controls="mail-menu"
                className={classes.headerMenuButton}
                classes={{ root: classes.iconButtonRoot }}
              > */}
                  {/* <Badge badgeContent={numberOfCases} max={99999}> */}

                  <Tooltip title="Cases" placement="bottom-end">
                    <span className={classes.badge}>
                      <img
                        className={classes.cartIcon}
                        src={navBarCartData.cartIcon}
                        alt={navBarCartData.cartIconAlt}
                      />
                      <span className={classes.cartCounter}>
                        {numberOfCases}
                      </span>
                    </span>
                  </Tooltip>

                  {/* </Badge> */}
                  {/* </IconButton> */}
                </NavLink>
              </HashRouter>
            </Button>
          </div>
          {/* Login button functionality on Navigation bar */}

          {/* {authState.isAuthorized ? (
            <ProfileMenu />
          ) : (
            <Button href={FENCE_LOGIN_URL} color="inherit">
              LOGIN
            </Button>
          )} */}
          {/* End Login button functionality on Navigation bar */}

        </Toolbar>
      </AppBar>
      {/* { (location.pathname === '/cases') && (
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={isSidebarOpened}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerAppBar}>
            <div className={classes.floatLeft}>
              <Button
                variant="outlined"
                disabled={activeFilters.length === 0}
                onCl
                className={classes.customButton}
                classes={{ root: classes.clearAllButtonRoot }}
                onClick={() => dispatch(toggleCheckBox(unselectFilters(activeFilters)))}
                disableRipple
              >
              Clear All
              </Button>
            </div>
            <div className={classes.floatRight} onClick={toggleSidebar}>
              <IconButton classes={{ root: classes.iconCartButtonRoot }}>
                <img
                  className={classes.funnelLogoImg}
                  src={funnelIconBlue}
                  alt="funnel_image"
                />
              </IconButton>
            </div>
          </div>
          <Divider />
          <SideBarContent />
        </Drawer>
      )} */}
    </>
  );
};

const styles = () => ({
  myCasesPosition: {
    position: 'absolute',
    right: '20px',
  },
  logotype: {
    whiteSpace: 'nowrap',
    color: '#FFFFFF',
    fontFamily: 'Raleway',
    fontSize: '11px',
    letterSpacing: '1.25px',
    fontWeight: '800',
    '&:hover, &:focus': {
      borderRadius: '0',
    },
  },
  buttonContainer: {
    margin: '0 auto',
  },
  appBar: (props) => ({
    backgroundColor: props.navBarstyling.global.backgroundColor ? props.navBarstyling.global.backgroundColor : '#142D64',
    marginTop: '100px',
    width: '100vw',
    // zIndex: theme.zIndex.drawer + 1,
    // transition: theme.transitions.create(['margin'], {
    //   easing: theme.transitions.easing.sharp,
    //   duration: theme.transitions.duration.leavingScreen,
    // }),
  }),
  cartIcon: {
    width: '22px',
    height: '22px',
    margin: '0px 0px 0px 6px',
  },
  labelText: {
    textDecoration: 'none',
    color: '#FFFFFF',
    fontFamily: 'Nunito',
    fontSize: '13px',
  },
  cartLabelText: {
    textDecoration: 'none',
    color: '#FFFFFF',
    fontFamily: 'Nunito',
    fontSize: '13px',
  },
  activeLabel: {
    borderBottom: '1px solid  #FFFFFF',
  },
  appBarShift: {
    paddingRight: '0px !important',
    width: '100%',
    marginLeft: drawerWidth,
    // transition: theme.transitions.create(['margin', 'width'], {
    //   easing: theme.transitions.easing.easeOut,
    //   duration: theme.transitions.duration.enteringScreen,
    // }),
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  toolbar: (props) => ({
    minHeight: props.navBarstyling.global.height ? props.navBarstyling.global.height : '39px',
    paddingRight: '45px',
    paddingLeft: '45px',
    alignItems: 'flex-start',
  }),
  buttonRoot: (props) => ({
    padding: props.navBarstyling.global.padding ? props.navBarstyling.global.padding : '9px 20px 0px 20px',
  }),
  buttonRootNoRightPadding: (props) => ({
    padding: props.navBarstyling.global.padding ? props.navBarstyling.global.padding : '9px 20px 0px 20px',
  }),
  badge: {
    display: 'inline-flex',
    position: 'relative',
    verticalAlign: 'middle',
  },
  cartCounter: {
    height: '16px',
    minWidth: '16px',
    fontWeight: '600',
    letterSpacing: '0.8px',
    transform: 'scale(1) translate(0%, -50%)',
  },
  iconButtonRoot: {
    paddingTop: '9px',
    paddingLeft: '0px',
  },
  floatRight: {
    float: 'right',
  },
  floatLeft: {
    float: 'left',
    marginTop: '6px',
    marginLeft: '10px',
  },
  funnelLogoImg: {
    width: '20px',
    height: '20px',
  },
  clearAllButtonRoot: {
    margin: 'auto',
  },
  customButton: {
    borderRadius: '100px',
    borderLeft: '0px',
    minHeight: '20px',
    fontSize: 9,
    textTransform: 'none',
    color: 'black',
    marginLeft: '16px',
    // fontFamily: theme.custom.fontFamilySans,
    '&:hover': {
      backgroundColor: '#566672',
      color: 'white',
    },
  },
  drawerAppBar: {
    height: '45px',
  },
  drawerPaper: {
    width: drawerWidth,
    marginTop: '100px',
    zIndex: '1201',
    height: 'calc(100% - 100px)',
  },
  // headerMenuButton: {
  //   marginLeft: theme.spacing.unit,
  //   padding: theme.spacing.unit / 2,
  // },
});

NavBar.defaultProps = {
  classes: {},
  navBarstyling: {},
};

const StyledNavBar = withStyles(styles)(NavBar);
export default StyledNavBar;
