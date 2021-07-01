import { useState } from "react";
import { Row, Typography } from 'antd';

import Sidebar from "components/shared/Sidebar";
import Step from "components/shared/Step";
import { StepType } from "types/types";
import { useSteps } from "hooks/steps-hooks";

import Connect from "./steps/1_Connect";
import Account from "./steps/2_Account";
import Query from "./steps/3_Query";
import TransferX from "./steps/5_Transfer_X";
import TransferXPC from "./steps/6_Transfer_XPC"

const { Text, Paragraph } = Typography;

const Avalanche = ({
	steps
}: {
	steps: StepType[]
}) => {
	const [keypair, setKeypair] = useState();

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
						{step.id === "account" && <Account keypair={keypair} setKeypair={setKeypair} />}
						{step.id === "query" && <Query />}
						{step.id === "transferX" && <TransferX keypair={keypair} />}
						{step.id === "transferXPC" && <TransferXPC keypair={keypair} />}
					</>
				}
				nav={<Nav keypair={keypair && keypair} />}
			/>
		</Row>
	);
}

const Nav = ({ keypair }) => {
	if (!keypair) return null;

	const publicKey = keypair;
	const publicKeyToDisplay = `${publicKey.slice(0,6)}...${publicKey.slice(-6)}`;

	return (
		<div style={{ position: "fixed", top: 20, right: 60 }}>
			<Paragraph copyable={{ text: keypair }}>
				<Text code>{publicKeyToDisplay}</Text>
			</Paragraph>
		</div>
	)
}

export default Avalanche