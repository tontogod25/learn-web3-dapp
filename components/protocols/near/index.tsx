import { useState } from "react";
// import { useContext } from "react";

import { Row, Typography } from 'antd';

import Sidebar from "components/shared/Sidebar";
import { ChainType } from "types/types";
import Step from "components/shared/Step";

import Connect from "./steps/1_Connect";
import KeyPairGenerator from "./steps/2_KeyPairGenerator";
import Account from "./steps/3_Account";
import Transfer from "./steps/4_Transfer";
// import { NearContext } from './context/near-context';

import { useSteps } from "hooks/steps-hooks";
import { KeyPair, keyStores } from 'near-api-js';

const { Text, Paragraph } = Typography;

type KeyPairT = KeyPair | undefined;

const App = ({ chain }: { chain: ChainType }) => {
    // const nearState = useContext(NearContext);
    const keyStore = new keyStores.InMemoryKeyStore();
    const [keypair, setKeypair] = useState<KeyPairT>();
    
    const { steps } = chain

    const {
        next,
        prev,
        stepIndex,
        step,
        isFirstStep,
        isLastStep
    } = useSteps(steps);

    return (
        <Row>
        <Sidebar
            chain={chain}
            steps={steps}
            stepIndex={stepIndex}
        />
        <Step
            chain={chain}
            step={step}
            isFirstStep={isFirstStep}
            isLastStep={isLastStep}
            prev={prev}
            next={next}
            body={
            <>
                {step.id === "connect" && <Connect />}
                {step.id === "keypair" && <KeyPairGenerator keypair={ keypair } setKeypair={ setKeypair } />}
                {step.id === "account" && <Account keypair={ keypair } keyStore={ keyStore } />}
                {step.id === "transfer" && <Transfer keypair={ keypair } />}
            </>
            }
            nav={<Nav keypair={keypair} />}
        />
        </Row>
  );
}

const Nav = ({ keypair }: {keypair: any}) => {
  if (!keypair) return null;

  const publicKey = keypair?.getPublicKey().toString().slice(8);
  const publicKeyToDisplay = `${publicKey.slice(0,5)}...${publicKey.slice(-5)}`;

  return (
    <div style={{ position: "fixed", top: 20, right: 20 }}>
      <Paragraph copyable={{ text: publicKey }}>
        <Text code>{publicKeyToDisplay}</Text>
      </Paragraph>
    </div>
  )
}

const Chain = ({ chain }: { chain: ChainType }) =>
    // <NearContext.Provider value={  }>
        <App chain={chain} />
    // </NearContext.Provider>

export default Chain
