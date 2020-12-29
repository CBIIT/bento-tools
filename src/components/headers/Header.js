import React from 'react';
import injectSheet from 'react-jss';
import RouteLinks from '../helpers/routeLinks';
import nihLogo from '../assets/header/CTDC_Logo.svg';

const styles = {
  grow: {
    flexGrow: 3,
  },
  headerBar: {
    color: '#8A95A7',
    width: '100%',
    height: '100px',
    margin: '0 auto',
    display: 'flex',
    position: 'fixed',
    minHeight: '100px',
    justifyContent: 'space-between',
    top: '0px',
    zIndex: '1201',
    background: '#ffffff',
  },
  nihLogoContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  icdcLogoContainer: {
    display: 'flex',
    width: '100%',
    paddingLeft: '24px',
    background: (props) => `url(${props.easter})` || '',
    overflow: 'hidden',
    '@media (min-width: 2400px)': {
      backgroundRepeat: 'no-repeat',
      backgroundSize: '100% 100%',
    },
  },
  nihLogoImg: (props) => ({
    height: props.nihLogoImg.height,
    width: props.nihLogoImg.width,
    marginLeft: props.nihLogoImg.marginLeft,
    minWidth: '200px',
    minHeight: '60px',
    maxHeight: '80px',
    maxWidth: '460px',
    cursor: 'pointer',
    marginLeft: '45px',
  }),

};

const Header = ({ classes, ...props }) => {
  const { logo, alt, homeLink } = props;
  return (
    <div id="header" className={classes.headerBar}>
      <div className={classes.nihLogoContainer}>
        <RouteLinks to={homeLink}>
          <img
            className={classes.nihLogoImg}
            src={logo}
            alt={alt}
          />
        </RouteLinks>
      </div>
      <div className={classes.icdcLogoContainer}>
        <div className={classes.grow} />
      </div>
    </div>
  );
};

Header.defaultProps = {
  logo: nihLogo,
  alt: 'NCI CTDC Logo - Clinical Trials Data Commons',
  homeLink: '/',
  nihLogoImg:{}
};

const StyledHeader = injectSheet(styles)(Header);
export default StyledHeader;
