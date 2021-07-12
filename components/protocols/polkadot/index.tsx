import { useState } from "react";
import { Row, Typography } from 'antd';

import Sidebar from "components/shared/Sidebar";
import { ChainType } from "types/types";
import Step from "components/shared/Step";
import Connect from "./steps/1_Connect";
import Query from "./steps/2_Query";
import Account from "./steps/3_Account";
import { useSteps } from "hooks/steps-hooks";
import { PolkadotKeypairType } from "types/polkadot-types";

const { Text, Paragraph } = Typography;

const Chain = ({ chain }: { chain: ChainType }) => {
  const [keypair, setKeypair] = useState<PolkadotKeypairType | null>(null);
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
            {step.id === "query" && <Query />}
            {step.id === "account" && <Account keypair={keypair} setKeypair={setKeypair} />}
          </>
        }
        nav={<Nav keypair={keypair} />}
      />
    </Row>
  );
}

const Nav = ({ keypair }: { keypair : PolkadotKeypairType | null}) => {
	if (!keypair) return null;

	const address = keypair.account.address;
	const addressToDisplay = `${address.slice(0,6)}...${address.slice(-6)}`;

	return (
		<div style={{ position: "fixed", top: 20, right: 60 }}>
			<Paragraph copyable={{ text: address }}>
				<Text code>{addressToDisplay}</Text>
			</Paragraph>
		</div>
	)
}

export default Chain