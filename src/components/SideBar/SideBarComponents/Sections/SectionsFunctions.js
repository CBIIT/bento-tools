/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import _ from 'lodash';
import CheckBoxView from '../CheckBoxView';

class SectionsFunctions extends Component {
    groupNameColor = '';

    resetIconSize = '10px';

    constructor(props) {
      super(props);
      this.state = {
        sectionExpanded: [],
      };
    }

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

export default SectionsFunctions;
