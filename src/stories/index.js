/* eslint-disbale */
import React from 'react';
import { IconButton, Typography } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import VisibilityIcon from '@material-ui/icons/Visibility';
import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import MUIDatatable from '../components/datatables/MUIDataTable';
import users from '../stubs/users.json';
import usersWithCars from '../stubs/usersWithCars.json';
import Header from '../components/headers';
import nihLogo from './icdc_nih_logo.svg';
import easter2000 from './Canine2000.png';

const columns = [
  {
    name: 'firstName',
    label: 'First Name',
  },
  {
    name: 'lastName',
    label: 'Last Name',
  },
  {
    name: 'age',
    label: 'Age',
  },
];

const options = {
  selectCellPostion: 'right',
};

const title = 'Awesome list';

const data = users;

storiesOf('Header', module)
  .add('Header default', () => <Header />)
  .add('Header with custom Logo', () => <Header logo={nihLogo} />)
  .add('Easter Header with custom easter', () => <Header easter={easter2000} />)
  .add('Easter Header with custom logo and eas', () => <Header logo={nihLogo} easter={easter2000} />);

storiesOf('MUIDatatable', module).add('left Selectable', () => <MUIDatatable columns={columns} data={data} title={title} selectCellPostion="right" />);
storiesOf('MUIDatatable', module).add('right Selectable', () => <MUIDatatable columns={columns} data={data} options={options} title={title} selectCellPostion="right" />);
