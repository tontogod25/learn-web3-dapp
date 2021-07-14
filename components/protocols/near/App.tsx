import { Row, Typography, Popover, Button } from 'antd';

import Sidebar from "components/shared/Sidebar";
import { ChainType } from "types/types";
import Step from "components/shared/Step";

import Connect from "@near/steps/1_Connect";
import KeyPairGenerator from "@near/steps/2_KeyPairGenerator";
import Account from "@near/steps/3_Account";
import Transfer from "@near/steps/4_Transfer";
import { getPrettyPublicKey } from '@near/utils';
import { useSteps } from "hooks/steps-hooks";

import { useAppState } from '@near/hooks'

const { Text, Paragraph } = Typography;

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
                {step.id === "keypair" && <KeyPairGenerator />}
                {step.id === "account" && <Account />}
                {step.id === "transfer" && <Transfer />}
            </>
            }
            nav={<Nav />}
        />
        </Row>
  );
}

const Nav = () => {
    const { state } = useAppState();
    const { networkId, secretKey, accountId, contractId} = state;

    const displaySecretKey = (secretKey: string) => `${getPrettyPublicKey(secretKey).slice(0,5)}...${getPrettyPublicKey(secretKey).slice(-5)}`
    const displayNetworkId = (networkId: string) => networkId
    const displayAccountId = (accountId: string) => accountId
    const displayContractId = (contractId: string) => contractId

    type EntryT = {
        msg: string
        display: (value: string) => string
        value: string
    }
    const Entry = ({ msg, display, value }: EntryT) => {
        return (
            <Paragraph copyable={{ text: value }}>
                <Text strong>{msg}</Text>
                <Text code>{display(value)}</Text>
            </Paragraph>
        )
    }

    const AppState = () => {
        return (
        <>
            <Entry msg={"Network: "} value={networkId} display={displayNetworkId} />
            {secretKey && <Entry msg={"Public key: "} value={secretKey} display={displaySecretKey} />}
            {accountId && <Entry msg={"Account Id: "} value={accountId} display={displayAccountId} />}
            {contractId && <Entry msg={"Contratc Id"} value={ contractId} display={displayContractId} />}
        </>
        )
    }

    return (
        <div style={{ position: "fixed", top: 20, right: 20 }}>
            <Popover content={AppState} placement="rightBottom">
                <Button type="primary">Storage</Button>
            </Popover>
        </div>
    )
}

export default NearApp
