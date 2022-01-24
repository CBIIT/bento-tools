import React, { useContext } from 'react';
import { useDispatch, connect } from 'react-redux';
import DEFAULT_CHECKBOX_GROUP_FUNCTIONS from './CheckBoxFunctions';
import DEFAULT_CHECKBOX_GROUP_UI from './CheckBoxUI';
import DEFAULT_CHECKBOX_GROUP_STYLES from './CheckBoxStyles';

const CheckBoxController = (props) => {
  const {
    configProps,
    dashboardContext,

    // Redux Store properties object
    // reduxStateValues,
  } = props;

  const {
    dashboardFunctions,
  } = useContext(dashboardContext);

  const { sideBarCheckBox } = configProps;

  const ComponentFunctions = sideBarCheckBox.functions || DEFAULT_CHECKBOX_GROUP_FUNCTIONS;
  const ComponentUI = sideBarCheckBox.ui || DEFAULT_CHECKBOX_GROUP_UI;
  const ComponentStyles = sideBarCheckBox.styles || DEFAULT_CHECKBOX_GROUP_STYLES;
  const ComponentProps = sideBarCheckBox.props || {};

  // Selected Group Value.
  Object.assign(ComponentProps, props);

  // Adding store values in "ComponentProps"
  // Object.assign(ComponentProps, reduxStateValues);

  // Extra Items that we can not do in class

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
    />
  );
};

// data from store
// eslint-disable-next-line no-unused-vars
function mapStateToProps(state) {
  // const { } = state.dashboardTab;

  const reduxStateValues = { };

  return { reduxStateValues };
}

export default connect(mapStateToProps)(CheckBoxController);
