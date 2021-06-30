import { useState } from "react";
import { Row, Typography } from 'antd';

import Sidebar from "components/shared/Sidebar";
import { StepType } from "types/types";
import Step from "components/shared/Step";
import { useSteps } from "hooks/steps-hooks";
import Connect from "./steps/1_Connect";
import Account from "./steps/2_Account";
import Query from "./steps/3_Query";
import Balance from "./steps/4_Balance";
import Transfer from "./steps/5_Transfer";


const { Text, Paragraph } = Typography;

const Avalanche = ({
  steps
}: {
  steps: StepType[]
}) => {
  const [keypair, setKeypair] = useState(null);

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
        chain="Avalanche"
        steps={steps}
        stepIndex={stepIndex}
      />
      <Step
        step={step}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        prev={prev}
        next={next}
        body={
          <>
            {step.id === "connect" && <Connect />}
            {/* {step.id === "account" && <Account keypair={keypair} setKeypair={setKeypair} />}
            {step.id === "query" && <Query />}
            {step.id === "balance" && <Balance />}
            {step.id === "transfer" && <Transfer keypair={keypair} />} */}
          </>
        }
        nav={<Nav keypair={keypair} />}
      />
    </Row>
  );
}

const Nav = ({ keypair }: {keypair: any}) => {
  if (!keypair) return null;

  const publicKey = keypair;
  const publicKeyToDisplay = `${publicKey.slice(0,5)}...${publicKey.slice(-5)}`;

  return (
    <div style={{ position: "fixed", top: 20, right: 20 }}>
      <Paragraph copyable={{ text: keypair }}>
        <Text code>{publicKeyToDisplay}</Text>
      </Paragraph>
    </div>
  )
}

export default Avalanche