import _ from 'lodash';
import {
  customSort,
  getSunburstDataFromDashboardData,
  getDonutDataFromDashboardData,
  transformInitialDataForSunburst,
  transformAPIDataIntoCheckBoxData,
} from '../utils/dashboardUtilFunctions';

class DashboardFunctions {
  constructor(props) {
    console.log(props);
    this.props = props;
  }

  getState = () => {
    const { store, storeKey } = this.props;
    return store.getState()[storeKey];
  }

  shouldFetchDataForDashboardTabDataTable = (state) => !(state.isFetched)

  /**
     * Returns the  stats from inputAPI data.
     * @param {object} data
     *  @param {json} statCountVariables
     * @return {json}
     */
  getStatInit = (input, statCountVariables) => {
    const initStats = statCountVariables.reduce((acc, widget) => (
      { ...acc, [widget.statAPI]: input[widget.statAPI] }
    ), {});
    return initStats;
  }

  /**
     * Returns the filtered stats from inputAPT data.
     * @param {object} data
     *  @param {json} statCountVariables
     * @return {json}
     */
  getFilteredStat = (input, statCountVariables) => {
    const filteredStats = statCountVariables.reduce((acc, stat) => (
      { ...acc, [stat.statAPI]: input[stat.statAPI] }
    ), {});
    return filteredStats;
  }

  /**
     * removes EmptySubjectsFromDonutDataa.
     * @param {object} data
     *  @param {object}
     */
    removeEmptySubjectsFromDonutData = (data) => data.filter((item) => item.subjects !== 0);

    /**
     * Returns the widgets data.
     * @param {object} data
     * @param {json} widgetsInfoFromCustConfig
     * @return {json}r
     */
    getWidgetsInitData = (data, widgetsInfoFromCustConfig) => {
      const donut = widgetsInfoFromCustConfig.reduce((acc, widget) => {
        const Data = widget.type === 'sunburst' ? transformInitialDataForSunburst(data[widget.dataName])
          : this.removeEmptySubjectsFromDonutData(data[widget.dataName]);
        const label = widget.dataName;
        return { ...acc, [label]: Data };
      }, {});

      return donut;
    }

    fetchDashboardTab = () => {
      const { store, client, DASHBOARD_QUERY } = this.props;
      return () => {
        store.dispatch({ type: 'REQUEST_DASHBOARDTAB' });
        return client
          .query({
            query: DASHBOARD_QUERY,
          })
          .then((result) => store.dispatch({ type: 'RECEIVE_DASHBOARDTAB', payload: _.cloneDeep(result) }))
          .catch((error) => store.dispatch(
            { type: 'DASHBOARDTAB_QUERY_ERR', error },
          ));
      };
    }

    fetchDashboardTabForClearAll = () => {
      const { store, client, DASHBOARD_QUERY } = this.props;
      return () => client
        .query({
          query: DASHBOARD_QUERY,
        })
        .then((result) => store.dispatch({ type: 'CLEAR_ALL', payload: _.cloneDeep(result) }))
        .then(() => store.dispatch({ type: 'SORT_ALL_GROUP_CHECKBOX' }))
        .catch((error) => store.dispatch(
          { type: 'DASHBOARDTAB_QUERY_ERR', error },
        ));
    }

    /**
     * Generate a default varibles for filter query.
     *
     * Need to be updated with custodian of filter
     * @return json
     */
    allFilters = () => {
      const { facetSearchData } = this.props;
      const emptyFilters = facetSearchData.reduce((acc, facet) => (
        { ...acc, [facet.datafield]: [] }
      ), {});
      return emptyFilters;
    }

    /**
     * Returns filter variable for graphql query using the all filters.
     *
     * @param {object} data
     * @return {json}
     */

    createFilterVariables = (data) => {
      const currentAllActiveFilters = this.getState().allActiveFilters;
      // eslint-disable-next-line  no-unused-vars
      const filter = Object.entries(currentAllActiveFilters).reduce((acc, [key, val]) => {
        if (data[0].datafield === key) {
          return data[0].isChecked
            ? { ...acc, [key]: [...currentAllActiveFilters[key], ...[data[0].name]] }
            : {
              ...acc,
              [key]: currentAllActiveFilters[key]
                .filter((item) => item !== data[0].name),
            };
        }
        // return { ...acc , [key]: [...currentAllActiveFilters[key],...[data[0].name]] }
        return { ...acc, [key]: currentAllActiveFilters[key] };
      }, {});

      return filter;
    }

