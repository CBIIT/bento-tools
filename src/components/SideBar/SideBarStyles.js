const styles = (theme) => ({
  drawerPaperRoot: {
    backgroundColor: 'transparent',
  },
  drawer: {
    width: 240,
    flexShrink: 0,
  },
  drawerPaper: {
    width: '250px',
    height: 'auto',
    zIndex: '90',
    position: 'relative',
    float: 'left',
    overflowX: 'hidden',
    overflowY: 'auto',
    border: 'none',
  },
  floatRight: {
    margin: '7px 0px 7px 6px',
  },
  floatLeft: {
    float: 'left',
  },
  filterTitle: {
    marginTop: '18px',
    marginLeft: '45px',
    color: '#218CD3',
    fontFamily: 'Lato',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  funnelLogoImg: {
    width: '20px',
    height: '20px',
  },
  clearAllButtonRoot: {
    margin: 'auto',
  },
  customButton: {
    borderRadius: '5px',
    maxWidth: '30px',
    maxHeight: '30px',
    minWidth: '30px',
    minHeight: '30px',
    marginTop: '0px',
    fontSize: 9,
    textTransform: 'none',
    color: '#3d4241',
    marginLeft: '0px',
    fontFamily: theme.custom.fontFamily,
    '&:hover': {
      backgroundColor: '#566672',
      color: 'white',
    },
  },
  resetText: {
    marginTop: '0px',
    marginLeft: '8px',
    color: '#638FB5',
    fontSize: 14,
  },
  listRoot: {
    paddingTop: 0,
    paddingBottom: 1,
    maxHeight: '1300px',
    maxWidth: '100%',
    overflowX: 'hidden',
    overflowY: 'overlay',
    borderBottom: 'thin solid #B1B1B1',
  },
  dividerRoot: {
    backgroundColor: '#B0CFE1',
    marginLeft: '45px',
    height: '1px',
  },
});

export default styles;
