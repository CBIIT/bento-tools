// Ref: https://github.com/mui-org/material-ui/issues/8726#issuecomment-363546636
import React from 'react';
import {
  withStyles,
} from '@material-ui/core';

const withStylesProps = (styles) => (Component) => (props) => {
  // const { styles } = props;
  const Comp = withStyles(styles)(Component);
  return <Comp props={props} />;
};

export default withStylesProps;
