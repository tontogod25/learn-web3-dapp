import { useState } from "react";
import { Row, Typography } from 'antd';

import Sidebar from "components/shared/Sidebar";
import { ChainType } from "types/types";
import Step from "components/shared/Step";

import Balance from "./steps/4_Balance";
import Account from "./steps/2_Account";
import Fund from "./steps/3_Fund";
import Transfer from "./steps/5_Transfer";
import Connect from "./steps/1_Connect";
import Deploy from "./steps/6_Deploy";
import Call from "./steps/7_Call";
import { useSteps } from "hooks/steps-hooks";

const { Text, Paragraph } = Typography;

const Chain = ({ chain }: { chain: ChainType }) => {
  const [keypair, setKeypair] = useState(null);

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
            {step.id === "fund" && <Fund />}
            {step.id === "balance" && <Balance />}
            {step.id === "transfer" && <Transfer keypair={keypair} />}
            {step.id === "deploy" && <Deploy />}
            {step.id === "call" && <Call />}
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