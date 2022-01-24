/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class CheckBoxFunctions extends Component {
    groupNameColor = '';

    resetIconSize = '10px';

    constructor(props) {
      super(props);
      this.state = {
      };
    }

    getLineColor = (index, length) => {
      if (index === length - 1) {
        return '#FFFFFF';
      }
      return '#B1B1B1';
    }

    getCheckBoxColor = (index, currentSection) => {
      const { facetSectionVariables, defaultFacetSectionVariables } = this.props;
      return index % 2 ? facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].checkBoxColorsTwo ? facetSectionVariables[currentSection.sectionName].checkBoxColorsTwo : '' : defaultFacetSectionVariables.checkBoxColorsTwo
        : facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].checkBoxColorsOne ? facetSectionVariables[currentSection.sectionName].checkBoxColorsOne : '' : defaultFacetSectionVariables.checkBoxColorsOne;
    }

    handleToggle = (value) => () => {
      const valueList = value.split('$$');
      const { dashboardFunctions, dispatch } = this.props;
      dashboardFunctions.setSideBarToLoading();
      dashboardFunctions.setDashboardTableLoading();
      // dispatch toggleCheckBox action
      dispatch(dashboardFunctions.toggleCheckBox([{
        groupName: valueList[1],
        name: valueList[0],
        datafield: valueList[2],
        isChecked: !(valueList[3] === 'true'),
        section: valueList[4],
      }]));
    };

    render() {
      const { ComponentUI } = this.props;
      const props = {};
      Object.assign(props, this);
      Object.assign(props, this.props);
      Object.assign(props, this.state);

      return (
        <ComponentUI
          {...props}
        />
      );
    }
}

export default CheckBoxFunctions;
