import {ArrowLeftOutlined, ArrowRightOutlined} from '@ant-design/icons';
import {
  useGlobalState,
  getCurrentChainId,
  getCurrentStepIdForCurrentChain,
} from 'context';
import {FOOTER_HEIGHT} from 'lib/constants';
import styled from 'styled-components';
import {Col, Row} from 'antd';
import {useSteps, useColors} from 'hooks';
import {NextButton, PrevButton} from '../Button.styles';

const Footer = () => {
  const {state, dispatch} = useGlobalState();
  const {
    next,
    prev,
    isFirstStep,
    isLastStep,
    justify,
    nextStepTitle,
    previousStepTitle,
    isCompleted,
  } = useSteps(state, dispatch);

  const {primaryColor, secondaryColor} = useColors(getCurrentChainId(state));

  return (
    <Col span={24}>
      <StepFooter justify={justify} align="middle">
        {!isFirstStep && (
          <PrevButton
            size="large"
            style={{marginRight: '8px'}}
            onClick={() => prev()}
            icon={<ArrowLeftOutlined />}
          >
            {`Prev: ${previousStepTitle}`}
          </PrevButton>
        )}
        {!isLastStep && (
          <NextButton
            key={getCurrentStepIdForCurrentChain(state)}
            size="large"
            type="primary"
            onClick={() => next()}
            secondary_color={secondaryColor}
            primary_color={primaryColor}
            disabled={!isCompleted}
          >
            <Row align="middle">
              {`Next: ${nextStepTitle}`}
              <ArrowRightOutlined size={20} style={{marginLeft: '6px'}} />
            </Row>
          </NextButton>
        )}
      </StepFooter>
    </Col>
  );
};
/*
const NextButton = styled(Button)<{
  primary_color: string;
  secondary_color: string;
}>`
  border: none;
  color: ${({secondary_color}) => secondary_color};
  background: ${({primary_color}) => primary_color};

  &:hover {
    background: ${({primary_color}) => primary_color};
    color: ${({secondary_color}) => secondary_color};
    border: none;
    box-shadow: black 2px 2px 1px;
  }
`;

const PrevButton = styled(Button)`
  background: white;
  border: solid #777 1px;
  color: #777;

  &:hover {
    color: black;
    border: solid black 1px;
  }
`;
*/
const StepFooter = styled(Row)`
  padding: 0 40px;
  height: ${FOOTER_HEIGHT}px;
  background: #f5f5f5;
  border-top: solid 2px black;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
`;

export default Footer;
