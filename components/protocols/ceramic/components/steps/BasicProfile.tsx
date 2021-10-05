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
import {ErrorBox} from '@ceramic/components/nav';
import {useAppState} from '@ceramic/context';
import type {ErrorT} from '@ceramic/types';
import {useEffect, useState} from 'react';
import {useGlobalState} from 'context';
import {useIdx} from '@ceramic/context/idx';
import {BasicProfile} from '@ceramicstudio/idx-constants';
import {IdxSchema} from '@ceramic/types';

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

const tailLayout = {
  wrapperCol: {offset: 4, span: 20},
};

const {Text} = Typography;

const BasicProfileStep = () => {
  const {state: globalState, dispatch: globalDispatch} = useGlobalState();
  const [basicProfileSaved, setBasicProfileSaved] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [error, setError] = useState<ErrorT | null>(null);
  const [basicProfile, setBasicProfile] = useState<BasicProfile | null>(null);
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
      title: 'Something went wrong',
      content: <ErrorBox error={error} />,
      afterClose: () => setError(null),
      width: '800px',
    });
  }

  const saveBasicProfile = async (values: BasicProfile) => {
    setSaving(true);
    const {name} = values;

    try {
      await idx.set(IdxSchema.BasicProfile, {name});
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
      const resp = await idx.get<BasicProfile>(IdxSchema.BasicProfile);
      setBasicProfile(resp);
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

export default BasicProfileStep;
