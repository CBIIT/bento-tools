import React, { useContext } from 'react';
import { useDispatch, connect } from 'react-redux';
import {
  makeStyles,
} from '@material-ui/core';
import DEFAULT_SIDEBAR_GROUP_FUNCTIONS from './GroupFunctions';
import DEFAULT_SIDEBAR_GROUP_UI from './GroupUI';
import DEFAULT_SIDEBAR_GROUP_STYLES from './GroupStyles';

const GroupController = (props) => {
  const {
    configProps,
    dashboardContext,
    currentSection,

    // Redux Store properties object
    reduxStateValues,
  } = props;

  const {
    dashboardFunctions,
  } = useContext(dashboardContext);

  const { sideBarGroups } = configProps;

  const ComponentFunctions = sideBarGroups.functions || DEFAULT_SIDEBAR_GROUP_FUNCTIONS;
  const ComponentUI = sideBarGroups.ui || DEFAULT_SIDEBAR_GROUP_UI;
  const ComponentStyles = sideBarGroups.styles || DEFAULT_SIDEBAR_GROUP_STYLES;
  const ComponentProps = sideBarGroups.props || {};

  // Selected Group Value.
  Object.assign(ComponentProps, { currentSection });

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
    sortByList = {},
  } = state.dashboardTab;

  const reduxStateValues = {
    sideBarContent: checkbox,
    sortByForGroups: sortByList,
  };

  return { reduxStateValues };
}

export default connect(mapStateToProps)(GroupController);
