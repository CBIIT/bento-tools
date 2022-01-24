import React from 'react';
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Divider,
  Backdrop,
  CircularProgress,
  withStyles,
  makeStyles,
} from '@material-ui/core';
import Group from '../Group/GroupController';

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
    configProps,
    // dashboardFunctions,
    dashboardContext,
    ComponentStyles,

    // Component Props
    sideBarSections,
    facetSectionVariables,
    defaultFacetSectionVariables,
    sectionExpanded,
    handleSectionChange,
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
          {/* Sections */}
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
              <Group
                configProps={configProps}
                dashboardContext={dashboardContext}
                currentSection={currentSection}
              />
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
