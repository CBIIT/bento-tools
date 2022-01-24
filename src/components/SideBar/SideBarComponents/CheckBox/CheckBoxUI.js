import React from 'react';
import {
  makeStyles,
  Checkbox,
  ListItem,
  ListItemText,
  Divider,
} from '@material-ui/core';
import {
  CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxBlankIcon,
} from '@material-ui/icons';

const alignment = 'flex-start';

function CheckBoxUI(props) {
  const {
    // Common Props
    // configProps,
    // dashboardFunctions,
    // dashboardContext,
    ComponentStyles,

    // class functions
    handleToggle,
    getCheckBoxColor,
    getLineColor,

    // Component Props
    key: index,
    checkboxItem,
    sideBarItem,
    currentSection,
    facetSectionVariables,
    defaultFacetSectionVariables,
    checkColor,
  } = props;

  const useStyles = makeStyles(ComponentStyles);
  const classes = useStyles();

  return (
    <>
      <ListItem
        width={1}
        button
        alignItems={alignment}
        selected={checkboxItem.isChecked}
        onClick={handleToggle(`${checkboxItem.name}$$${sideBarItem.groupName}$$${sideBarItem.datafield}$$${checkboxItem.isChecked}$$${sideBarItem.section}`)}
        className={classes.nested}
        style={{
          backgroundColor: checkboxItem.isChecked ? getCheckBoxColor(index, currentSection) : null,
        }}
        classes={{ selected: classes.selected, gutters: classes.listItemGutters }}
      >
        <Checkbox
          id={`checkbox_${sideBarItem.groupName}_${checkboxItem.name}`}
          icon={<CheckBoxBlankIcon style={{ fontSize: 18 }} />}
          checkedIcon={(
            <CheckBoxIcon
              style={{
                fontSize: 18,
                color: checkColor,
              }}
            />
          )}
          checked={checkboxItem.isChecked}
          tabIndex={-1}
          disableRipple
          color="secondary"
          classes={{ root: classes.checkboxRoot }}
        />
        <div className={classes.panelDetailText}>
          <span>
            {`${checkboxItem.name}`}
          </span>
        </div>
        <ListItemText />
        <div className={classes.panelSubjectText}>
          <span
            style={{ color: facetSectionVariables[sideBarItem.section] ? facetSectionVariables[sideBarItem.section].color ? facetSectionVariables[sideBarItem.section].color : '' : defaultFacetSectionVariables.color }}
            edge="end"
          >
            &nbsp;
            {`(${checkboxItem.subjects})`}
          </span>
        </div>
      </ListItem>
      <Divider
        style={{
          backgroundColor: checkboxItem.isChecked ? '#FFFFFF' : getLineColor(index, sideBarItem.checkboxItems.length),
          height: checkboxItem.isChecked ? '2px' : '1px',
        }}
      />
    </>
  );
}

export default CheckBoxUI;
