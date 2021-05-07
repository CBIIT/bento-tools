import React from 'react';
import { withStyles, Icon } from '@material-ui/core';

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

export default withStyles(styles)(CustomIcon);
