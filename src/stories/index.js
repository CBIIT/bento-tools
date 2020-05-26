// src/stories/index.js
/* eslint-disable */

import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../components/Button';
import StyledButton from '../components/StyledButton';
import Header from '../components/headers';
import Footer from '../components/footer';
import FooterData from './mockdata/footer.json';

import nihLogo from './icdc_nih_logo.svg';
import easter2000 from './Canine2000.png';

storiesOf('Button', module)
  .add('with text', () => (
    <Button label="Test" />
  ))
  .add('with continue', () => (
    <Button label="Continue" />
  ));

storiesOf('StyledButton', module).add('with noprops', () => (
  <StyledButton children="Continue" />
));

storiesOf('Header', module)
  .add('Header default', () => (
    <Header />
  ))
  .add('Header with custom Logo', () => (
    <Header logo={nihLogo} />
  ))
  .add('Easter Header with custom easter', () => (
    <Header easter={easter2000} />
  ))
  .add('Easter Header with custom logo and eas', () => (
    <Header logo={nihLogo} easter={easter2000} />
  ));

storiesOf('Footer', module)
  .add('with default props', () => (
    <Footer data={FooterData} />
  ));
