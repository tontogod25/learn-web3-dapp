import {
  Form,
  Input,
  Button,
  Alert,
  Space,
  Typography,
  Col,
  Divider,
} from 'antd';
import {useEffect, useState} from 'react';
import {
  getChainInnerState,
  getCurrentChainId,
  getCurrentStepIdForCurrentChain,
  useGlobalState,
} from 'context';
import {useIdx} from '@ceramic/context/idx';
import {IdxSchema, QuoteSchemaT} from '@ceramic/types';
import {PROTOCOL_INNER_STATES_ID} from 'types';

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

const tailLayout = {
  wrapperCol: {offset: 4, span: 20},
};

const {Text} = Typography;

const CustomDefinition = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const stepId = getCurrentStepIdForCurrentChain(state);

  const [saving, setSaving] = useState<boolean>(false);
  const [customDefinitionSaved, setCustomDefinitionSaved] =
    useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [customDefinitionData, setCustomDefinitionData] =
    useState<QuoteSchemaT | null>(null);

  const {idx, currentUserDID} = useIdx();

  const idxDID = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.DID,
  );

  useEffect(() => {
    if (customDefinitionSaved && customDefinitionData) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId,
        stepId,
        value: true,
      });
    }
  }, [customDefinitionSaved, customDefinitionData]);

  const saveQuote = async (values: QuoteSchemaT) => {
    setSaving(true);
    const {text, author} = values;

    try {
      await idx.set(IdxSchema.Figment, {text, author});
      setCustomDefinitionSaved(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleGetQuote = async () => {
    try {
      const resp = await idx.get<QuoteSchemaT>(IdxSchema.Figment);
      setCustomDefinitionData(resp);
    } catch (error) {
      alert(error.message);
    } finally {
      setFetching(false);
    }
  };

  return (
    <Col style={{minHeight: '350px', maxWidth: '700px'}}>
      <div style={{marginBottom: '20px'}}>
        {currentUserDID ? (
          <Alert message="You are logged in" type="success" showIcon />
        ) : (
          <Alert message="You are not logged in" type="error" showIcon />
        )}
      </div>
      <Form
        {...layout}
        name="transfer"
        layout="horizontal"
        onFinish={saveQuote}
        initialValues={{
          from: idxDID,
        }}
      >
        <Form.Item label="DID" name="from" required>
          <Text code>{idxDID}</Text>
        </Form.Item>

        <Form.Item
          label="Text"
          name="text"
          required
          tooltip="Quote text associated with your custom schema"
        >
          <Space direction="vertical">
            <Input style={{width: '200px'}} />
          </Space>
        </Form.Item>

        <Form.Item
          label="Author"
          name="author"
          required
          tooltip="Author of a quote"
        >
          <Space direction="vertical">
            <Input style={{width: '200px'}} />
          </Space>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button
            type="primary"
            htmlType="submit"
            disabled={saving}
            loading={saving}
          >
            Save
          </Button>
        </Form.Item>
      </Form>

      {customDefinitionSaved && (
        <>
          <Divider />
          <Button
            type="primary"
            onClick={handleGetQuote}
            disabled={fetching}
            loading={fetching}
          >
            Get name
          </Button>

          {customDefinitionData && (
            <div>
              <div>Text: {customDefinitionData.text}</div>
              <div>Author: {customDefinitionData.author}</div>
            </div>
          )}
        </>
      )}
    </Col>
  );
};

export default CustomDefinition;
