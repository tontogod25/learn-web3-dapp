import {Row, Space} from 'antd';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

import {getChainColors} from 'utils/colors';
import {CHAINS} from 'types';
import logoSVG from 'public/figment-learn-compact.svg';
import {HEADER_HEIGHT} from 'lib/constants';
import {
  getLabelForCurrentChain,
  getCurrentChainId,
  useGlobalState,
} from 'context';

const Nav = () => {
  const {state} = useGlobalState();
  const currentChainId = getCurrentChainId(state) as CHAINS;
  const chainLabel = getLabelForCurrentChain(state);
  const {primaryColor, secondaryColor} = getChainColors(currentChainId);

  return (
    <StyledNav
      primary_color={primaryColor}
      secondary_color={secondaryColor}
      align="middle"
      justify="space-between"
    >
      <Space size="large" direction="horizontal" align="center">
        <Image src={logoSVG} alt="Figment Learn" height={41} width={100} />
        <ChainTitle
          secondary_color={secondaryColor}
        >{`${chainLabel} Pathway`}</ChainTitle>
      </Space>

      <Link href="/">See All Pathways</Link>
    </StyledNav>
  );
};

const StyledNav = styled(Row)<{primary_color: string; secondary_color: string}>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: ${HEADER_HEIGHT}px;
  z-index: 10;
  padding: 0 40px;
  background: ${({primary_color}) => primary_color};
  border-bottom: solid 2px black;

  a {
    color: ${({secondary_color}) => secondary_color};
    font-size: 15px;
    font-weight: 600;
  }
`;

const ChainTitle = styled.div<{secondary_color: string}>`
  color: ${({secondary_color}) => secondary_color};
  font-size: 24px;
  font-weight: 600;
`;

export default Nav;
