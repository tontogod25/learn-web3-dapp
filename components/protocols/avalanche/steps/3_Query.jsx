import { useState } from "react";
import { Alert, Button, Space, Col, Input, Typography } from 'antd';
import axios from 'axios';

const { Text } = Typography;
const { TextArea } = Input;

const Query = () => {
  const [isFunded, setIsFunded] = useState(false);
  const [value, setValue] = useState("");
  const [query, setQuery] = useState();

  const getQuery = () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/avalanche/query`)
      .then(res => setQuery(res.data))
  }
    
  return (
    <Col>
      <Space direction="vertical" size="large">
        <Space direction="vertical">
          <Text>We can query information from Avalanche using the InfoAPI</Text>
          <TextArea rows={4} style={{ background: "#000", textColor: "#fff"}} placeholder="console output" />
          <Button type="primary" onClick={getQuery}>Query the network</Button>
        </Space>
        {isFunded && <Alert message={<Text strong>Address Funded!</Text>} type="success" showIcon />}
      </Space>
    </Col>
  );
}

export default Query