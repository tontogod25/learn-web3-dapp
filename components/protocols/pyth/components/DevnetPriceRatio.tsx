import {Card, Alert, Row, Col, Statistic} from 'antd';

export const DevnetPriceRatio = ({
  devnetToMainnetPriceRatioRef,
}: {
  devnetToMainnetPriceRatioRef: {usdc_sol: number; sol_usdc: number};
}) => {
  return (
    <Card>
      <Alert
        message="Devnet Swap Rate"
        description="The swap rate of Orca devnet pools is very different from mainnet!"
        type="warning"
        showIcon
      />
      <Row>
        <Col span={10}>
          <Statistic
            value={
              devnetToMainnetPriceRatioRef.sol_usdc === 1
                ? 'waiting for first tx'
                : devnetToMainnetPriceRatioRef.sol_usdc.toFixed(6)
            }
            prefix={'◎'}
            title={'SOL cost for 1 USDC'}
          />
        </Col>

        <Col span={10}>
          <Statistic
            value={
              devnetToMainnetPriceRatioRef.usdc_sol === 1
                ? 'waiting for first tx'
                : devnetToMainnetPriceRatioRef.usdc_sol.toFixed(6)
            }
            prefix={'$'}
            title={'USDC cost for 1 SOL'}
          />
        </Col>
      </Row>
    </Card>
  );
};
