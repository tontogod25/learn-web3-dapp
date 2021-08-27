import { Typography, Popover, Button } from 'antd';
import { useAppState } from '@ccelo/hooks'
import type { EntryT } from '@ccelo/types';

const { Text, Paragraph } = Typography;

const Nav = () => {
    const { state, dispatch } = useAppState();
    const { network, secret, address, contract } = state;

    const displayNetwork = (network: string) => network
    const displayAddress = (address: string) => `${address.slice(0,5)}...${address.slice(-5)}`
    const displaySecret = (secret: string) => `${secret.slice(0,5)}...${secret.slice(-5)}`

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
                {network && <Entry msg={"Network version: "} value={network} display={displayNetwork} />}
                {address && <Entry msg={"Address: "} value={address} display={displayAddress} />}
                {secret && <Entry msg={"Secret"} value={secret} display={displaySecret} />}
                {contract && <Entry msg={"Contract: "} value={contract} display={displayAddress} />}
            </>
        )
    }

    const clearStorage = () => {
        alert('You are going to clear the storage')
        localStorage.removeItem('celo')
        dispatch({
            type: 'SetAddress',
            address: undefined
        })
        dispatch({
            type: 'SetContract',
            contract: undefined
        })
        dispatch({
            type: 'SetSecret',
            secret: undefined
        })
        dispatch({
            type: 'SetIndex',
            index: 0
        })
        dispatch({
            type: 'SetNetwork',
            network: 'alfajores'
        })
    }

    return (
        <>
            <div style={{ position: "fixed", top: 25, right: 60 }}>
                <Popover content={AppState} placement="rightBottom">
                    <Button type="primary">Storage</Button>
                </Popover>
            </div>
            <div style={{ position: "fixed", top: 25, right: 165 }}>
                <Button danger onClick={clearStorage}>Clear Storage</Button>
            </div>
        </>
    )
}

export { Nav }
