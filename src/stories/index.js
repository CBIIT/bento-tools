/* eslint-disbale */
import React from 'react';

import { storiesOf } from '@storybook/react';
import MUIDatatable from '../components/datatables/MUIDataTable';
import users from '../stubs/users.json';
import footerData from '../stubs/footer.json';
import Header from '../components/headers';
import Footer from '../components/footer';

import nihLogo from './icdc_nih_logo.svg';
import easter2000 from './Canine2000.png';
import NavBar from '../components/navBar';
import { navBarData, navBarCartData, navBarstyling } from '../stubs/navBarData';

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
  .add('Header default', () => <Header alt="hello" homeLink="https://www.google.com" />)
  .add('Header with custom Logo', () => <Header logo={nihLogo} homeLink="https://www.google.com" />)
  .add('Easter Header with custom easter', () => <Header easter={easter2000} />)
  .add('Easter Header with custom logo and eas', () => <Header logo={nihLogo} easter={easter2000} />);

storiesOf('Footer', module).add('Footer', () => <Footer data={footerData} />);
storiesOf('MUIDatatable', module).add('left Selectable', () => <MUIDatatable columns={columns} data={data} title={title} selectCellPostion="right" />);
storiesOf('MUIDatatable', module).add('right Selectable', () => <MUIDatatable columns={columns} data={data} options={options} title={title} selectCellPostion="right" />);
storiesOf('NavBar', module).add('NavBar', () => <NavBar navBarData={navBarData} navBarCartData={navBarCartData} navBarstyling={navBarstyling} />);
