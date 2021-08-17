import { Typography, Popover, Button } from 'antd';
import { useAppState } from '@tezos/hooks'
import type { EntryT } from '@tezos/types';

const { Text, Paragraph } = Typography;

const Nav = () => {
    const { state, dispatch } = useAppState();
    const { network, secret, address, mnemonic } = state;

    const displayNetwork = (network: string) => network
    const displayAddress = (address: string) => `${address.slice(0,5)}...${address.slice(-5)}`

    const Entry = ({ msg, display, value }: EntryT) => {
        return (
            <Paragraph copyable={{ text: value }}>
                <Text strong>{msg}</Text>
                <Text code>{display(value)}</Text>
            </Paragraph>
        )
    }

    const AppState = () => {
        return (
        <>
            {network && <Entry msg={"Network: "} value={network} display={displayNetwork} />}
            {address && <Entry msg={"Address: "} value={address} display={displayAddress} />}
            {secret && <Entry msg={"Secret: "} value={secret} display={displayAddress} />}
            {mnemonic && <Entry msg={"Mnemonic: "} value={mnemonic} display={displayAddress} />}
        </>
        )
    }

    const clearStorage = () => {
        alert('You are going to clear the storage')
        localStorage.removeItem('tezos')
        dispatch({
            type: 'SetMnemonic',
            mnemonic: undefined
        })
        dispatch({
            type: 'SetAddress',
            address: undefined
        })
        dispatch({
            type: 'SetSecret',
            secret: undefined
        })
        dispatch({
            type: 'SetPassword',
            password: undefined
        })
        dispatch({
            type: 'SetEmail',
            email: undefined
        })
    }

    return (
    <>
        <div style={{ position: "fixed", top: 20, right: 20 }}>
            <Popover content={AppState} placement="rightBottom">
                <Button type="primary">Storage</Button>
            </Popover>
        </div>
        <div style={{ position: "fixed", top: 20, right: 100 }}>
            <Button danger onClick={clearStorage}>Clear Storage</Button>
        </div>

    </>
    )
}

export { Nav }
