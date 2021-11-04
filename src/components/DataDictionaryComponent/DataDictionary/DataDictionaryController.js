import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import DataDictionary from './DataDictionary';

const DictionarySearcherController = (props) => {
  const { dictionary } = props;
  if (!dictionary) {
    return <CircularProgress />;
  }

  return <DataDictionary {...props} />;
};

export default DictionarySearcherController;
