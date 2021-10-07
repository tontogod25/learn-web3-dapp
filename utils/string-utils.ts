export const slicedAddress = (
  address: string,
  startChar: number = 5,
  endChar: number = 5,
): string => `${address.slice(0, startChar)}...${address.slice(-endChar)}`;
