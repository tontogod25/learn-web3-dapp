import SimpleStorageJson from 'contracts/polygon/SimpleStorage/build/contracts/SimpleStorage.json';
import {ethers} from 'ethers';

declare let window: {
  ethereum: ethers.providers.ExternalProvider;
};

const setValue = async (value: number) => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contractAddress = SimpleStorageJson.networks['80001'].address;
    // try to figure out the expected parameters
    const contract = new ethers.Contract(undefined);
    // try to figure out the expected method
    const transactionResult = undefined;
    const receipt = await transactionResult.wait();
    return {hash: receipt.transactionHash};
  } catch (error) {
    return {
      error: error.message,
    };
  }
};

export default setValue;
