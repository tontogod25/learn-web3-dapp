import { useState } from "react";
import { Row, Typography } from 'antd';

import Sidebar from "components/shared/Sidebar";
import { ChainType } from "types/types";
import Step from "components/shared/Step";

import Connect from "./steps/1_Connect";
import Account from "./steps/2_Account";
import Balance from "./steps/3_Balance";

import { useSteps } from "hooks/steps-hooks";

const { Text, Paragraph } = Typography;

const Chain = ({ chain }: { chain: ChainType }) => {
    const [keypair, setKeypair] = useState<string | null>(null);
    
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
            {step.id === "account" && <Account keypair={keypair} setKeypair={setKeypair} />}
            {step.id === "balance" && <Balance keypair={ keypair }/>}
          </>
        }
        nav={<Nav keypair={keypair} />}
      />
    </Row>
  );
}

const Nav = ({ keypair }: {keypair: any}) => {
  if (!keypair) return null;

  const publicKey = keypair.publicKey.toString();
  const publicKeyToDisplay = `${publicKey.slice(0,5)}...${publicKey.slice(-5)}`;

  return (
    <div style={{ position: "fixed", top: 20, right: 20 }}>
      <Paragraph copyable={{ text: keypair.publicKey.toString() }}>
        <Text code>{publicKeyToDisplay}</Text>
      </Paragraph>
    </div>
  )
}

export default Chain
