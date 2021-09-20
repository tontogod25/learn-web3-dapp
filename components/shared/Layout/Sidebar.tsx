import logoSVG from 'public/figment-learn-compact.svg';
import {getChainColors} from 'utils/colors';
import {CHAINS, StepType} from 'types';
import styled from 'styled-components';
import {Col, Steps, Space} from 'antd';
import {ArrowLeft} from 'react-feather';
import {useGlobalState} from 'context';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const {Step} = Steps;

const Sidebar = ({label, steps}: {label: string; steps: StepType[]}) => {
  const {state} = useGlobalState();
  const {primaryColor, secondaryColor} = getChainColors(state.chain as CHAINS);

  return (
    <Left span={8} primary_color={primaryColor}>
      <Space
        size="large"
        direction="horizontal"
        align="center"
        style={{marginBottom: '40px'}}
      >
        <Image src={logoSVG} alt="Figment Learn" height={41} width={100} />
        <ChainTitle
          secondary_color={secondaryColor}
        >{`${label} Pathway`}</ChainTitle>
      </Space>

      <Steps direction="vertical" size="small" current={state.index}>
        {steps.map((s: StepType) => (
          <Step key={s.id} title={s.title} />
        ))}
      </Steps>

      <Footer>
        <Space align="center">
          <ArrowLeft size={20} style={{marginTop: '7px'}} />
          <Link href="/">See All Pathways</Link>
        </Space>
      </Footer>
    </Left>
  );
};

const ChainTitle = styled.div<{secondary_color: string}>`
  color: ${({secondary_color}) => secondary_color};
  margin-bottom: 8px;
  font-size: 28px;
  font-weight: 600;
`;

const Left = styled(Col)<{primary_color: string}>`
  background: ${({primary_color}) => primary_color};
  padding: 40px 0 0 40px;
  height: 100vh;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0 0 20px 35px;

  a {
    color: black;
    font-size: 15px;
    font-weight: 600;
  }
`;

export default Sidebar;
