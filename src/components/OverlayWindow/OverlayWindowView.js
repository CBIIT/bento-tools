import React, { useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import FiberManualRecord from '@material-ui/icons/FiberManualRecord';
// import { useSelector } from 'react-redux';
import * as defaultText from './defaultText.json';
import DialogThemeProvider from './OverlayWindowThemeConfig';

const OverlayWindow = ({
  body,
  header,
  store,
}) => {
  const [open, setOpen] = useState(false);

  const setOverLayWindow = (item) => {
    store.dispatch({ type: 'SET_OVERLAY_WINDOW', payload: item });
  };

  const handleClose = () => {
    setOpen(false);
    setOverLayWindow(false);
    sessionStorage.setItem('overlayLoad', 'true');
  };

  useEffect(() => {
    if (!sessionStorage.length) {
      setOpen(true);
      setOverLayWindow(true);
    }
  }, [open]);

  return (
    <>
      <div>
        <DialogThemeProvider>
          <Dialog
            open={open}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            maxWidth="md"
          >
            <DialogTitle id="alert-dialog-title">
              {header}
            </DialogTitle>
            <Divider />
            <DialogContent>
              {body}
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button onClick={handleClose}>
                Continue
              </Button>
            </DialogActions>
          </Dialog>
        </DialogThemeProvider>
      </div>
    </>
  );
};

const defaultBody = (
  <>
    {defaultText.content.map((item) => (
      <DialogContentText id="alert-dialog-description">
        {item}
      </DialogContentText>
    ))}
    {' By using this system, you understand and consent to the following: '}
    <List>
      {defaultText.list.map((item, index) => (
        <ListItem key={`${index}`}>
          <ListItemIcon>
            <FiberManualRecord style={{ fontSize: 8 }} />
          </ListItemIcon>
          <ListItemText>
            {item}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  </>
);

OverlayWindow.defaultProps = {
  body: defaultBody,
  header: 'Warning',
};

export default OverlayWindow;
