/* eslint-disable react/default-props-match-prop-types */
/* eslint-disable react/static-property-placement */
/* eslint-disable react/require-default-props */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';

// eslint-disable-next-line react/prefer-stateless-function
class LinkBar extends React.Component {
  // eslint-disable-next-line react/static-property-placement
  static propTypes = {
    /** Title of the table */
    // eslint-disable-next-line react/require-default-props
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]).isRequired,
    // eslint-disable-next-line react/require-default-props
    url: PropTypes.string.isRequired,
    classes: PropTypes.string,
  }

  static defaultProps = {
    title: 'NCI Cancer Research Data Commons',
    url: 'https://datacommons.cancer.gov/?cid=crdcnav_hp_caninecommons.cancer.gov',
  }

  render() {
    const {
      classes,
      title,
      url,
    } = this.props;

    return (
      <>
        <div className={classes.wrapper}>
          <a className={classes.link} href={url}>{title}</a>
        </div>
      </>
    );
  }
}

const styles = () => ({
  wrapper: {
    width: '100%',
    height: '20px',
    margin: '0 auto',
    display: 'flex',
    position: 'fixed',
    justifyContent: 'center',
    alignItems: 'center',
    top: '0px',
    zIndex: '1201',
    background: '#F1F1F1',
    borderBottom: '1px #999999 solid',
  },
  link: {
    textDecoration: 'none',
    color: '#333333',
    fontFamily: 'Raleway',
    fontSize: '10px',
  },

});

export default withStyles(styles)(LinkBar);
