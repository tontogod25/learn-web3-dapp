import {Alert, Col, Typography, Space} from 'antd';
import {ArrowUpRight} from 'react-feather';
import styled from 'styled-components';
import React from 'react';

const {Text} = Typography;

const Header = ({title, url}: {title: string; url: string}) => {
  return (
    <StyleHeader>
      <Title>{title}</Title>
      <Alert
        message={
          <Space>
            <Text strong>Start here!</Text>
            <Space align="center" size="small">
              <Link>
                <a href={url} target="_blank" rel="noreferrer">
                  View the instructions for this step on Figment Learn
                </a>
              </Link>
              <ArrowUpRight
                color="#1890ff"
                size={18}
                style={{marginTop: '6px'}}
              />
            </Space>
          </Space>
        }
        type="info"
      />
    </StyleHeader>
  );
};

const StyleHeader = styled(Col)`
  margin-bottom: 40px;
`;

const Title = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const Link = styled.div`
  font-weight: 400;

  &:hover {
    text-decoration: underline;
  }
`;

export default Header;
