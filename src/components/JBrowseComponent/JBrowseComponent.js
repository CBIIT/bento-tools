import React, { useState } from 'react';
import { withStyles } from '@material-ui/core/styles';
import {
  createViewState,
  createJBrowseTheme,
  JBrowseLinearGenomeView,
  ThemeProvider,
} from '@jbrowse/react-linear-genome-view';
import defaultAssembly from './config/assembly';
import configuration from './config/configuration';
import tracks from './config/tracks';
import JBrowseMenu from './component/MuiMenu'; 

const createTheme = (theme) => createJBrowseTheme(theme);

const JBrowseView = ({viewState}) => (
  <JBrowseLinearGenomeView viewState={createViewState(viewState)} />
)

const JBrowseComponent = ({
  assembly,
  tracks,
  location,
  configuration,
  aggregateTextSearchAdapters,
  theme,
  assemblies,
  classes,
}) => {
  const [viewState, setViewState] = useState({
    assembly,
    tracks,
    location: location,
    configuration,
    aggregateTextSearchAdapters,
  });

  const setReferenceSequence = (item, e) => {
    setViewState({
      ...viewState,
      ...{assembly: item}
    });
  }

  return (
    <>
      <div className={classes.menu}>
        { assemblies && (<JBrowseMenu
          assemblies={assemblies}
          selectHandler={(item, e) => setReferenceSequence(item, e)}
        />) }
      </div>

      <ThemeProvider theme={createTheme(theme)}>
        <JBrowseView viewState={viewState} />
      </ThemeProvider>
    </>
)};

const styles = (theme) => ({
  menu: {
    marginLeft: '20px',
  }
})

JBrowseComponent.defaultProps = {
  assembly: defaultAssembly,
  location: '10:29,838,737..29,838,819',
  configuration: configuration,
  tracks: tracks,
}

export default withStyles(styles, { withTheme: true })(JBrowseComponent);
