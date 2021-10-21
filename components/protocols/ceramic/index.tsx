import {Web3AuthProvider} from '@ceramic/context/idx';
import Layout from 'components/shared/Layout';
import React from 'react';
import {
  CERAMIC_NETWORKS,
  CERAMIC_PROTOCOLS,
  ChainType,
  PROTOCOL_STEPS_ID,
} from 'types';
import Nav from '@ceramic/components/nav';
import {
  BasicProfile,
  Connect,
  CustomDefinition,
  LogIn,
} from '@ceramic/components/steps';
import {
  getCurrentChainId,
  getCurrentStepIdForCurrentChain,
  useGlobalState,
} from 'context';
import {getNodeURL} from '@funnel/datahub';
import SetupWizard from 'components/shared/SetupWizard';
import LocalStorageIdentityStore from '@ceramic/lib/identityStore/LocalStorage';

const Ceramic: React.FC = () => {
  const {state} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const stepId = getCurrentStepIdForCurrentChain(state);
  const nodeUrl = getNodeURL(
    chainId,
    CERAMIC_NETWORKS.TESTNET,
    CERAMIC_PROTOCOLS.HTTP,
    'devnet',
  );
  // IdentityStore is responsible for persisting address, did and basic profile
  // Here we use LocalStorage identity store, but we could easily create another abstractions for ie. storing data in cookies
  const identityStore = new LocalStorageIdentityStore('learn-web3-dapp');

  return (
    <Web3AuthProvider ceramicNodeUrl={nodeUrl} identityStore={identityStore}>
      <div key={stepId}>
        <Nav />
        {stepId === PROTOCOL_STEPS_ID.PROJECT_SETUP && <SetupWizard showText />}
        {stepId === PROTOCOL_STEPS_ID.CHAIN_CONNECTION && <Connect />}
        {stepId === PROTOCOL_STEPS_ID.LOGIN && <LogIn />}
        {stepId === PROTOCOL_STEPS_ID.BASIC_PROFILE && <BasicProfile />}
        {stepId === PROTOCOL_STEPS_ID.CUSTOM_DEFINITION && <CustomDefinition />}
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
