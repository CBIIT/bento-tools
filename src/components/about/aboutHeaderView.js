import React from 'react';
import injectSheet from 'react-jss';

const AboutHeader = ({ classes, title }) => (
  <div className={classes.container}>
    <div className={classes.header}>
      <div id="about_title" className={classes.titleBody}><span className={classes.titleText}>{title}</span></div>
    </div>
    <div className={classes.whitePadding} />
  </div>
);

const styles = () => ({
  header: {
    padding: '45px',
  },
  container: {
    background: '#e7eef5',
  },
  whitePadding: {
    height: '6px',
    background: 'white',
  },
  titleBody: {
    textAlign: 'center',
  },
  titleText: {
    height: '65px',
    width: '252px',
    color: '#0077E3',
    fontFamily: 'Lato',
    fontSize: '35px',
    fontWeight: 'bold',
  },
});

const header = injectSheet(styles)(AboutHeader);
export default header;
