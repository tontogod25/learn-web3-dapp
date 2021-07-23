import { useState } from "react";
import { Row, Typography } from 'antd';

import Sidebar from "components/shared/Sidebar";
import { ChainType } from "types/types";
import Step from "components/shared/Step";
import Connect from "./steps/1_Connect";
import Fund from "./steps/2_Fund";

import { useSteps } from "hooks/steps-hooks";
import { PolygonAccount } from "types/polygon-types";


const { Text, Paragraph } = Typography;

const Chain = ({ chain }: { chain: ChainType }) => {
  const [account, setAccount] = useState<PolygonAccount | null>(null);

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
            {step.id === "fund" && <Fund />}
          </>
        }
        nav={<Nav account={account} />}
      />
    </Row>
  );
}

const Nav = ({ account }: { account: any }) => {
  if (!account) return null;

  const publicKey = account.publicKey.toString();
  const publicKeyToDisplay = `${publicKey.slice(0,5)}...${publicKey.slice(-5)}`;

  return (
    <div style={{ position: "fixed", top: 20, right: 20 }}>
      <Paragraph copyable={{ text: account.publicKey.toString() }}>
        <Text code>{publicKeyToDisplay}</Text>
      </Paragraph>
    </div>
  )
}

export default Chain