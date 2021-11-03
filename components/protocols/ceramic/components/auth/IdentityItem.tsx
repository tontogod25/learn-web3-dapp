import React from 'react';
import {Col, Row, Space, Tag, Typography} from 'antd';
import {FundViewOutlined} from '@ant-design/icons';
import {slicedAddress} from 'utils/string-utils';

type IdentityItemProps = {
  label: string;
  value: string | undefined;
  slice?: boolean;
};

const IdentityItem = (props: IdentityItemProps): JSX.Element => {
  const {label, value, slice = false} = props;

  return (
    <Row>
      <Col span={6}>
        <span>{label}: </span>
      </Col>
      <Col span={18}>
        {value ? (
          <Typography.Paragraph
            copyable={{text: value, tooltips: `Click to copy!`}}
          >
            <Tag color="gold">
              <Space>
                <FundViewOutlined />
                <strong>{slice ? slicedAddress(value) : value}</strong>
              </Space>
            </Tag>
          </Typography.Paragraph>
        ) : (
          <Typography.Paragraph>N/A</Typography.Paragraph>
        )}
      </Col>
    </Row>
  );
};

export default IdentityItem;
