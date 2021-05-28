import React from 'react'
import { ReactSRMWrapper } from '@nicecactus/react-srm-wrapper';

const MyModuleLoader = () => {
  return (
    <>
      <h2>React SRM wrapper</h2>
      <ReactSRMWrapper originUrl={process.env.REACT_APP_ASSET_MANIFEST_URL!} exportPath="testing.test" />
    </>
  )
};

export default MyModuleLoader;
