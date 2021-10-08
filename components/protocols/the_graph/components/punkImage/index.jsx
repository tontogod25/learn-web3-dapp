/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import CryptopunksData from 'contracts/the_graph/CryptopunksData.abi.json';
import {useEffect, useState} from 'react';
import {ethers} from 'ethers';

const CONTRACT_ADDRESS = '0x16F5A35647D6F03D5D3da7b35409D65ba03aF3B2';

const PunkImage = ({index}) => {
  let [icon, setIcon] = useState('');

  useEffect(() => {
    const importIcon = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CryptopunksData,
        provider,
      );
      let importedIcon = await contract.punkImageSvg(index);
      return importedIcon;
    };
    importIcon().then((data) => setIcon(data.slice(24)));
  }, []);

  return (
    <img
      src={`data:image/svg+xml;utf8,${encodeURIComponent(icon)}`}
      width={'32'}
      height={'32'}
    />
  );
};

export default PunkImage;
