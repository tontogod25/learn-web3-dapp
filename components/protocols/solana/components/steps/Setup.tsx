import {Col, Space, Button} from 'antd';
import {
  getCurrentChainId,
  useGlobalState,
  getChainCurrentStepId,
} from 'context';

const Setup = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const stepId = getChainCurrentStepId(state, chainId);
  console.log('here setup');

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Button
          type="primary"
          onClick={() =>
            dispatch({
              type: 'SetChainProgressIsCompleted',
              chainId,
              stepId,
              value: true,
            })
          }
          size="large"
        >
          I accept that figment will collect my data
        </Button>
      </Space>
    </Col>
  );
};

export default Setup;
