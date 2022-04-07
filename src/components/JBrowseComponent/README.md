# JBrowse - Bento

Here developers can find sample implementation and configration of JBrowse component from Bento. Under the hood this component is using [@jbrowse/react-linear-genome-view](https://www.npmjs.com/package/@jbrowse/react-linear-genome-view) library. 

## Installation of Bento components.

Use the package manager [npm](https://www.npmjs.com/) to install Bento components Building Blocks.

```bash
npm install bento-components
```
## Reference implementation - ICDC
Reference implementation of this component can be found here. 
- Custodian file: https://github.com/CBIIT/bento-icdc-frontend/blob/main/src/bento/JBrowseData.js
- Reference folder structure: https://github.com/CBIIT/bento-icdc-frontend/tree/main/src/pages/JbrowseDetail
- Controller file: https://github.com/CBIIT/bento-icdc-frontend/blob/main/src/pages/JbrowseDetail/JbrowseController.js
- View file: https://github.com/CBIIT/bento-icdc-frontend/blob/main/src/pages/JbrowseDetail/JbrowseDetailView.js

## Folder structure

JBrowse component needs to have 1 custodian file as configration file with number of graphql queries. Please make sure your project does have those queries setup. Folder structure looks like below. 

```react
├── src
|   ├── ...
|   ├── bento
|   |   ├── ... 
|   │   └── JBrowseData.js            # JBrowse's custodian configration file.
|   |
|   └── pages
|       ├── ... 
|       └── JbrowseDetail
|           ├── JbrowseController.js  # JBrowse's controller.
|           └── JbrowseDetailView.js  # JBrowse's view, import "JBrowseComponent" here.
|
└── .gitignore
```

## Here is sample about how to import "JBrowseComponent"

```react
//How to import "JBrowseComponent" 
import { JBrowseComponent } from 'bento-components';
```

