const prettyError = (error: any) => {
  return {
    message: error?.response?.data ?? 'Unknown message',
    file: error?.config?.url ?? 'Unknown file',
    agrs: error?.config?.data
      ? JSON.parse(error.config.data)
      : {error: 'Unknown'},
  };
};

const getEtherScanContract = (address: string) => {
  return `https://etherscan.io/address/${address}`;
};

export {prettyError, getEtherScanContract};
