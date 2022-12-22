# Bento UI Building Blocks

Bento UI Building Blocks is a NPM library in an attempt to reuse the shared UI components across NCI data commons frameworks.

## Installation

Use the package manager [npm](https://www.npmjs.com/) to install Bento UI Building Blocks.

```bash
npm install bento-components
```

## Usage

### Header

```react
// Header
import { Header } from 'bento-components';

const ICDCHeader = () => <><Header /></>;
export default ICDCHeader;
```

### Footer

```react
// Footer
import { Footer } from 'bento-components';
import FooterData from './footer.json'; //path to the json file Sample can be found in Stubs

const ICDCFooter = () => <><Footer data={FooterData} /></>;
export default ICDCFooter
```

### DataTable

```react
// DataTable
For now we customized moving select cell to right
import { CustomDataTable } from 'bento-components';

const columns = ["Name", "Company", "City", "State"];

const data = [
 ["Joe James", "Test Corp", "Yonkers", "NY"],
 ["John Walsh", "Test Corp", "Hartford", "CT"],
 ["Bob Herm", "Test Corp", "Tampa", "FL"],
 ["James Houston", "Test Corp", "Dallas", "TX"],
];

const options = {
  selectCellPostion: 'right', // If not specified it defaults to left
};
<MUIDatatable columns={columns} data={data} options={options} selectCellPostion="right" />
```

### OverlayWindow

You can use this component to show a disclaimer to the user in the beginning of their session.

This component accepts two properties:

- `body` - Body markup
- `header` - Header markup

Here's an example of how a Bento-based project can use this component:

```react
// OverlayWindow
import { OverlayWindow } from 'bento-components';

<>
  <CssBaseline />
  <HashRouter>
    <>
      <Notifications />
      <InActivityDialog />
      <Header />
      <OverlayWindow body="Your body text" header="Your header text" />
      <NavBar />
      ...
    </>
  </HashRouter>
  ...
</>
```

The `body` and `header` are markup, so you don't have to stick to mere text, like in the example above.

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