    /**
     * Returns active filter list while removing the param group.
     *
     * @param {object} data
     * @return {json}
     */
    clearGroup = (data) => {
      const currentAllActiveFilters = this.getState().allActiveFilters;
      currentAllActiveFilters[data] = [];
      return currentAllActiveFilters;
    }

    clearSectionSort = (groupName) => {
      const { store } = this.props;
      store.dispatch({
        type: 'CLEAR_SECTION_SORT',
        payload: {
          groupName,
        },
      });
    }

    /**
     * Reducer for clear all
     *
     * @return distpatcher
     */

    clearAllFilters = () => {
      const { store } = this.props;
      store.dispatch(this.fetchDashboardTabForClearAll());
    }

    /**
     * Helper function to query and get filtered values for dashboard
     * @param {object} payload ingeneral its a single filter variable used to set the checkbox
     * @param {obj} currentAllFilterVariables gets the current active filters
     * @return distpatcher
     */
    toggleCheckBoxWithAPIAction = (payload, currentAllFilterVariables) => {
      const {
        store, client, FILTER_QUERY, FILTER_GROUP_QUERY,
      } = this.props;
      return client
        .query({ // request to get the filtered subjects
          query: FILTER_QUERY,
          variables: { ...currentAllFilterVariables, first: 100 },
        })
        .then((result) => client.query({ // request to get the filtered group counts
          query: FILTER_GROUP_QUERY,
          variables: { subject_ids: result.data.searchSubjects.subjectIds },
        })
          .then((result2) => store.dispatch({
            type: 'TOGGGLE_CHECKBOX_WITH_API',
            payload: {
              filter: payload,
              allFilters: currentAllFilterVariables,
              groups: _.cloneDeep(result2),
              ..._.cloneDeep(result),
            },
          }))
          .then(() => store.dispatch({
            type: 'SORT_ALL_GROUP_CHECKBOX',
          }))
          .catch((error) => store.dispatch(
            { type: 'DASHBOARDTAB_QUERY_ERR', error },
          )))
        .catch((error) => store.dispatch(
          { type: 'DASHBOARDTAB_QUERY_ERR', error },
        ));
    }

    /**
     * Resets the group selections
     *
     * @param {object} payload
     * @return distpatcher
     */
    resetGroupSelections = (payload) => () => {
      const { dataField, groupName } = payload;
      const currentAllFilterVariables = this.clearGroup(dataField);
      this.clearSectionSort(groupName);

      // For performance issue
      // we are using initial dasboardquery instead of fitered for empty filters
      if (_.isEqual(currentAllFilterVariables, this.allFilters())) {
        this.clearAllFilters();
      } else this.toggleCheckBoxWithAPIAction(payload, currentAllFilterVariables);
    }

    /**
     * Switch to get query sort dorection and sort field .
     *
     * @param {string} payload
     *  @param {json} tabContainer
     * @return {json} with three keys QUERY, sortfield, sortDirection
     */
    querySwitch = (payload, tabContainer) => {
      const {
        GET_SAMPLES_OVERVIEW_DESC_QUERY,
        GET_FILES_OVERVIEW_DESC_QUERY,
        GET_CASES_OVERVIEW_DESC_QUERY,
        GET_SAMPLES_OVERVIEW_QUERY,
        GET_FILES_OVERVIEW_QUERY,
        GET_CASES_OVERVIEW_QUERY,
      } = this.props;
      switch (payload) {
        case ('Samples'):
          return { QUERY: tabContainer.defaultSortDirection === 'desc' ? GET_SAMPLES_OVERVIEW_DESC_QUERY : GET_SAMPLES_OVERVIEW_QUERY, sortfield: tabContainer.defaultSortField || '', sortDirection: tabContainer.defaultSortDirection || '' };
        case ('Files'):
          return { QUERY: tabContainer.defaultSortDirection === 'desc' ? GET_FILES_OVERVIEW_DESC_QUERY : GET_FILES_OVERVIEW_QUERY, sortfield: tabContainer.defaultSortField || '', sortDirection: tabContainer.defaultSortDirection || '' };
        default:
          return { QUERY: tabContainer.defaultSortDirection === 'desc' ? GET_CASES_OVERVIEW_DESC_QUERY : GET_CASES_OVERVIEW_QUERY, sortfield: tabContainer.defaultSortField || '', sortDirection: tabContainer.defaultSortDirection || '' };
      }
    };

