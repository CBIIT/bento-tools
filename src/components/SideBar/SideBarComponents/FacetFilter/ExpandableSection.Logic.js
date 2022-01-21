/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import _ from 'lodash';
import CheckBoxView from '../CheckBoxView';

class ExpandableSectionLogic extends Component {
    groupNameColor = '';

    size = '10px';

    constructor(props) {
      super(props);
      Object.assign(this, props);
      this.state = {
        groupsExpanded: [],
        sectionExpanded: [],
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

    getLineColor = (index, length) => {
      if (index === length - 1) {
        return '#FFFFFF';
      }
      return '#B1B1B1';
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

    handleSectionChange = (panel) => (event, isExpanded) => {
      const { sectionExpanded } = this.state;
      const sections = _.cloneDeep(sectionExpanded);
      if (isExpanded) {
        sections.push(panel);
      } else {
        const index = sections.indexOf(panel);
        if (index > -1) {
          sections.splice(index, 1);
        }
      }

      this.setState({ sectionExpanded: sections });
    };

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

    sideBarSections = () => this.arrangeBySections(this.sideBarDisplay());

    getSortButtonColor = (sideBarItem, sortType) => {
      const { sortByForGroups } = this.props;
      return (sortByForGroups[sideBarItem.groupName] === sortType
        ? '#B2C6D6' : '#4A4A4A');
    }

    getCheckBoxColor = (index, currentSection) => {
      const { facetSectionVariables, defaultFacetSectionVariables } = this.props;
      return index % 2 ? facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].checkBoxColorsTwo ? facetSectionVariables[currentSection.sectionName].checkBoxColorsTwo : '' : defaultFacetSectionVariables.checkBoxColorsTwo
        : facetSectionVariables[currentSection.sectionName] ? facetSectionVariables[currentSection.sectionName].checkBoxColorsOne ? facetSectionVariables[currentSection.sectionName].checkBoxColorsOne : '' : defaultFacetSectionVariables.checkBoxColorsOne;
    }

    showSelectedChecbox = (sideBarItem, currentSection) => {
      const {
        classes, showCheckboxCount, facetSectionVariables,
        defaultFacetSectionVariables, sortLabels,
      } = this.props;
      const selectedItems = sideBarItem.checkboxItems.filter((item) => (item.isChecked));
      const selectedCheckbox = selectedItems.slice(0, showCheckboxCount)
        .map((item, index) => (
          <CheckBoxView
            checkboxItem={item}
            sideBarItem={sideBarItem}
            currentSection={currentSection}
            handleToggle={this.handleToggle}
            facetSectionVariables={facetSectionVariables}
            defaultFacetSectionVariables={defaultFacetSectionVariables}
            backgroundColor={this.getCheckBoxColor(index, currentSection)}
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

      const {
        classes,
        ui: ExpandableSectionUI,
        styles,
        // store data from props
        sideBarContent,
        isSidebarLoading,
        tabDataLoading,
        sortByForGroups,

        // other props
        CustomExpansionPanelSummary,
        facetSectionVariables,
        defaultFacetSectionVariables,
        sortLabels,
        resetIconFilter,
      } = this.props;
      // Section: Defaults OR Custom
      const DEFAULT_UI_PROPS = {
        classes,
        styles,
        facetSectionVariables,
        defaultFacetSectionVariables,
        sortLabels,
        resetIconFilter,
        sideBarContent,
        // eslint-disable-next-line object-shorthand
        // isSidebarLoading: isSidebarLoading,
        // tabDataLoading,
        sortByForGroups,
        CustomExpansionPanelSummary,
      };
      Object.assign(DEFAULT_UI_PROPS, this);
      Object.assign(DEFAULT_UI_PROPS, this.state);

      console.log(DEFAULT_UI_PROPS);

      return (
        <ExpandableSectionUI
          {...DEFAULT_UI_PROPS}
          isSidebarLoading={isSidebarLoading}
          tabDataLoading={tabDataLoading}
        />
      );
    }
}

export default ExpandableSectionLogic;
