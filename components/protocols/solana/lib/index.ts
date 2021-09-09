// Helper for generating an account URL on Solana Explorer
const accountExplorer = (address: string, network: string) => {
  if (network === 'localhost') {
    return `https://explorer.solana.com/address/${address}?cluster=custom&customUrl=http://127.0.0.1:8899`;
  } else {
    return `https://explorer.solana.com/address/${address}?cluster=devnet`;
  }
};

// Helper for generating an transaction URL on Solana Explorer
const transactionExplorer = (hash: string, network: string) => {
  if (network === 'localhost') {
    return `https://explorer.solana.com/tx/${hash}?cluster=custom&customUrl=http://127.0.0.1:8899`;
  } else {
    return `https://explorer.solana.com/tx/${hash}?cluster=devnet`;
  }
};

const prettyError = (error: any) => {
  return {
    message: error?.response?.data ?? 'Unkown message',
    file: error?.config?.url ?? 'Unkown file',
    agrs: error?.config?.data
      ? JSON.parse(error.config.data)
      : {error: 'inconnue'},
  };
};

export {prettyError, accountExplorer, transactionExplorer};
