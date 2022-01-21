/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';

class SideBarFunctions extends Component {
  constructor(props) {
    super(props);
    this.state = { };
  }

  activeFiltersCount = () => {
    const { activeFilters } = this.props;
    Object.entries(activeFilters).reduce(
      (acc, [key, val]) => acc + (val.length), 0, // eslint-disable-line no-unused-vars
    );
  }

  countFilters = () => {
    const { facetSearchData } = this.props;
    return facetSearchData ? facetSearchData.reduce((n, facet) => n + (facet.show === true), 0) : 0;
  }

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

export default SideBarFunctions;
