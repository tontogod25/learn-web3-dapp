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
  const [basicProfileSaved, setBasicProfileSaved] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [fetching, setFetching] = useState(false);
  const [basicProfile, setBasicProfile] = useState<typeof BasicProfile | null>(
    null,
  );
  const {state} = useAppState();

  const {idx, currentUserDID} = useIdx();

  useEffect(() => {
    if (basicProfile) {
      if (globalState.valid < 3) {
        globalDispatch({
          type: 'SetValid',
          valid: 3,
        });
      }
    }
  }, [basicProfile]);

  useEffect(() => {
    if (error) {
      errorMsg(error);
    }
  }, [error, setError]);

  function errorMsg(error: ErrorT) {
    Modal.error({
      title: 'Unable to save your name',
      content: <ErrorBox error={error} />,
      afterClose: () => setError(null),
      width: '800px',
    });
  }

  const saveBasicProfile = async (values: any) => {
    setSaving(true);
    const {name} = values;

    try {
      await idx.set('basicProfile', {name});
      setBasicProfileSaved(true);
    } catch (error) {
      setError(error);
    } finally {
      setSaving(false);
    }
  };

  const handleGetName = async () => {
    try {
      setFetching(true);
      const resp = await idx.get('basicProfile');
      setBasicProfile(resp);
    } catch (error) {
      setError(error);
      console.log('ERROR', error);
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
        onFinish={saveBasicProfile}
        initialValues={{
          from: state?.DID,
        }}
      >
        <Form.Item label="DID" name="from" required>
          <Text code>{state?.DID}</Text>
        </Form.Item>

        <Form.Item
          label="Name"
          name="name"
          required
          tooltip="Your name associated with DID"
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

      {basicProfileSaved && (
        <>
          <Divider />
          <Button
            type="primary"
            onClick={handleGetName}
            disabled={fetching}
            loading={fetching}
          >
            Get name
          </Button>

          {basicProfile && <Text code>Your name: {basicProfile.name}</Text>}
        </>
      )}
    </Col>
  );
};

export default BasicProfile;