    /**
     * Function to get getquery and default sort.
     *
     * @param {string} payload
     * @return {json} with three keys QUERY,GET_CASES_OVERVIEW_DESC_QUERY, sortfield
     */
    getQueryAndDefaultSort = (payload = this.props.tabIndex[0].title) => {
      const { tabContainers } = this.props;
      const tabContainer = tabContainers.find((x) => x.name === payload);
      return this.querySwitch(payload, tabContainer);
    };

    /**
     * Updates the current active dashboard tab.
     *
     * @param {object} data
     * @param {Array} subjectIDsAfterFilter
     * @param {Array} sampleIDsAfterFilter
     * @param {Array} fileIDsAfterFilter
     * @return {json}
     */

    fetchDataForDashboardTab(
      payload,
      subjectIDsAfterFilter = null,
      sampleIDsAfterFilter = null,
      fileIDsAfterFilter = null,
    ) {
      console.log(this);
      const { store, client } = this.props;
      const { QUERY, sortfield, sortDirection } = this.getQueryAndDefaultSort(payload);

      return client
        .query({
          query: QUERY,
          variables: {
            subject_ids: subjectIDsAfterFilter, sample_ids: sampleIDsAfterFilter, file_ids: fileIDsAfterFilter, order_by: sortfield || '',
          },
        })
        .then((result) => store.dispatch({ type: 'UPDATE_CURRRENT_TAB_DATA', payload: { currentTab: payload, sortDirection, ..._.cloneDeep(result) } }))
        .catch((error) => store.dispatch(
          { type: 'DASHBOARDTAB_QUERY_ERR', error },
        ));
    }

    transformCasesFileIdsToFiles= (data) => {
      // use reduce to combine all the files' id into single array
      const transformData = data.reduce((accumulator, currentValue) => {
        const { files } = currentValue;
        // check if file
        if (files && files.length > 0) {
          return accumulator.concat(files);
        }
        return accumulator;
      }, []);
      return transformData.map((item) => ({
        files: [item.file_id],
      }));
    }

    // use reduce to combine all the files' id into single array
    transformfileIdsToFiles = (data) => data.map((item) => ({
      files: [item.file_id],
    }))

    /**
     * Gets all file ids for active subjectIds.
     * TODO this  functtion can use filtered file IDs except for initial load
     * @param obj fileCoubt
     * @return {json}
     */
    fetchAllFileIDsForSelectAll = async (fileCount = 100000) => {
      const {
        tabIndex,
        client,
        GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL,
        GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL,
        GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL,
      } = this.props;
      const subjectIds = this.getState().filteredSubjectIds;
      const sampleIds = this.getState().filteredSampleIds;
      const fileIds = this.getState().filteredFileIds;
      const SELECT_ALL_QUERY = this.getState().currentActiveTab === tabIndex[2].title
        ? GET_ALL_FILEIDS_FILESTAB_FOR_SELECT_ALL
        : this.getState().currentActiveTab === tabIndex[1].title
          ? GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL
          : GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL;

      const fetchResult = await client
        .query({
          query: SELECT_ALL_QUERY,
          variables: {
            subject_ids: subjectIds,
            sample_ids: sampleIds,
            file_ids: fileIds,
            first: fileCount,
          },
        })
        .then((result) => {
          const RESULT_DATA = this.getState().currentActiveTab === tabIndex[2].title ? 'fileOverview' : this.getState().currentActiveTab === tabIndex[1].title ? 'sampleOverview' : 'subjectOverViewPaged';
          const fileIdsFromQuery = RESULT_DATA === 'fileOverview' ? this.transformfileIdsToFiles(result.data[RESULT_DATA]) : RESULT_DATA === 'subjectOverViewPaged' ? this.transformCasesFileIdsToFiles(result.data[RESULT_DATA]) : result.data[RESULT_DATA] || [];
          return fileIdsFromQuery;
        });

      // Restaruting the result Bringing {files} to files
      const filesArray = fetchResult.reduce((accumulator, currentValue) => {
        const { files } = currentValue;
        // check if file
        if (files && files.length > 0) {
          return accumulator.concat(files.map((f) => f));
        }
        return accumulator;
      }, []);

      // Removing fileIds that are not in our current list of filtered fileIds

      const filteredFilesArray = fileIds != null
        ? filesArray.filter((x) => fileIds.includes(x))
        : filesArray;
      return filteredFilesArray;
    }

