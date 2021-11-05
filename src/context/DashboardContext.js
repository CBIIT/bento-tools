/* eslint-disable max-len */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable import/prefer-default-export */
import React, { createContext } from 'react';
import DashboardFunctions from './DashboardFunctions';
import DashboardReducers from './DashboardReducers';

export { default as DashboardFunctions } from './DashboardFunctions';
export { default as DashboardReducers, storeKey, getInitialState } from './DashboardReducers';

export const DashboardContext = createContext();

const DashboardContextProvider = (props) => {
  const dashboardFunctions = props.customFunctions || DashboardFunctions(props);
  const dashboardReducers = props.customReducers || DashboardReducers(props, dashboardFunctions);

  return (
    <DashboardContext.Provider value={{ ...dashboardFunctions, ...dashboardReducers }}>
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
