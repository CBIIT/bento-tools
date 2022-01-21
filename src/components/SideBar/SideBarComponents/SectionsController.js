import React, { useContext } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
  makeStyles,
} from '@material-ui/core';
import DEFAULT_SIDEBAR_SECTION_FUNCTIONS from './Sections/SectionsFunctions';
import DEFAULT_SIDEBAR_SECTION_UI from './Sections/SectionsUI';
import DEFAULT_SIDEBAR_SECTION_STYLES from './Sections/SectionsStyles';

const SectionsController = (props) => {
  const {
    configProps,
    dashboardContext,

    // Redux Store properties object
    reduxStateValues,
  } = props;

  const {
    dashboardFunctions,
  } = useContext(dashboardContext);

  const { sideBarSections } = configProps;

  const ComponentFunctions = sideBarSections.functions || DEFAULT_SIDEBAR_SECTION_FUNCTIONS;
  const ComponentUI = sideBarSections.ui || DEFAULT_SIDEBAR_SECTION_UI;
  const ComponentStyles = sideBarSections.styles || DEFAULT_SIDEBAR_SECTION_STYLES;
  const ComponentProps = sideBarSections.props || {};

  // Adding store values in "ComponentProps"
  Object.assign(ComponentProps, reduxStateValues);

  // Extra Items that we can not do in class
  const useStyles = makeStyles(ComponentStyles);
  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <ComponentFunctions
      ComponentUI={ComponentUI}
      ComponentStyles={ComponentStyles}
      configProps={configProps}
      dashboardFunctions={dashboardFunctions}
      dashboardContext={dashboardContext}
      {...ComponentProps}
      // Extra Props Component specific
      dispatch={dispatch}
      classes={classes}
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

  const reduxStateValues = {
    sideBarContent: checkbox,
    isSidebarLoading: setSideBarLoading,
    tabDataLoading: isDashboardTableLoading,
    sortByForGroups: sortByList,
  };

  return { reduxStateValues };
}

export default connect(mapStateToProps)(SectionsController);
