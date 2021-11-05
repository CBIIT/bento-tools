/* eslint-disable max-len */
/* eslint-disable react/destructuring-assignment */
import {
  customCheckBox,
  getFilters,
  filterData,
  getCheckBoxData,
  getStatDataFromDashboardData,
  setSelectedFilterValues,
} from '../index';

export const storeKey = 'dashboardTab';

export const getInitialState = (defaultValues) => ({
  dashboardTab: {
    isDataTableUptoDate: false,
    isFetched: false,
    isLoading: false,
    isDashboardTableLoading: false,
    setSideBarLoading: false,
    error: '',
    hasError: false,
    stats: {},
    allActiveFilters: {},
    currentActiveTab: defaultValues.tabIndex[0].title,
    filteredSubjectIds: null,
    checkboxForAll: {
      data: [],
    },
    subjectOverView: {
      data: [],
    },
    checkbox: {
      data: [],
      defaultPanel: false,
    },
    datatable: {
      dataCase: 'undefined',
      dataSample: 'undefined',
      dataFile: 'undefined',
    },
    dataCaseSelected: {
      selectedRowInfo: [],
      selectedRowIndex: [],
    },
    dataSampleSelected: {
      selectedRowInfo: [],
      selectedRowIndex: [],
    },
    dataFileSelected: {
      selectedRowInfo: [],
      selectedRowIndex: [],
    },
    widgets: {},
  },
});

