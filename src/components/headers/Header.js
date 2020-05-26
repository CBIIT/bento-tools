import React from 'react';
import injectSheet from 'react-jss';
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
  nihLogoImg: {
    width: '463px',
    cursor: 'pointer',
  },
  icdcLogoImg: {
    margin: '22px 35px auto',
    height: '39px',
    cursor: 'pointer',
  },
};

const Header = ({ classes, logo }) => (
  <div id="header" className={classes.headerBar}>
    <div className={classes.nihLogoContainer}>
      <img
        className={classes.nihLogoImg}
        src={logo}
        alt="NCI CTDC Logo - Clinical Trials Data Commons"
      />

    </div>
    <div className={classes.icdcLogoContainer}>
      <div className={classes.grow} />
    </div>
  </div>
);

Header.defaultProps = {
  logo: nihLogo,
};

const StyledHeader = injectSheet(styles)(Header);
export default StyledHeader;
