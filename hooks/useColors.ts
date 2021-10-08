import {CHAINS} from 'types';
import {getChainColors} from 'utils/colors';

const useColors = (chainId: CHAINS) => {
  const {primaryColor, secondaryColor} = getChainColors(chainId);

  return {
    primaryColor,
    secondaryColor,
  };
};

export default useColors;
