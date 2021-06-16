import React from 'react';
/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
import { storiesOf } from '@storybook/react';
import {
  withKnobs,
  select,
} from '@storybook/addon-knobs';
import { Button } from '@material-ui/core';
import MUIDatatable from '../components/datatables/MUIDataTable';
import ProgramSunburst from '../components/PieCharts/ProgramSunburst/ProgramSunburstView';
import CustomActiveDonut from '../components/PieCharts/CustomActiveDonut/CustomActiveDonutView';
import XoomInOut from '../components/about/xoomInOutView';
import users from '../stubs/users.json';
import footerData from '../stubs/footer.json';
import dataSunburst from '../stubs/sunbust.json';
import dataDonut from '../stubs/donut.json';
import Header from '../components/headers';
import Footer from '../components/footer';
import StatsBar from '../components/statsBar';
import { data as statsData, statsStyling, globalStatsData } from '../stubs/statsBar';
import { data as icdcStatsData, statsStyling as icdcStatsStyling, globalStatsData as icdcGlobalStatsData } from '../stubs/icdcStatsBar';

import nihLogo from './icdc_nih_logo.svg';
import easter2000 from './Canine2000.png';
import NavBar from '../components/navBar';
import LinkBar from '../components/LinkBar';
import {
  navBarData, navBarCartData, navBarstyling, numberOfCases,
} from '../stubs/navBarData';
import ToolTip from '../components/toolTips';

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

const imgPath = 'https://cbiit.github.io/bento-model/model-desc/bento-model.svg';

const nihLogoImg = {
  height: '54px',
  width: '463px',
  marginLeft: '9px',
};

storiesOf('Header', module)
  .add('Header default', () => <Header alt="hello" homeLink="https://www.google.com" />)
  .add('Header with custom Logo', () => <Header logo={nihLogo} homeLink="https://www.google.com" />)
  .add('Easter Header with custom easter', () => <Header easter={easter2000} />)
  .add('Easter Header with custom logo and eas', () => <Header logo={nihLogo} easter={easter2000} />)
  .add('ICDC Header', () => <Header logo={nihLogo} easter={easter2000} nihLogoImg={nihLogoImg} />);

storiesOf('Footer', module)
  .addDecorator(withKnobs)
  .add('Footer', () => {
    const background = select('background', ['#325068', '#23355B'], '#23355B');
    return <Footer data={footerData} background={background} />;
  });

storiesOf('MUIDatatable', module)
  .addDecorator(withKnobs)
  .add('Basic', () => {
    options.headerPagination = select('headerPagination', [true, false], true);
    options.footerPagination = select('footerPagination', [true, false], true);
    options.selectCellPostion = select('selectCellPostion', ['left', 'right'], 'left');

    return (<MUIDatatable columns={columns} data={data} options={options} title={title} />);
  });

storiesOf('PieCharts', module)
  .addDecorator(withKnobs)
  .add('ProgramSunburst', () => {
    const titleLocation = select('titleLocation', ['top', 'bottom'], 'top');
    const titleAlignment = select('titleAlignment', ['left', 'center', 'right'], 'center');
    return (
      <ProgramSunburst
        width={250}
        height={173}
        innerRadius={40}
        outerRadius={65}
        cx="50%"
        cy="50%"
        data={dataSunburst}
        titleLocation={titleLocation}
        titleAlignment={titleAlignment}
        titleText="Subjects"
      />
    );
  });
storiesOf('PieCharts', module).add('CustomActiveDonut', () => {
  const titleLocation = select('titleLocation', ['top', 'bottom'], 'bottom');
  const titleAlignment = select('titleAlignment', ['left', 'center', 'right'], 'left');
  const fontFamily = select('fontFamily', ['Nunito', 'Raleway'], 'Nunito');

  return (
    <CustomActiveDonut
      width={400}
      height={225}
      innerRadius={50}
      outerRadius={75}
      cx="50%"
      cy="50%"
      data={dataDonut}
      titleText="Subjects"
      titleLocation={titleLocation}
      titleAlignment={titleAlignment}
      fontFamily={fontFamily}
    />
  );
});
storiesOf('LinkBar', module).add('LinkBar', () => <LinkBar />);
storiesOf('ToolTip', module).add('ToolTip', () => (
  <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '50%' }}>
    <ToolTip title="Sample tooltip title" arrow placement="right">
      <Button>
        Hover over me
      </Button>
    </ToolTip>
  </div>
));
storiesOf('NavBar', module).add('NavBar', () => <NavBar navBarData={navBarData} navBarCartData={navBarCartData} navBarstyling={navBarstyling} numberOfCases={numberOfCases} />);
storiesOf('StatsBar', module)
  .add('Bento StatsBar', () => <StatsBar data={statsData} globalStatsData={globalStatsData} statsStyling={statsStyling} />)
  .add('ICDC StatsBar', () => <StatsBar data={icdcStatsData} globalStatsData={icdcGlobalStatsData} statsStyling={icdcStatsStyling} />);
storiesOf('About', module).add('XoomInOut', () => (
  <div style={{ marginTop: '100px' }}>
    <XoomInOut style={{ marginTop: '30px' }}><img src={imgPath} alt="zoominout" style={{ width: '100%' }} /></XoomInOut>
  </div>
));
