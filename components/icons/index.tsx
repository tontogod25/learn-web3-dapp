import styled from 'styled-components';

import {CHAINS_CONFIG} from 'lib/constants';
import {CHAINS} from 'types';
import {PolygonLogo} from './polygon';

const ProtocolLogo = ({
  chainId,
  size = 35,
}: {
  chainId: CHAINS;
  size: number;
}) => {
  const {logoUrl} = CHAINS_CONFIG[chainId];

  if (chainId === CHAINS.POLYGON) {
    return <PolygonLogo size={size} />;
  } else {
    return <Logo src={logoUrl} size={size} />;
  }
};

const Logo = styled.img<{size: number}>`
  height: ${({size}) => `${size}px`};
  margin-bottom: 10px;
`;

export default ProtocolLogo;
