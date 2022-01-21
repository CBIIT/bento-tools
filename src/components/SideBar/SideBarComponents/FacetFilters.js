import React, { useContext } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
  ExpansionPanelSummary,
  withStyles,
  makeStyles,
} from '@material-ui/core';
import DEFAULT_FACETFILTER_UI from './FacetFilter/ExpandableSection.UI';
import DEFAULT_STYLES from './FacetFilter/ExpandableSection.Style';
import ExpandableSectionLogic from './FacetFilter/ExpandableSection.Logic';

const CustomExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 48,
    '&$expanded': {
      minHeight: 48,
    },
  },
  content: {
    '&$expanded': {
      margin: '16px 0',
    },
  },
  expanded: {},
})(ExpansionPanelSummary);

const FacetPanelStyled = (props) => {
  const useStyles = makeStyles(DEFAULT_STYLES);
  const classes = useStyles();

  const {
    DashboardContext,
    config,
  } = props;

  const {
    dashboardFunctions,
  } = useContext(DashboardContext);

  const dispatch = useDispatch();

  const Logic = config.functions || ExpandableSectionLogic;
  const FacetFilterUI = DEFAULT_FACETFILTER_UI;
  const styles = DEFAULT_STYLES;

  return (
    <Logic
      {...props}
      dashboardFunctions={dashboardFunctions}
      dispatch={dispatch}
      classes={classes}
      CustomExpansionPanelSummary={CustomExpansionPanelSummary}
      ui={FacetFilterUI}
      styles={styles}
    />
  );
};

// data from store
function mapStateToProps(state) {
  const {
    checkbox = { data: [], defaultPanel: false },
    setSideBarLoading = false,
    isDashboardTableLoading = false,
    sortByList = {},
  } = state.dashboardTab;

  return {
    sideBarContent: checkbox,
    isSidebarLoading: setSideBarLoading,
    tabDataLoading: isDashboardTableLoading,
    sortByForGroups: sortByList,
  };
}

export default connect(mapStateToProps)(FacetPanelStyled);
