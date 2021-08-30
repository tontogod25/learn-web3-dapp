import { useState } from 'react'
import { Col, Button, Alert, Space, Typography } from 'antd'
import { useAppState } from '@avalanche/hooks'
import { transactionUrl } from '@avalanche/lib'
import axios from 'axios'

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}

const tailLayout = {
    wrapperCol: { offset: 4, span: 20 },
}

const { Text } = Typography

const Export = () => {
    const [error, setError] = useState<string | null>(null)
    const [fetching, setFetching] = useState(false)
    const [hash, setHash] = useState(null)
    const { state } = useAppState()

    const exchangeUSD = () => {
        setFetching(true)
		axios
			.post(`/api/avalanche/export`, state)
			.then(res => {
                const hash = res.data
                setHash(hash)
				setFetching(false)
			})
			.catch(err => {
				console.error(err)
				setFetching(false)
			})
	}

    return (
		<Col style={{ minHeight: '350px', maxWidth: '600px'}}>
            <Space direction="vertical">
                <Button type="primary" onClick={exchangeUSD} loading={fetching}>
                    Export 0.05 AVAX
                </Button>
                {hash &&
                    <Alert
                    style={{ maxWidth: '550px'}}
                    type="success"
                    showIcon
                    message={                    
                        <a href={transactionUrl(hash ?? '')} target="_blank" rel="noreferrer">
                            View transaction on Avalanche Explorer
                        </a>
                    }
                    />
                }
                {error &&
                    <Alert
                        style={{ maxWidth: '350px'}}
                        type="error"
                        showIcon
                        closable
                        message={error}
                        onClose={() => setError('')}
                    />
                }
        </Space>
    </Col>
  );
};

export default Export
