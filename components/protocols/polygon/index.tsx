import {useState} from 'react';
import {Row, Space, Tag, Typography} from 'antd';
import {FundViewOutlined} from '@ant-design/icons';
import Sidebar from 'components/shared/Sidebar';
import {ChainType} from 'types';
import Step from 'components/shared/Step';
import Connect from './steps/Connect';
import Query from './steps/Query';
import Balance from './steps/Balance';
import Deploy from './steps/Deploy';
import GetStorage from './steps/GetStorage';
import SetStorage from './steps/SetStorage';
import Transfer from './steps/Transfer';
import Restore from './steps/Restore';
import {PolygonAccountT} from 'types/polygon-types';
import {getPolygonAddressExplorerURL} from 'utils/polygon-utils';

import {useSteps} from 'hooks/steps-hooks';

// Prevents "Property 'ethereum' does not exist on type
// 'Window & typeof globalThis' ts(2339)" linter warning
declare let window: any;

const {Paragraph} = Typography;

const Chain = ({chain}: {chain: ChainType}) => {
  const [account, setAccount] = useState<PolygonAccountT>(null);

  const {steps} = chain;

  const {next, prev, stepIndex, step, isFirstStep, isLastStep} =
    useSteps(steps);

  return (
    <Row>
      <Sidebar chain={chain} steps={steps} stepIndex={stepIndex} />
      <Step
        chain={chain}
        step={step}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
        prev={prev}
        next={next}
        body={
          <>
            {step.id === 'connect' && (
              <Connect account={account} setAccount={setAccount} />
            )}
            {step.id === 'query' && <Query />}
            {step.id === 'restore' && <Restore />}
            {step.id === 'balance' && <Balance account={account} />}
            {step.id === 'transfer' && <Transfer />}
            {step.id === 'deploy' && <Deploy />}
            {step.id === 'setter' && <SetStorage />}
            {step.id === 'getter' && <GetStorage />}
          </>
        }
        nav={<Nav account={account} />}
      />
    </Row>
  );
};

const Nav = ({account}: {account: PolygonAccountT}) => {
  if (!account) return null;

  const addressToDisplay = `${account.slice(0, 6)}...${account.slice(-4)}`;

  return (
    <div style={{position: 'fixed', top: 20, right: 60}}>
      <Paragraph copyable={{text: account, tooltips: `Click to copy!`}}>
        <a
          href={getPolygonAddressExplorerURL(account)}
          target="_blank"
          rel="noreferrer"
        >
          <Tag color="gold">
            <Space>
              <FundViewOutlined />
              <div>
                View <strong>{addressToDisplay}</strong> on PolygonScan
              </div>
            </Space>
          </Tag>
        </a>
      </Paragraph>
    </div>
  );
};

export default Chain;
