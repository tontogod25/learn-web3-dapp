import {Row, Space} from 'antd';
import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';
import Link from 'next/link';

import {getChainColors} from 'utils/colors';
import {ChainType} from 'types';
import logoSVG from 'public/figment-learn-compact.svg';

const Nav = ({chain}: {chain: ChainType}) => {
  const {primaryColor, secondaryColor} = getChainColors(chain.id);

  return (
    <StyledNav
      primary_color={primaryColor}
      align="middle"
      justify="space-between"
    >
      <Space size="large" direction="horizontal" align="center">
        <Image src={logoSVG} alt="Figment Learn" height={41} width={100} />
        <ChainTitle
          secondary_color={secondaryColor}
        >{`${chain.label} Pathway`}</ChainTitle>
      </Space>

      <Link href="/">See All Pathways</Link>
    </StyledNav>
  );
};

const StyledNav = styled(Row)<{primary_color: string}>`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  height: 80px;
  z-index: 10;
  padding: 0 40px;
  background: ${({primary_color}) => primary_color};
  border-bottom: solid 2px black;

  a {
    color: black;
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
