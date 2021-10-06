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

  return (
    <Web3AuthProvider ceramicNodeUrl={nodeUrl}>
      <div style={{minHeight: '250px', marginBottom: '10vh'}}>
        {stepId === PROTOCOL_STEPS_ID.CHAIN_CONNECTION && <Connect />}
        {stepId === PROTOCOL_STEPS_ID.LOGIN && <LogIn />}
        {stepId === PROTOCOL_STEPS_ID.BASIC_PROFILE && <BasicProfile />}
        {stepId === PROTOCOL_STEPS_ID.CUSTOM_DEFINITION && <CustomDefinition />}
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