const DashboardReducers = (props, dashboardFunctions) => {
  console.log('useDashboardReducers');
  console.log(props);
  const {
    // globalStatsData
    statsCount,
    // dashboardData
    widgetsData,
    facetSearchData,
    // dashboardTabData
    tabIndex,
    // localSearchData
    widgetsSearchData,
  } = props;

  const {
    updateFilteredAPIDataIntoCheckBoxData,
    fetchDataForDashboardTab,
    getFilteredStat,
    getWidgetsInitData,
    getSearchWidgetsData,
    getWidgetsData,
    allFilters,
    getStatInit,
    sortByCheckboxItemsByCount,
    sortByCheckboxItemsByAlphabet,
  } = dashboardFunctions;

  // reducers
  const reducers = {
    DASHBOARDTAB_QUERY_ERR: (state, item) => ({
      ...state,
      hasError: true,
      error: item,
      isLoading: false,
      isFetched: false,
    }),
    READY_DASHBOARDTAB: (state) => ({
      ...state,
      isLoading: false,
      isFetched: true,
      setSideBarLoading: false,
      isDashboardTableLoading: false,
    }),
    TOGGGLE_CHECKBOX_WITH_API: (state, item) => {
      const updatedCheckboxData1 = updateFilteredAPIDataIntoCheckBoxData(
        item.data.searchSubjects, facetSearchData,
      );
      const checkboxData1 = setSelectedFilterValues(updatedCheckboxData1, item.allFilters);
      fetchDataForDashboardTab(state.currentActiveTab, item.allFilters);
      return {
        ...state,
        setSideBarLoading: false,
        allActiveFilters: item.allFilters,
        checkbox: {
          data: checkboxData1,
        },
        stats: getFilteredStat(item.data.searchSubjects, statsCount),
        widgets: getWidgetsInitData(item.data.searchSubjects, widgetsData),
      };
    },
    LOCAL_SEARCH: (state, item) => {
      fetchDataForDashboardTab(state.currentActiveTab,
        item.result.data.findIdsFromLists.subjectIds,
        item.result.data.findIdsFromLists.sampleIds,
        item.result.data.findIdsFromLists.fileIds);
      return {
        ...state,
        setSideBarLoading: false,
        filteredSubjectIds: item.result.data.findIdsFromLists.subjectIds,
        filteredSampleIds: item.result.data.findIdsFromLists.sampleIds,
        filteredFileIds: item.result.data.findIdsFromLists.fileIds,
        stats: getFilteredStat(item.result.data.nodeCountsFromLists, statsCount),
        widgets: getSearchWidgetsData(item.result.data, widgetsSearchData),

      };
    },
    UPDATE_CURRRENT_TAB_DATA: (state, item) => (
      {
        ...state,
        isDashboardTableLoading: false,
        currentActiveTab: item.currentTab,
        datatable: {
          ...state.datatable,
          dataCase: item.data.subjectOverview,
          dataSample: item.data.sampleOverview,
          dataFile: item.data.fileOverview,
        },
      }
    ),
    REQUEST_DASHBOARDTAB: (state) => ({ ...state, isLoading: true }),
    SET_SIDEBAR_LOADING: (state) => ({ ...state, setSideBarLoading: true }),
    SET_SINGLE_FILTER: (state, item) => (
      {
        ...state,
        allActiveFilters: item,
      }
    ),
    SET_DASHBOARDTABLE_LOADING: (state) => ({ ...state, isDashboardTableLoading: true }),
    TOGGGLE_CHECKBOX: (state, item) => {
      const dataTableFilters = getFilters(state.datatable.filters, item);
      const tableData = state.subjectOverView.data.filter((d) => (filterData(d, dataTableFilters)));
      const updatedCheckboxData = dataTableFilters && dataTableFilters.length !== 0
        ? getCheckBoxData(
          state.subjectOverView.data,
          state.checkboxForAll.data,
          state.checkbox.data.filter((d) => item[0].groupName === d.groupName)[0],
          dataTableFilters,
        )
        : state.checkboxForAll.data;
      return {
        ...state,
        isCalulatingDashboard: false,
        stats: getStatDataFromDashboardData(tableData, statsCount),
        checkbox: {
          data: updatedCheckboxData,
        },
        datatable: {
          ...state.datatable,
          dataCase: tableData,
          filters: dataTableFilters,
        },
        filters: dataTableFilters,
        widgets: getWidgetsData(tableData, widgetsData),
      };
    },
    RECEIVE_DASHBOARDTAB: (state, item) => {
      const checkboxData = customCheckBox(item.data.searchSubjects, facetSearchData);
      fetchDataForDashboardTab(tabIndex[0].title, allFilters());
      return item.data
        ? {
          ...state.dashboard,
          isFetched: true,
          isLoading: false,
          hasError: false,
          setSideBarLoading: false,
          error: '',
          stats: getStatInit(item.data.searchSubjects, statsCount),
          allActiveFilters: allFilters(),
          filteredSubjectIds: null,
          filteredSampleIds: null,
          filteredFileIds: null,
          checkboxForAll: {
            data: checkboxData,
          },
          checkbox: {
            data: checkboxData,
          },
          datatable: {
            filters: [],
          },
          widgets: getWidgetsInitData(item.data.searchSubjects, widgetsData),
          dataCaseSelected: {
            selectedRowInfo: [],
            selectedRowIndex: [],
          },
          dataSampleSelected: {
            selectedRowInfo: [],
            selectedRowIndex: [],
          },
          dataFileSelected: {
            selectedRowInfo: [],
            selectedRowIndex: [],
          },

        } : { ...state };
    },
    CLEAR_ALL: (state, item) => {
      const checkboxData = customCheckBox(item.data.searchSubjects, facetSearchData);
      fetchDataForDashboardTab(tabIndex[0].title, allFilters());
      return item.data
        ? {
          ...state.dashboard,
          isFetched: true,
          isLoading: false,
          hasError: false,
          setSideBarLoading: false,
          error: '',
          stats: getStatInit(item.data.searchSubjects, statsCount),
          allActiveFilters: allFilters(),
          filteredSubjectIds: null,
          filteredSampleIds: null,
          filteredFileIds: null,
          checkboxForAll: {
            data: checkboxData,
          },
          checkbox: {
            data: checkboxData,
          },
          datatable: {
            filters: [],
          },
          widgets: getWidgetsInitData(item.data.searchSubjects, widgetsData),
          dataCaseSelected: {
            ...state.dataCaseSelected,
          },
          dataSampleSelected: {
            ...state.dataSampleSelected,
          },
          dataFileSelected: {
            ...state.dataFileSelected,
          },
          sortByList: {
            ...state.sortByList,
          },
        } : { ...state };
    },
    SORT_SINGLE_GROUP_CHECKBOX: (state, item) => {
      const groupData = state.checkbox.data.filter((group) => item.groupName === group.groupName)[0];
      let { sortByList } = state;
      sortByList = sortByList || {};
      const sortedCheckboxItems = item.sortBy === 'count'
        ? sortByCheckboxItemsByCount(groupData.checkboxItems)
        : sortByCheckboxItemsByAlphabet(groupData.checkboxItems);

      sortByList[groupData.groupName] = item.sortBy;
      const data = state.checkbox.data.map((group) => {
        if (group.groupName === groupData.groupName) {
          const updatedGroupData = group;
          updatedGroupData.checkboxItems = sortedCheckboxItems;
          return updatedGroupData;
        }

        return group;
      });

      return { ...state, checkbox: { data }, sortByList };
    },
    SORT_ALL_GROUP_CHECKBOX: (state) => {
      const { sortByList = {} } = state;
      const { data } = state.checkbox;

      data.map((group) => {
        const checkboxItems = sortByList[group.groupName] === 'count'
          ? sortByCheckboxItemsByCount(group.checkboxItems)
          : sortByCheckboxItemsByAlphabet(group.checkboxItems);
        const updatedGroupData = group;
        updatedGroupData.checkboxItems = checkboxItems;
        return updatedGroupData;
      });

      return { ...state, checkbox: { data } };
    },
    CLEAR_SECTION_SORT: (state, item) => {
      const { sortByList = {} } = state;
      const { groupName } = item;
      // eslint-disable-next-line
      sortByList[groupName] ? delete sortByList[groupName] : null;

      return { ...state, sortByList };
    },
    SET_CASES_SELECTION: (state, item) => (
      {
        ...state,
        dataCaseSelected: item,
      }
    ),
    SET_SAMPLE_SELECTION: (state, item) => (
      {
        ...state,
        dataSampleSelected: item,
      }
    ),
    SET_FILE_SELECTION: (state, item) => (
      {
        ...state,
        dataFileSelected: item,
      }
    ),
    CLEAR_TABLE_SELECTION: (state) => ({
      ...state,
      dataCaseSelected: {
        selectedRowInfo: [],
        selectedRowIndex: [],
      },
      dataSampleSelected: {
        selectedRowInfo: [],
        selectedRowIndex: [],
      },
      dataFileSelected: {
        selectedRowInfo: [],
        selectedRowIndex: [],
      },
    }),
  };
  return reducers;
};

export default DashboardReducers;
