import {Web3AuthProvider} from '@ceramic/context/idx';
import Layout from 'components/shared/Layout';
import React from 'react';
import {StepType, ChainType} from 'types';
import {Nav} from '@ceramic/components/nav';
import {
  Connect,
  LogIn,
  BasicProfile,
  CustomSchema,
} from '@ceramic/components/steps';

const Ceramic: React.FC<{step: StepType}> = ({step}) => {
  return (
    <Web3AuthProvider
      ceramicNodeUrl={process.env.NEXT_PUBLIC_CERAMIC_TESTNET_URL as string}
    >
      <div style={{minHeight: '250px', marginBottom: '10vh'}}>
        {step.id === 'connect' && <Connect />}
        {step.id === 'login' && <LogIn />}
        {step.id === 'basicProfile' && <BasicProfile />}
        {step.id === 'customSchema' && <CustomSchema />}
        <Nav />
      </div>
    </Web3AuthProvider>
  );
};

const WithLayoutCeramic: React.FC<{chain: ChainType; markdown: any}> = ({
  chain,
  markdown,
}) => {
  return Layout(Ceramic, chain, markdown);
};

export default WithLayoutCeramic;
