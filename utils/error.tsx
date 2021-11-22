import dynamic from 'next/dynamic';
const DynamicReactJson = dynamic(() => import('react-json-view'), {ssr: false});

export type ErrorT = {
  message: string;
  file?: string;
  args?: string;
};

export const ErrorBox = ({error}: {error: ErrorT}) => {
  return (
    <DynamicReactJson
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
