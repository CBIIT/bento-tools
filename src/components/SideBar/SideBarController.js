import React, { useContext } from 'react';
import { connect } from 'react-redux';
import DEFAULT_SIDEBAR_FUNCTIONS from './SideBarFunctions';
import DEFAULT_SIDEBAR_UI from './SideBarUI';
import DEFAULT_SIDEBAR_STYLES from './SideBarStyles';

const SideBarController = (props) => {
  const {
    configProps,
    dashboardContext,

    // Redux Store properties object
    reduxStateValues,
  } = props;

  const {
    dashboardFunctions,
  } = useContext(dashboardContext);

  const { sideBar } = configProps;

  const ComponentFunctions = sideBar.functions || DEFAULT_SIDEBAR_FUNCTIONS;
  const ComponentUI = sideBar.ui || DEFAULT_SIDEBAR_UI;
  const ComponentStyles = sideBar.styles || DEFAULT_SIDEBAR_STYLES;
  const ComponentProps = sideBar.props || {};

  // Adding store values in "ComponentProps"
  Object.assign(ComponentProps, reduxStateValues);

  return (
    <ComponentFunctions
      ComponentUI={ComponentUI}
      ComponentStyles={ComponentStyles}
      configProps={configProps}
      dashboardFunctions={dashboardFunctions}
      dashboardContext={dashboardContext}
      {...ComponentProps}
    />
  );
};

// data from store
function mapStateToProps(state) {
  const { allActiveFilters = {} } = state.dashboardTab;
  const reduxStateValues = {
    activeFilters: allActiveFilters,
  };

  return { reduxStateValues };
}

export default connect(mapStateToProps)(SideBarController);
