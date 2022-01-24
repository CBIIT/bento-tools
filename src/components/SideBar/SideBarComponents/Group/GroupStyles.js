const styles = () => ({
  expansionPanelsideBarItem: {
    boxShadow: 'none',
    borderTop: 'thin solid #B1B1B1',
    '&:last-child': {
      borderBottom: '1px solid #B1B1B1',
    },
    margin: 'auto',
    position: 'initial',
    '&:before': {
      position: 'initial',
    },
  },
  dropDownIconSubSection: {
    marginLeft: '0px',
    fill: '#000000',
  },
  sectionSummaryText: {
    marginLeft: '-6px',
    color: '#000000',
    fontFamily: 'Open Sans',
    fontWeight: '300',
    fontSize: '20px',
    lineHeight: '26px',
    letterSpacing: 0,
  },
  subSectionSummaryText: {
    marginLeft: '10px',
    color: '#000000',
    fontFamily: 'Open Sans',
    fontWeight: '600',
    fontSize: '14px',
    textTransform: 'uppercase',
    lineHeight: 0,
    letterSpacing: 0,
    flexShrink: 0,
  },
  customExpansionPanelSummaryRoot: {
    flexDirection: 'row-reverse',
    paddingLeft: 4,
  },
  sortGroup: {
    borderTop: '1px solid #B1B1B1',
    textAlign: 'left',
  },
  sortGroupItem: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '10px',
    marginRight: '42px',
  },
  sortGroupItemCounts: {
    cursor: 'pointer',
    fontFamily: 'Nunito',
    fontSize: '10px',
  },
  sortGroupIcon: {
    cursor: 'pointer',
    marginRight: '12px',
    marginLeft: '16px',
  },
  selected: {},
  selectedCheckboxDisplay: {
    maxHeight: '200px',
    overflow: 'auto',
  },
  showMore: {
    float: 'right',
    paddingRight: '5px',
    cursor: 'pointer',
    fontSize: '10px',
  },
});

export default styles;
