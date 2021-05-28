<h3 align="center">React SRM Wrapper</h3>

<p align="center">
  Easily integrate SRM into your React application
</p>

<p align="center">
  <a href="https://badge.fury.io/js/%40robingoupil%2Freact-srm-wrapper"><img src="https://badge.fury.io/js/%40robingoupil%2Freact-srm-wrapper.svg" alt="npm version" ></a>
</p>

## Table of contents

- [Quick start](#quick-start)
- [API Reference](#api-reference)

## Quick start

Install `@nicecactus/react-srm-wrapper`:

- with [npm](https://www.npmjs.com/): `npm install -S @nicecactus/react-srm-wrapper`
- with [yarn](https://yarnpkg.com/): `yarn add @nicecactus/react-srm-wrapper`

Create a loader component for your SRM.  
We will assume that:
* the asset-manifest.json file url is stored in `.env`  
* once loaded, the SRM `render()` function is exposed in `window.myOrg.myModule`
* the module will be served with the relative path `/my-module`

#### **`MyModuleLoader.tsx`**
```tsx
import React from 'react'
import { ReactSRMWrapper } from '@nicecactus/react-srm-wrapper';

const MyModuleLoader = () => {
  return (
    <>
      <h2>React SRM wrapper</h2>
      <ReactSRMWrapper assetManifestUrl={process.env.REACT_APP_ASSET_MANIFEST_URL!} exportPath="myOrg.myModule" basename="/my-module" />
    </>
  )
};

export default MyModuleLoader;
```

Expose the loader in your router ([example for React Router](https://reactrouter.com/web/guides/quick-start/1st-example-basic-routing))

## API Reference

### [ReactSRMWrapper](https://github.com/nicecactus/react-srm-wrapper/blob/master/index.tsx)

|||
|-|-|
| Selector | `ReactSRMWrapper` |

### Inputs
|||
|-|-|
| `assetManifestUrl` | Type: `string` <br /> URL to the `asset-manifest.json`. |
| `exportPath` | Type: `string` <br /> Path to the exported `render()` function once the module has been loaded. |
| `basename` | Type: `string` <br /> Default value: `/` <br /> Relative path the module is being served from. |
| `language` | Type: `string` <br /> Default value: `en` <br /> Language used for i18n. |
| `arguments` | Type: `object` <br /> Default value: `{}` <br /> Extra arguments to pass to the `render()` function. |
| `eventHandlers` | Type: `object` <br /> Default value: `{}` <br /> Custom events that can be called by the SRM. |

### Outputs
|||
|-|-|
| `loaded` | Type: `(el: HTMLElement) => any` <br /> Emits an event when the module has been loaded. |
| `rendered` | Type: `(args: any) => any` <br /> Emits an event when the module has been rendered. |