    /**
     * Returns file IDs of given filenames.
     * @param array file_name
     * @param int offset
     * @param int first
     * @param SORT_SINGLE_GROUP_CHECKBOX order_by
     * @return {json}
     */

    getFileIDsByFileName = async (file_name = [], offset = 0, first = 100000, order_by = 'file_name') => {
      const {
        client,
        GET_FILE_IDS_FROM_FILE_NAME,
      } = this.props;
      const data = await client
        .query({
          query: GET_FILE_IDS_FROM_FILE_NAME,
          variables: {
            file_name,
            offset,
            first,
            order_by,
          },
        })
        .then((result) => {
          if (result && result.data && result.data.fileIdsFromFileNameDesc.length > 0) {
            return result.data.fileIdsFromFileNameDesc.map((d) => d.file_id);
          }
          return [];
        });
      return data;
    }

    /**
     * Returns file IDs of given sampleids or subjectids.
     * @param int fileCount
     * @param graphqlquery SELECT_ALL_QUERY
     * @param array caseIds
     * @param array sampleIds
     * @param string apiReturnField
     * @return {json}
     */

    getFileIDs = async (
      fileCount = 100000,
      SELECT_ALL_QUERY,
      caseIds = [],
      sampleIds = [],
      apiReturnField,
    ) => {
      const {
        client,
      } = this.props;
      const fetchResult = await client
        .query({
          query: SELECT_ALL_QUERY,
          variables: {
            subject_ids: caseIds,
            sample_ids: sampleIds,
            file_ids: [],
            first: fileCount,
          },
        })
        .then((result) => result.data[apiReturnField] || []);

      return fetchResult.reduce((accumulator, currentValue) => {
        const { files } = currentValue;
        // check if file
        if (files && files.length > 0) {
          return accumulator.concat(files.map((f) => {
            if (typeof f.file_id !== 'undefined') {
              return f.file_id;
            }
            return f;
          }));
        }
        return accumulator;
      }, []);
    }

    /**
    * Removing fileIds that are not in our current list of filtered fileIds
    * @param array fileIds
    * @return array
    */
    filterOutFileIds = (fileIds) => {
    // Removing fileIds that are not in our current list of filtered fileIds
      const { filteredFileIds } = this.getState();
      if (fileIds
        && fileIds.length > 0
         && filteredFileIds
          && filteredFileIds != null
          && filteredFileIds.length > 0) {
        return fileIds.filter((x) => filteredFileIds.includes(x));
      }
      return fileIds;
    }

    /**
    * Gets all file ids for active subjectIds.
    * TODO this  functtion can use filtered file IDs except for initial load
    * @param obj fileCoubt
    * @return {json}
    */
    fetchAllFileIDs = async (fileCount = 100000, selectedIds = [], offset = 0.0, first = 100000, order_by = 'file_name') => {
      const {
        tabIndex,
        GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL,
        GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL,
      } = this.props;
      let filesIds = [];
      switch (this.getState().currentActiveTab) {
        case tabIndex[2].title:
          filesIds = await this.getFileIDsByFileName(selectedIds, offset, first, order_by);
          break;
        case tabIndex[1].title:
          filesIds = await this.getFileIDs(fileCount, GET_ALL_FILEIDS_SAMPLESTAB_FOR_SELECT_ALL, [], selectedIds, 'sampleOverview');
          break;
        default:
          filesIds = await this.getFileIDs(fileCount, GET_ALL_FILEIDS_CASESTAB_FOR_SELECT_ALL, selectedIds, [], 'subjectOverViewPaged');
      }
      return this.filterOutFileIds(filesIds);
    }

    getFilesCount = () => this.getState().stats.numberOfFiles;

    /**
     * Returns the widgets data.
     * @param {object} data
     * @param {json} widgetsInfoFromCustConfig
     * @return {json}r
     */
    getWidgetsData = (input, widgetsInfoFromCustConfig) => {
      const donut = widgetsInfoFromCustConfig.reduce((acc, widget) => {
        const Data = widget.type === 'sunburst' ? getSunburstDataFromDashboardData(input, widget.datatable_level1_field, widget.datatable_level2_field)
          : getDonutDataFromDashboardData(input, widget.datatable_field);
        const label = widget.dataName;
        return { ...acc, [label]: Data };
      }, {});

      return donut;
    }

