import {useGlobalState} from 'context';
import {useEffect} from 'react';
import {Col} from 'antd';

const Deploy = () => {
  const {state: globalState, dispatch: globalDispatch} = useGlobalState();

  useEffect(() => {
    if (globalState.valid < 5) {
      globalDispatch({
        type: 'SetValid',
        valid: 5,
      });
    }
  }, []);

  return (
    <Col>
      Follow the instructions on Figment Learn and deploy the Solidity contract
      on Polygon
    </Col>
  );
};

export default Deploy;
