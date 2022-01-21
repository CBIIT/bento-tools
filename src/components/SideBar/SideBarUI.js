import React from 'react';
import {
  Drawer, List, Button, makeStyles,
} from '@material-ui/core';
import SectionsController from './SideBarComponents/SectionsController';

function SideBarUI(props) {
  const {
    // Common Props
    configProps,
    dashboardFunctions,
    dashboardContext,
    ComponentStyles,

    // Component Props: Specific
    countFilters,
    activeFiltersCount,
    resetIcon,
  } = props;

  const useStyles = makeStyles(ComponentStyles);
  const classes = useStyles();

  return (
    <Drawer
      variant="persistent"
      className={classes.drawer}
      anchor="left"
      PaperProps={{
        classes: {
          root: classes.drawerPaperRoot,
        },
      }}
      open={1}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      { countFilters() > 0 && (
      <div>
        <div>
          <div className={classes.floatRight}>
            <Button
              id="button_sidebar_clear_all_filters"
              variant="outlined"
              disabled={activeFiltersCount() === 0}
              className={classes.customButton}
              classes={{ root: classes.clearAllButtonRoot }}
              onClick={() => dashboardFunctions.clearAllFilters()}
              disableRipple
            >
              <img
                src={resetIcon.src}
                height={resetIcon.size}
                width={resetIcon.size}
                alt={resetIcon.alt}
              />
            </Button>
            <span className={classes.resetText}>Clear all filtered selections</span>
          </div>
        </div>
        <List component="nav" aria-label="filter cases" classes={{ root: classes.listRoot, divider: classes.dividerRoot }}>
          <SectionsController configProps={configProps} dashboardContext={dashboardContext} />
        </List>
      </div>
      )}
    </Drawer>
  );
}

export default SideBarUI;
