import { Row } from 'antd';

import Sidebar from "components/shared/Sidebar";
import { ChainType } from "types/types";
import Step from "components/shared/Step";

import Connect from "@near/steps/1_Connect";
import KeyPairGen from "@near/steps/2_KeyPairGen";
import Account from "@near/steps/3_Account";
import Balance from "@near/steps/4_Balance";
import Transfer from "@near/steps/5_Transfer";
import { useSteps } from "hooks/steps-hooks";
import Nav from '@near/Nav';

const NearApp = ({ chain }: { chain: ChainType }) => {
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
                {step.id === "keypair" && <KeyPairGen />}
                {step.id === "account" && <Account />}
                {step.id === "balance" && <Balance />}
                {step.id === "transfer" && <Transfer />}
            </>
            }
            nav={<Nav />}
        />
        </Row>
  );
}

export default NearApp