    /**
     * Reducer for fetch dashboard data
     *
     * @return distpatcher
     */

    fetchDataForDashboardTabDataTable = () => {
      const { store } = this.props;
      if (this.shouldFetchDataForDashboardTabDataTable(this.getState())) {
        return store.dispatch(this.fetchDashboardTab());
      }
      return store.dispatch({ type: 'READY_DASHBOARDTAB' });
    }

    /**
     * Helper function to create only one filter that was from payload payload
     * @param {object} payload
     * @return distpatcher
     */

    createSingleFilterVariables = (payload) => {
      const currentAllActiveFilters = this.allFilters();
      // eslint-disable-next-line  no-unused-vars
      const filter = Object.entries(currentAllActiveFilters).reduce((acc, [key, val]) => {
        if (payload[0].datafield === key) {
          return { ...acc, [key]: [...currentAllActiveFilters[key], ...[payload[0].name]] };
        }
        return { ...acc, [key]: currentAllActiveFilters[key] };
      }, {});
      return filter;
    }

    /**
     * Sort checkboxes by Checked
     *
     * @param {object} checkboxData
     * @return {json}
     */

    sortByCheckboxByIsChecked = (checkboxData) => {
      checkboxData.sort((a, b) => b.isChecked - a.isChecked);
      return checkboxData;
    }

    /**
     * Sort checkboxes by Alphabet
     *
     * @param {object} checkboxData
     * @return {json}
     */

    sortByCheckboxItemsByAlphabet = (checkboxData) => {
      const sortCheckbox = customSort(checkboxData);
      return this.sortByCheckboxByIsChecked(sortCheckbox);
    }

    /**
     * Sort checkboxes by Count
     *
     * @param {object} checkboxData
     * @return {json}
     */

    sortByCheckboxItemsByCount = (checkboxData) => {
      checkboxData.sort((a, b) => b.subjects - a.subjects);
      return this.sortByCheckboxByIsChecked(checkboxData);
    }

    /**
     * Sets the given filter variable as the only filter for the dasboard
     * @param {object} data
     * @return distpatcher
     */
    setSingleFilter = async (payload) => {
      const { store } = this.props;
      // test weather there are active dashboard filters if so clear all filters
      if (!_.isEqual(this.getState().allActiveFilters, this.allFilters())) {
        await this.clearAllFilters();
      }
      const singlefiter = this.createSingleFilterVariables(payload);
      store.dispatch({ type: 'SET_SINGLE_FILTER', payload: singlefiter });
    }

    /**
     * Reducer for setting single checkbox filter
     * @param {object} payload
     * @return distpatcher
     */

    singleCheckBox = async (payload) => {
      await this.setSingleFilter(payload);
      const currentAllFilterVariables = payload === {} ? this.allFilters
        : this.createFilterVariables(payload);
      this.toggleCheckBoxWithAPIAction(payload, currentAllFilterVariables);
    }

    /**
     * Trigger respective API queries when checkbox is checked.
     *
     * @param {object} payload
     * @return distpatcher
     */
    toggleCheckBox = (payload) => () => {
      const currentAllFilterVariables = payload === {} ? this.allFilters
        : this.createFilterVariables(payload);
        // For performance issue,
        // we are using initial dasboardquery instead of fitered for empty filters
      if (_.isEqual(currentAllFilterVariables, this.allFilters())) {
        this.clearAllFilters();
      } else this.toggleCheckBoxWithAPIAction(payload, currentAllFilterVariables);
    }

    /**
     * Reducer for sidebar loading
     *
     * @return distpatcher
     */

    setSideBarToLoading = () => {
      const { store } = this.props;
      store.dispatch({ type: 'SET_SIDEBAR_LOADING' });
    }

    /**
     * Reducer for setting dashboardtable loading loading
     *
     * @return distpatcher
     */

    setDashboardTableLoading = () => {
      const { store } = this.props;
      store.dispatch({ type: 'SET_DASHBOARDTABLE_LOADING' });
    }

    /**
     * Reducer for sorting checkboxes.
     *
     * @return distpatcher
     */

    sortSection = (groupName, sortBy) => {
      const { store } = this.props;
      store.dispatch({
        type: 'SORT_SINGLE_GROUP_CHECKBOX',
        payload: {
          groupName,
          sortBy,
        },
      });
    }

    sortAll = () => {
      const { store } = this.props;
      store.dispatch({
        type: 'SORT_ALL_GROUP_CHECKBOX',
      });
    }

