import React from 'react'
import { ReactSRMWrapper } from '@robingoupil/react-srm-wrapper';

const App = () => {
  return (
    <>
      <h2>React SRM wrapper</h2>
      <ReactSRMWrapper assetManifestUrl="http://localhost:5000/asset-manifest.json" exportPath="testing.test" />
    </>
  )
};

export default App;
