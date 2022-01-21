import React from 'react';
import {
  List,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Divider,
  Backdrop,
  CircularProgress,
  Icon,
  withStyles,
  makeStyles,
} from '@material-ui/core';
import {
  ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons';
import CheckBoxView from '../CheckBoxView';

const CustomExpansionPanelSummary = withStyles({
  root: {
    marginBottom: -1,
    minHeight: 48,
    '&$expanded': {
      minHeight: 48,
    },
  },
  content: {
    '&$expanded': {
      margin: '16px 0',
    },
  },
  expanded: {},
})(ExpansionPanelSummary);

function SectionsUI(props) {
  const {
    // Common Props
    // configProps,
    dashboardFunctions,
    // dashboardContext,
    ComponentStyles,

    // Component Props
    sideBarSections,
    facetSectionVariables,
    defaultFacetSectionVariables,
    sectionExpanded,
    handleSectionChange,
    groupsExpanded,
    handleGroupsChange,
    getGroupNameColor,
    handleGroupReset,
    resetIconFilter,
    resetIconSize,
    getSortButtonColor,
    sortLabels,
    handleToggle,
    getCheckBoxColor,
    getLineColor,
    showSelectedChecbox,
    isSidebarLoading,
    tabDataLoading,
  } = props;

  const useStyles = makeStyles(ComponentStyles);
  const classes = useStyles();

  return (
    <>
      {sideBarSections().map((currentSection) => (
        <>
          <Divider
            variant="middle"
            style={{
              backgroundColor: facetSectionVariables[currentSection.sectionName]
                ? facetSectionVariables[currentSection.sectionName].color ? facetSectionVariables[currentSection.sectionName].color : '' : defaultFacetSectionVariables.color,
              margin: '0px',
              height: facetSectionVariables[currentSection.sectionName]
                ? facetSectionVariables[currentSection.sectionName].height ? facetSectionVariables[currentSection.sectionName].height : '' : defaultFacetSectionVariables.height,
            }}
          />
          <ExpansionPanel
            expanded={sectionExpanded.includes(currentSection.sectionName)}
            onChange={handleSectionChange(currentSection.sectionName)}
                    // className={classes.expansion}
            classes={{
              root: classes.expansionPanelRoot,
            }}
          >
            <CustomExpansionPanelSummary
              aria-controls={currentSection.sectionName}
            >
              {/* <ListItemText primary={sideBarItem.groupName} /> */}
              <div
                className={classes.sectionSummaryText}
                id={currentSection.sectionName}
              >
                {currentSection.sectionName}
              </div>

            </CustomExpansionPanelSummary>

            <ExpansionPanelDetails classes={{ root: classes.expansionPanelDetailsRoot }}>
              <List component="div" disablePadding dense>
                {currentSection.items.map((sideBarItem) => (
                  <>
                    <ExpansionPanel
                      square
                      expanded={groupsExpanded.includes(sideBarItem.groupName)}
                      onChange={handleGroupsChange(sideBarItem.groupName)}
                      classes={{
                        root: classes.expansionPanelsideBarItem,
                      }}
                    >
                      <CustomExpansionPanelSummary
                        expandIcon={(
                          <ArrowDropDownIcon
                            classes={{ root: classes.dropDownIconSubSection }}
                            style={{ fontSize: 26 }}
                          />
    )}
                        aria-controls={sideBarItem.groupName}
                        id={sideBarItem.groupName}
                        className={classes.customExpansionPanelSummaryRoot}
                      >
                        {/* <ListItemText primary={sideBarItem.groupName} /> */}
                        <div
                          id={sideBarItem.groupName}
                          style={{ color: getGroupNameColor(sideBarItem, currentSection) }}
                          className={classes.subSectionSummaryText}
                        >
                          {sideBarItem.groupName}
                        </div>

                      </CustomExpansionPanelSummary>

                      <ExpansionPanelDetails
                        classes={{ root: classes.expansionPanelDetailsRoot }}
                      >
                        <List component="div" disablePadding dense>
                          <div
                            className={classes.sortGroup}
                          >
                            <span
                              className={classes.sortGroupIcon}
                            >
                              <Icon
                                onClick={handleGroupReset(
                                  sideBarItem.datafield, sideBarItem.groupName,
                                )}
                                style={{ fontSize: 15 }}
                              >
                                <img
                                  src={resetIconFilter.src}
                                  height={resetIconSize}
                                  width={resetIconSize}
                                  alt={resetIconFilter.alt}
                                />
                              </Icon>
                            </span>
                            <span
                              className={classes.sortGroupItem}
                              style={{ color: getSortButtonColor(sideBarItem, 'alphabet') }}
                              onClick={() => {
                                dashboardFunctions.sortSection(sideBarItem.groupName, 'alphabet');
                              }}
                            >
                              {sortLabels.sortAlphabetically}
                            </span>
                            <span
                              className={classes.sortGroupItemCounts}
                              style={{ color: getSortButtonColor(sideBarItem, 'count') }}
                              onClick={() => {
                                dashboardFunctions.sortSection(sideBarItem.groupName, 'count');
                              }}
                            >
                              {sortLabels.sortByCount}
                            </span>
                          </div>
                          {
                                sideBarItem.checkboxItems.map(
                                  (item, index) => (
                                    <CheckBoxView
                                      key={index}
                                      checkboxItem={item}
                                      sideBarItem={sideBarItem}
                                      currentSection={currentSection}
                                      handleToggle={handleToggle}
                                      facetSectionVariables={facetSectionVariables}
                                      defaultFacetSectionVariables={defaultFacetSectionVariables}
                                      backgroundColor={getCheckBoxColor(index, currentSection)}
                                      checkColor={getGroupNameColor(sideBarItem, currentSection)}
                                      lineColor={
                                          getLineColor(index, sideBarItem.checkboxItems.length)
                                        }
                                    />
                                  ),
                                )
              }
                        </List>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <div className={classes.selectedCheckboxDisplay}>
                      { !groupsExpanded.includes(sideBarItem.groupName)
                          && showSelectedChecbox(sideBarItem, currentSection)}
                    </div>
                  </>
                ))}
              </List>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <Backdrop className={classes.backdrop} open={isSidebarLoading || tabDataLoading}>
            <CircularProgress color="inherit" />
          </Backdrop>
        </>
      ))}
    </>
  );
}

export default SectionsUI;
