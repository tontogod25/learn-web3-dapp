import { useState } from "react";
import { Row, Space, Tag, Typography } from 'antd';
import { FundViewOutlined } from '@ant-design/icons';

import Sidebar from "components/shared/Sidebar";
import { ChainType } from "types/types";
import Step from "components/shared/Step";
import Connect from "./steps/1_Connect";
import Query from "./steps/2_Query";
import Balance from "./steps/3_Balance";
import Transfer from "./steps/4_Transfer";
import Deploy from "./steps/5_Deploy";
import Call from "./steps/6_Call";
import { PolygonAccountT, PolygonChainIdT } from 'types/polygon-types'
import { getPolygonAddressExplorerURL } from 'utils/polygon-utils'

import { useSteps } from "hooks/steps-hooks";

declare let window: any; // Prevents "Property 'ethereum' does not exist on type 'Window & typeof globalThis'. ts(2339)" linter warning

const { Paragraph } = Typography;

const Chain = ({ chain }: { chain: ChainType }) => {
  const [account, setAccount] = useState<PolygonAccountT>(null);

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
            {step.id === "connect" && <Connect setAccount={setAccount} />}
            {step.id === "query" && <Query account={account} />}
            {step.id === "balance" && <Balance account={account} />}
            {step.id === "transfer" && <Transfer account={account} />}
            {step.id === "deploy" && <Deploy account={account} />}
            {step.id === "call" && <Call account={account} />}
          </>
        }
        nav={<Nav account={account} />}
      />
    </Row>
  );
}

const Nav = ({ account }: { account: PolygonAccountT }) => {
  if (!account) return null;

  const addressToDisplay = `${account.slice(0,6)}...${account.slice(-4)}`;

  return (
    <div style={{ position: "fixed", top: 20, right: 20 }}>
      <Paragraph copyable={{ text: account, tooltips: `Click to copy!` }}>
        <a href={getPolygonAddressExplorerURL(account)} target="_blank" rel="noreferrer">
          <Tag color="gold">
            <Space>
              <FundViewOutlined />
              <div>View <strong>{addressToDisplay}</strong> on PolygonScan</div>
            </Space>
          </Tag>
        </a>
      </Paragraph>
    </div>
  )
}

export default Chain
