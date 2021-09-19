import {useAppState} from '@polygon/context';
import {useEffect} from 'react';
import {Col} from 'antd';

const Deploy = () => {
  const {state} = useAppState();

  useEffect(() => {
    state.validator(5);
  }, []);

  return (
    <Col style={{minHeight: '350px', maxWidth: '600px'}}>
      Follow the instructions on Figment Learn and deploy the Solidity contract
      on Polygon
    </Col>
  );
};

export default Deploy;
