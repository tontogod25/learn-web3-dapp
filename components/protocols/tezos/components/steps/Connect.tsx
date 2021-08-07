import { useEffect, useState } from "react";
import { Alert, Col, Space, Typography } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import axios from "axios";

const { Text } = Typography;

const Connect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const getConnection = async () => {
      setFetching(true);
      axios
        .get(`/api/tezos/connect`)
        .then((_res) => {
          setIsConnected(true);
          setFetching(false);
        })
        .catch((err) => {
          console.error(err);
          setIsConnected(false);
          setFetching(false);
        });
    };
    getConnection()
    }, []);


  return (
    <Col style={{ width: "100%" }}>
      {fetching ? (
        <LoadingOutlined style={{ fontSize: 24 }} spin />
      ) : isConnected ? (
        <Alert
          message={
            <Space>
              Connected to Tezos
            </Space>
          }
          type="success"
          showIcon
        />
      ) : (
        <Alert message="Not connected to Tezos" type="error" showIcon />
      )}
    </Col>
  );
};

export default Connect;
