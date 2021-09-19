import {useLocalStorage, useSteps, initialHookState} from 'hooks';
import {Footer, Header, Sidebar} from 'components/shared/Layout';
import {HooksState, ChainType, ProtocolI} from 'types';
import {useEffect} from 'react';
import {Row, Col} from 'antd';

const WrappedProtocol = (Protocol: React.FC<ProtocolI>, chain: ChainType) => {
  const storageKey = chain.id + '-nav';
  const [storageState, setStorageState] = useLocalStorage<HooksState>(
    storageKey,
    initialHookState,
  );
  const {validIndex, stepIndex, next, prev, step, clear, validate} = useSteps(
    chain.steps,
    storageState,
  );

  useEffect(() => {
    setStorageState({stepIndex, validIndex});
  }, [stepIndex, validIndex]);

  return (
    <Row>
      <Sidebar chain={chain} steps={chain.steps} stepIndex={stepIndex} />
      <Col span={16} style={{padding: '60px', height: '100vh'}}>
        <Header step={step} />
        <Protocol
          chainId={chain.id}
          clear={clear}
          validate={validate}
          step={step}
        />
        <Footer
          chainId={chain.id}
          steps={chain.steps}
          stepIndex={stepIndex}
          validIndex={validIndex}
          next={next}
          prev={prev}
        />
      </Col>
    </Row>
  );
};

export default WrappedProtocol;
