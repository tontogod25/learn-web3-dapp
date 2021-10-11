/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import CryptopunksData from 'contracts/the_graph/CryptopunksData.abi.json';
import detectEthereumProvider from '@metamask/detect-provider';
import React, {useEffect, useState} from 'react';
import {toDate, toEther} from '@the-graph/lib';
import {PunkdataT} from '@the-graph/types';
import styled from 'styled-components';
import {ethers} from 'ethers';
import {Card, Space, Typography} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
// No type definition available for the following package
// @ts-ignore
import Identicon from 'react-identicons';

const PUNK_CONTRACT_ADDRESS = process.env
  .NEXT_PUBLIC_PUNK_CONTRACT_ADDRESS as string;

const {Text} = Typography;

declare let window: {
  ethereum:
    | ethers.providers.ExternalProvider
    | ethers.providers.JsonRpcFetchFunc;
};

const {Meta} = Card;

const PunkSvg = ({svgString, size}: {svgString?: string; size: number}) => {
  return (
    <img
      src={`data:image/svg+xml;utf8,${encodeURIComponent(svgString ?? '')}`}
      width={size}
      height={size}
    />
  );
};

const DisplayedPunk = ({
  data,
  loading,
}: {
  data: PunkdataT;
  loading: boolean;
}) => {
  return (
    <Card
      hoverable
      style={{
        width: 165,
        height: 165,
        margin: '10px',
        background: 'gainsboro',
      }}
      loading={loading}
      cover={<PunkSvg svgString={data?.svgString} size={50} />}
    >
      <Meta
        style={{fontSize: '12px'}}
        title={data.traits?.split(',')[1]}
        description={
          <Space direction="vertical">
            <Text>{toEther(data.value)} Ξ</Text>
            <Text>{toDate(parseFloat(data.date))}</Text>
          </Space>
        }
        avatar={<Identicon string={data.owner?.id} size={24} />}
      />
    </Card>
  );
};

const Punks = ({data}: {data: PunkdataT[]}) => {
  const [loading, setLoading] = useState(false);
  const [punksData, setPunksData] = useState<PunkdataT[] | undefined>(
    undefined,
  );

  const fecthPunkData = async (
    contract: ethers.Contract,
    punkData: PunkdataT,
  ) => {
    try {
      const index = parseFloat(punkData.index);
      const svgString = await contract.punkImageSvg(index);
      const traits = await contract.punkAttributes(index);
      return {
        ...punkData,
        svgString: svgString.slice(24),
        traits,
      };
    } catch (error) {
      return punkData;
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setPunksData(undefined);
      setLoading(true);
      try {
        const provider = await detectEthereumProvider();

        if (provider) {
          const web3provider = new ethers.providers.Web3Provider(
            window.ethereum,
          );
          const contract = new ethers.Contract(
            PUNK_CONTRACT_ADDRESS,
            CryptopunksData,
            web3provider,
          );
          const promises = data.map((punk: PunkdataT) =>
            fecthPunkData(contract, punk),
          );
          return await Promise.all(promises);
        } else {
          alert('Please install Metamask at https://metamask.io');
        }
      } catch (error) {
        alert(`Something went wrong:, ${error.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData().then((data) => setPunksData(data));
  }, []);

  return (
    <CardsContainer>
      {punksData ? (
        punksData.map((punk: PunkdataT) => {
          return <DisplayedPunk data={punk} key={punk.id} loading={loading} />;
        })
      ) : loading ? (
        <LoadingOutlinedStyle>
          <LoadingOutlined style={{fontSize: '64px'}} spin />
        </LoadingOutlinedStyle>
      ) : null}
    </CardsContainer>
  );
};

const CardsContainer = styled.div`
  display: flex;
  max-width: 700px;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  min-height: 350px;
`;

const LoadingOutlinedStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  min-width: 100%;
`;

export default Punks;
