/* eslint-disbale */
import React from 'react';

import { storiesOf } from '@storybook/react';
import MUIDatatable from '../components/datatables/MUIDataTable';
import users from '../stubs/users.json';
import footerData from '../stubs/footer.json';
import Header from '../components/headers';
import Footer from '../components/footer';
import StatsBar from '../components/statsBar';
import { data as statsData, statsStyling, globalStatsData } from '../stubs/statsBar';

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

console.log(globalStatsData);
console.log(statsData['numberOfFiles']);
console.log(statsStyling.global.statTitleFirst);

storiesOf('Header', module)
  .add('Header default', () => <Header alt="hello" homeLink="https://www.google.com" />)
  .add('Header with custom Logo', () => <Header logo={nihLogo} homeLink="https://www.google.com" />)
  .add('Easter Header with custom easter', () => <Header easter={easter2000} />)
  .add('Easter Header with custom logo and eas', () => <Header logo={nihLogo} easter={easter2000} />);

storiesOf('Footer', module).add('Footer', () => <Footer data={footerData} />);
storiesOf('MUIDatatable', module).add('left Selectable', () => <MUIDatatable columns={columns} data={data} title={title} selectCellPostion="right" />);
storiesOf('MUIDatatable', module).add('right Selectable', () => <MUIDatatable columns={columns} data={data} options={options} title={title} selectCellPostion="right" />);
storiesOf('StatsBar', module).add('StatsBar', () => <StatsBar data={statsData} globalStatsData={globalStatsData} statsStyling={statsStyling} />);
