import styled from "styled-components";

import { CHAINS_CONFIG } from "lib/constants";
import { CHAINS } from "types/types"
import { PolygonLogo  } from "./polygon";

const ProtocolLogo = ({ chainId }: { chainId: CHAINS }) => {
  const { logoUrl } = CHAINS_CONFIG[chainId];
  
  if (chainId === CHAINS.POLYGON) {
    return <PolygonLogo />
  } else {
    return <Logo src={logoUrl} />
  }
}

const Logo = styled.img`
	height: 50px;
	margin-bottom: 20px;
`;

export default ProtocolLogo