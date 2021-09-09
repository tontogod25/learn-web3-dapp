import {useState} from 'react';
import {Row, Typography} from 'antd';

import Sidebar from 'components/shared/Sidebar';
import {ChainType} from 'types';
import Step from 'components/shared/Step';
import Connect from './steps/1_Connect';
import {useSteps} from 'hooks/steps-hooks';

const {Text, Paragraph} = Typography;

const Chain = ({chain}: {chain: ChainType}) => {
  const [keypair, setKeypair] = useState(null);
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
        body={<>{step.id === 'connect' && <Connect />}</>}
        nav={<div>nav</div>}
      />
    </Row>
  );
};

export default Chain;
