/* eslint-disable no-use-before-define */
import React from 'react';
import {
  Button,
  withStyles,
} from '@material-ui/core';

function LoginButton({ classes }) {
  return (
    <Button
      id="login button"
      disableRipple
      weight="medium"
      className={classes.logotype}
      classes={{ root: classes.buttonRoot }}
    >
      LOGIN
    </Button>
  );
}

const styles = () => ({
  logotype: {
    whiteSpace: 'nowrap',
    color: '#FFFFFF',
    fontSize: '11px',
    '&:hover, &:focus': {
      borderRadius: '0',
    },
  },

  buttonRoot: {
    padding: '9px 20px 0px 20px',
  },

});

const StyledLoginButton = withStyles(styles)(LoginButton);
export default StyledLoginButton;
