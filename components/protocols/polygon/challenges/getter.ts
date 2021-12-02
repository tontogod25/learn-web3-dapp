import SimpleStorageJson from 'contracts/polygon/SimpleStorage/build/contracts/SimpleStorage.json';
import {ethers} from 'ethers';

declare let window: {
  ethereum: ethers.providers.ExternalProvider;
};

const setter = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractAddress = SimpleStorageJson.networks['80001'].address;
    const contract = new ethers.Contract(
      contractAddress,
      SimpleStorageJson.abi,
      signer,
    );
    const value = await contract.get();
    return {value};
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export default setter;
