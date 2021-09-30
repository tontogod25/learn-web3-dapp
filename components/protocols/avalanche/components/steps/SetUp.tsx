import {Col, Space, Button} from 'antd';
import {useGlobalState} from 'context';
import {setStepsStatus} from 'utils';

const SetUp = ({stepId}: {stepId: string}) => {
  const {state: globalState, dispatch} = useGlobalState();
  const state = globalState.avalanche;

  return (
    <Col>
      <Space direction="vertical" size="large">
        <Button
          type="primary"
          onClick={() =>
            dispatch({
              type: 'SetAvalancheStepsStatus',
              stepsStatus: setStepsStatus(state.stepsStatus, stepId, true),
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

export default SetUp;
