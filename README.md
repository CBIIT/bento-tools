# Bento UI Building Blocks

Bento UI Building Blocks is an NPM library in ana attempt to reuse the shared ui components in NCI data commons frameworks.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Bento UI Building Blocks.

```bash
npm install bento-components
```

## Usage

```react
import { Header } from 'bento-components';

const ICDCHeader = () => <><Header /></>;
export default ICDCHeader;
```

## Scripts Available

```
### `npm run storybook`

Runs the app in the development mode.
Open [http://localhost:9001](http://localhost:9001) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
```
```
### `npm run storybook`

Builds the app for production to the `lib`  and  `es` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

Your app is ready to be deployed!

```