import styled from 'styled-components';
import {LoadingOutlined} from '@ant-design/icons';
import {colors} from 'utils/colors';

export const Spinner = ({color}: {color: string}) => {
  return (
    <SpinContainer>
      <LoadingOutlined style={{fontSize: '64px', color}} spin />
    </SpinContainer>
  );
};

const SpinContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  background-color: ${colors.darkBackground};
  justify-content: center;
  align-items: center;
`;
