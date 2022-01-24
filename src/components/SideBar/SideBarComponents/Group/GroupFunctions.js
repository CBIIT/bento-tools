/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import _ from 'lodash';
import CheckBox from '../CheckBoxController';

class GroupFunctions extends Component {
    groupNameColor = '';

    resetIconSize = '10px';

    constructor(props) {
      super(props);
      //   Object.assign(this, props);
      this.state = {
        groupsExpanded: [],
      };
    }

    setDefaultGroupsExpanded = () => {
      const { groupsExpanded } = this.state;
      const { sideBarContent } = this.props;
      if (!groupsExpanded || !(groupsExpanded === `${sideBarContent.defaultPanel}false` || groupsExpanded !== false)) {
        this.setState({ groupsExpanded: sideBarContent.defaultPanel });
      }
    }

    getGroupNameColor = (sideBarItem, currentSection) => {
      this.groupNameColor = 'black';
      const { facetSectionVariables, defaultFacetSectionVariables } = this.props;
      sideBarItem.checkboxItems.map(
        (item) => {
          if (item.isChecked) {
            this.groupNameColor = facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].color ? facetSectionVariables[currentSection.sectionName].color : '' : defaultFacetSectionVariables.color;
          }
          return '';
        },
      );
      return this.groupNameColor;
    }

    handleGroupsChange = (panel) => (event, isExpanded) => {
      const { groupsExpanded } = this.state;
      const groups = _.cloneDeep(groupsExpanded);
      if (isExpanded) {
        groups.push(panel);
      } else {
        const index = groups.indexOf(panel);
        if (index > -1) {
          groups.splice(index, 1);
        }
      }
      this.setState({ groupsExpanded: groups });
    };

    handleGroupReset = (dataField, groupName) => () => {
      const { dashboardFunctions, dispatch } = this.props;
      dashboardFunctions.setSideBarToLoading();
      dashboardFunctions.setDashboardTableLoading();
      // dispatch toggleCheckBox action
      dispatch(dashboardFunctions.resetGroupSelections({ dataField, groupName }));
    };

    sideBarDisplay = () => {
      const { sideBarContent } = this.props;
      return sideBarContent.data.filter((sideBar) => sideBar.show === true).slice(0, 15);
    }

    arrangeBySections = (arr) => {
      const sideBar = {};
      arr.forEach(({ section, ...item }) => {
        if (!sideBar[section]) {
          sideBar[section] = { sectionName: section, items: [] };
        }
        sideBar[section].items.push({ section, ...item });
      });
      return Object.values(sideBar);
    };

    getSortButtonColor = (sideBarItem, sortType) => {
      const { sortByForGroups } = this.props;
      return (sortByForGroups[sideBarItem.groupName] === sortType
        ? '#B2C6D6' : '#4A4A4A');
    }

    showSelectedChecbox = (sideBarItem, currentSection) => {
      const {
        classes, configProps, dashboardContext, showCheckboxCount, sortLabels,
      } = this.props;
      const selectedItems = sideBarItem.checkboxItems.filter((item) => (item.isChecked));
      const selectedCheckbox = selectedItems.slice(0, showCheckboxCount)
        .map((item, index) => (
          <CheckBox
            key={index}
            configProps={configProps}
            dashboardContext={dashboardContext}
            checkboxItem={item}
            sideBarItem={sideBarItem}
            currentSection={currentSection}
            checkColor={this.getGroupNameColor(sideBarItem, currentSection)}
          />
        ));

      return (
        <div>
          {selectedCheckbox}
          {selectedItems.length > showCheckboxCount && (
          <div className={classes.clearfix}>
            <div
              className={classes.showMore}
              onClick={(e) => (this.handleGroupsChange(sideBarItem.groupName)(e, true))}
            >
              {sortLabels.showMore}
            </div>
          </div>
          )}
        </div>
      );
    };

    render() {
      this.setDefaultGroupsExpanded();

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

export default GroupFunctions;
