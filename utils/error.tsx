import ReactJson from 'react-json-view';

export type ErrorT = {
  message: string;
  file?: string;
  args?: string;
};

export const ErrorBox = ({error}: {error: ErrorT}) => {
  return (
    <ReactJson
      src={error}
      collapsed={false}
      name={'error'}
      displayDataTypes={false}
      displayObjectSize={false}
      collapseStringsAfterLength={35}
    />
  );
};

export const prettyError = (error: any) => {
  return {
    message: error?.response?.data ?? 'Unknown message',
    file: error?.config?.url ?? 'Unknown file',
    args: error?.config?.data
      ? JSON.parse(error.config.data)
      : {error: 'Unknown'},
  };
};
