import React from 'react';
import { withStyles, Icon } from '@material-ui/core';
import injectSheet from 'react-jss';

const CustomIcon = ({ imgSrc, classes }) => (
  <Icon>
    <img src={imgSrc} className={classes.root} alt="sample alt" />
  </Icon>
);

const styles = () => ({
  root: {
    userSelect: 'none',
    width: '1em',
    height: '1em',
    display: 'inline-block',
    fill: 'currentColor',
    flexShrink: 0,
  },
});

const StyledCustomIcon = injectSheet(styles)(CustomIcon);

export default withStyles(styles)(StyledCustomIcon);
