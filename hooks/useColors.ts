import {GlobalStateT} from 'types';
import {getChainColors} from 'utils/colors';
import {getChainId} from 'utils/context';

const useColors = (state: GlobalStateT) => {
  const chainId = getChainId(state);
  const {primaryColor, secondaryColor} = getChainColors(chainId);

  return {
    primaryColor,
    secondaryColor,
  };
};

export default useColors;
