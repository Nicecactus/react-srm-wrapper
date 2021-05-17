import React from 'react'
import { ReactSRMWrapper } from '@robingoupil/react-srm-wrapper';

const MyModuleLoader = () => {
  return (
    <>
      <h2>React SRM wrapper</h2>
      <ReactSRMWrapper assetManifestUrl={process.env.REACT_APP_ASSET_MANIFEST_URL!} exportPath="testing.test" />
    </>
  )
};

export default MyModuleLoader;
