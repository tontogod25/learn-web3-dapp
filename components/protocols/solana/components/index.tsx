import { Alert, Space, Typography, Popover, Button } from 'antd';
import { useAppState } from '@solana/hooks'
import type { EntryT, AlertT } from '@solana/types';
import { Switch } from 'antd';

const { Text, Paragraph } = Typography;

const Nav = () => {
    const { state, dispatch } = useAppState();
    const { network, address, programId, secret, greeter } = state;

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
            {network   && <Entry msg={"Network: "} value={network}   display={displayNetwork} />}
            {address   && <Entry msg={"Address: "} value={address}   display={displayAddress} />}
            {secret    && <Entry msg={"Secret: "}  value={secret}    display={displayAddress} />}
            {programId && <Entry msg={"Program: "} value={programId} display={displayAddress} />}
            {greeter   && <Entry msg={"Greeter: "} value={greeter}   display={displayAddress} />}
        </>
        )
    }

    const clearStorage = () => {
        alert('You are going to clear the storage')
        localStorage.removeItem('solana')
        dispatch({
            type: 'SetAddress',
            address: undefined
        })
        dispatch({
            type: 'SetSecret',
            secret: undefined
        })
        dispatch({
            type: 'SetProgramId',
            programId: undefined
        })
        dispatch({
            type: 'SetGreeter',
            greeter: undefined
        })
        dispatch({
            type: 'SetIndex',
            index: 0
        })
    }

    const toggleLocal = (checked: boolean) => {
        if (checked) {
            dispatch({
                type: 'SetNetwork',
                network: 'localhost'
            })
        } else {
            dispatch({
                type: 'SetNetwork',
                network: 'devnet'
            })
        }
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
        <div style={{ position: "fixed", top: 30, right: 335 }}>
            <Switch 
                defaultChecked={state.network === 'localhost' && state.index != 0}
                checkedChildren="localhost" 
                unCheckedChildren="devnet" 
                onChange={toggleLocal} 
                disabled={state.index !=0}
            />
        </div>
    </>
    )
}

const Notify = ({ msg, status }: {msg: string, status: AlertT }) => 
    <Alert
        message={
            <Space>
                <Text strong>{msg}</Text>
            </Space>
        }
        type={status}
        showIcon
    />

export { Nav, Notify }

/*

*/