    /**
   *  updateFilteredAPIDataIntoCheckBoxData works for first time init Checkbox,
  that function transforms the data which returns from API into a another format
  so it contains more information and easy for front-end to show it correctly.
   *  * @param {object} currentGroupCount
   *  * @param {object} willUpdateGroupCount
   * * @param {object} currentCheckboxSelection
   * @return {json}
   */
    updateFilteredAPIDataIntoCheckBoxData = (data, facetSearchDataFromConfig) => (
      facetSearchDataFromConfig.map((mapping) => ({
        groupName: mapping.label,
        checkboxItems: transformAPIDataIntoCheckBoxData(
          data[mapping.apiForFiltering], mapping.field,
        ),
        datafield: mapping.datafield,
        show: mapping.show,
        section: mapping.section,
      }))
    )

    getCountForAddAllFilesModal = () => {
      const { tabIndex } = this.props;
      const currentState = this.getState();
      const numberCount = currentState.currentActiveTab === tabIndex[0].title
        ? currentState.stats.numberOfCases
        : currentState.currentActiveTab === tabIndex[1].title
          ? currentState.stats.numberOfSamples : currentState.stats.numberOfFiles;
      return { activeTab: currentState.currentActiveTab || tabIndex[2].title, count: numberCount };
    }

    /**
     *  Check sidebar has filter selections.
     * return boolean
     */
    hasFilter = () => {
      const currentAllActiveFilters = this.getState().allActiveFilters;
      return Object.entries(currentAllActiveFilters).filter(
        (item) => item[1].length > 0,
      ).length > 0;
    }

    /**
     *  Get file name by fileids
     * @return {json}
     */

    getFileNamesByFileIds = async (fileIds) => {
      const { client, GET_FILES_NAME_QUERY } = this.props;
      const data = await client
        .query({
          query: GET_FILES_NAME_QUERY,
          variables: {
            file_ids: fileIds,
          },
        })
        .then((result) => result.data.fileOverview.map((item) => item.file_name));
      return data;
    }

    /**
     *  Check table has selections.
     * @return {json}
     */
    tableHasSelections = async () => {
      const { tabIndex } = this.props;
      let selectedRowInfo = [];
      let filteredIds = [];

      // without the filters, the filteredIds is null
      if (!(this.hasFilter())) {
        return selectedRowInfo.length > 0;
      }

      const filteredNames = await this.getFileNamesByFileIds(this.getState().filteredFileIds);
      switch (this.getState().currentActiveTab) {
        case tabIndex[2].title:
          filteredIds = filteredNames;
          selectedRowInfo = this.getState().dataFileSelected.selectedRowInfo;

          break;
        case tabIndex[1].title:
          filteredIds = this.getState().filteredSampleIds;
          selectedRowInfo = this.getState().dataSampleSelected.selectedRowInfo;
          break;
        default:
          filteredIds = this.getState().filteredSubjectIds;
          selectedRowInfo = this.getState().dataCaseSelected.selectedRowInfo;
      }

      return selectedRowInfo.filter(
        (value) => (filteredIds && filteredIds !== null ? filteredIds.includes(value) : false),
      ).length > 0;
    }

    setDataCaseSelected = (result) => {
      const { store } = this.props;
      store.dispatch({ type: 'SET_CASES_SELECTION', payload: result });
    }

    setDataFileSelected = (result) => {
      const { store } = this.props;
      store.dispatch({ type: 'SET_FILE_SELECTION', payload: result });
    }

    setDataSampleSelected = (result) => {
      const { store } = this.props;
      store.dispatch({ type: 'SET_SAMPLE_SELECTION', payload: result });
    }

    /**
     *  Returns the functuion depend on current active tab
     * @return {func}
     */

    getTableRowSelectionEvent = () => {
      const { tabIndex } = this.props;
      const currentState = this.getState();
      const tableRowSelectionEvent = currentState.currentActiveTab === tabIndex[2].title
        ? this.setDataFileSelected
        : currentState.currentActiveTab === tabIndex[1].title
          ? this.setDataSampleSelected : this.setDataCaseSelected;
      return tableRowSelectionEvent;
    }

    clearTableSelections = () => {
      const { store } = this.props;
      store.dispatch({ type: 'CLEAR_TABLE_SELECTION' });
    }

    getDashboard = () => this.getState();
}

export default DashboardFunctions;
