export const VERSION = '0.0.1';

/*
import {Popover, Button, Select} from 'antd';
import {trackStorageCleared} from '@funnel/tracking-utils';
import {useGlobalState} from 'context';

const {Option} = Select;

const Nav = () => {
  const {state: globalState, dispatch: globalDispatch} = useGlobalState();
  // const {dispatch} = useAppState();

  const clear = () => {
    globalDispatch({
      type: 'SetIndex',
      index: 0,
    });
    globalDispatch({
      type: 'SetValid',
      valid: 0,
    });
    trackStorageCleared(globalState.chain as string);
  };

  const clearKeychain = () => {
    alert('You are going to clear the storage');
    /*
    dispatch({
      type: 'SetAddress',
      address: undefined,
    });
    dispatch({
      type: 'SetNetwork',
      network: 'datahub',
    });
    clear();
  };

  const AppState = () => {
    return (
      <>
        <Button danger onClick={clearKeychain} size={'small'}>
          Clear Keychain
        </Button>
      </>
    );
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 25,
        right: 60,
        display: 'flex',
        justifyContent: 'space-evenly',
        minWidth: '300px',
        minHeight: '100px',
      }}
    >
      <div>
        <Popover content={AppState} placement="leftBottom">
          <Button type="primary">Keychain</Button>
        </Popover>
      </div>
      <div>
        <Select
          defaultValue={'datahub'}
          style={{width: 100, textAlign: 'center'}}
          disabled={true} //{state.index != 0}
          showArrow={false}
        >
          <Option value="datahub">Datahub</Option>
          <Option value="testnet">Testnet</Option>
          <Option value="localhost">Localhost</Option>
        </Select>
      </div>
    </div>
  );
};

export {Nav};
*/
