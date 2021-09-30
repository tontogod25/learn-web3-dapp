import {
  Form,
  Input,
  Button,
  Alert,
  Space,
  Typography,
  Col,
  Modal,
  Divider,
} from 'antd';
import {ErrorBox} from '@ceramic/components';
import {useAppState} from '@ceramic/context';
import type {ErrorT} from '@ceramic/types';
import {useEffect, useState} from 'react';
import {useGlobalState} from 'context';
import {useIdx} from '@ceramic/context/idx';
import {IdxSchema, QuoteSchemaT} from '@ceramic/types';

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

const tailLayout = {
  wrapperCol: {offset: 4, span: 20},
};

const {Text} = Typography;

const BasicProfile = () => {
  const {state: globalState, dispatch: globalDispatch} = useGlobalState();
  const [error, setError] = useState<ErrorT | null>(null);
  const [saving, setSaving] = useState<boolean>(false);
  const [customSchemaSaved, setCustomSchemaSaved] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [customSchemaData, setCustomSchemaData] = useState<QuoteSchemaT | null>(
    null,
  );
  const {state} = useAppState();

  const {idx, currentUserDID} = useIdx();

  useEffect(() => {
    if (customSchemaData) {
      if (globalState.valid < 5) {
        globalDispatch({
          type: 'SetValid',
          valid: 5,
        });
      }
    }
  }, [customSchemaData]);

  useEffect(() => {
    if (error) {
      errorMsg(error);
    }
  }, [error, setError]);

  function errorMsg(error: ErrorT) {
    Modal.error({
      title: 'Something went wrong',
      content: <ErrorBox error={error} />,
      afterClose: () => setError(null),
      width: '800px',
    });
  }

  const saveQuote = async (values: QuoteSchemaT) => {
    setSaving(true);
    const {text, author} = values;

    try {
      await idx.set(IdxSchema.Figment, {text, author});
      setCustomSchemaSaved(true);
    } catch (error) {
      setError(error);
    } finally {
      setSaving(false);
    }
  };

  const handleGetQuote = async () => {
    try {
      const resp = await idx.get<QuoteSchemaT>(IdxSchema.Figment);
      setCustomSchemaData(resp);
    } catch (error) {
      setError(error);
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
          from: state?.DID,
        }}
      >
        <Form.Item label="DID" name="from" required>
          <Text code>{state?.DID}</Text>
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

      {customSchemaSaved && (
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

          {customSchemaData && (
            <div>
              <div>Text: {customSchemaData.text}</div>
              <div>Author: {customSchemaData.author}</div>
            </div>
          )}
        </>
      )}
    </Col>
  );
};

export default BasicProfile;
