import React from 'react';
import {
  List,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Icon,
  withStyles,
  makeStyles,
} from '@material-ui/core';
import {
  ArrowDropDown as ArrowDropDownIcon,
} from '@material-ui/icons';
import CheckBox from '../CheckBox/CheckBoxController';

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

function GroupUI(props) {
  const {
    // Common Props
    configProps,
    dashboardFunctions,
    dashboardContext,
    ComponentStyles,

    // Component Props
    currentSection,
    groupsExpanded,
    handleGroupsChange,
    getGroupNameColor,
    handleGroupReset,
    resetIconFilter,
    resetIconSize,
    getSortButtonColor,
    sortLabels,
    showSelectedChecbox,
  } = props;

  const useStyles = makeStyles(ComponentStyles);
  const classes = useStyles();

  return (
    <>
      {/* Groups */}
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
                                    <CheckBox
                                      key={index}
                                      configProps={configProps}
                                      dashboardContext={dashboardContext}
                                      checkboxItem={item}
                                      sideBarItem={sideBarItem}
                                      currentSection={currentSection}
                                      checkColor={getGroupNameColor(sideBarItem, currentSection)}
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
    </>
  );
}

export default GroupUI;
