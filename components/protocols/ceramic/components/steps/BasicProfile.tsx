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
import {BasicProfile} from '@ceramicstudio/idx-constants';
import {IdxSchema} from '@ceramic/types';
import {PROTOCOL_INNER_STATES_ID} from 'types';

const layout = {
  labelCol: {span: 4},
  wrapperCol: {span: 20},
};

const tailLayout = {
  wrapperCol: {offset: 4, span: 20},
};

const {Text} = Typography;

const BasicProfileStep = () => {
  const {state, dispatch} = useGlobalState();
  const chainId = getCurrentChainId(state);
  const stepId = getCurrentStepIdForCurrentChain(state);

  const [basicProfileSaved, setBasicProfileSaved] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const [basicProfile, setBasicProfile] = useState<
    BasicProfile | undefined | null
  >(undefined);

  const {idx, currentUserDID} = useIdx();

  const idxDID = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.DID,
  );

  useEffect(() => {
    if (basicProfileSaved && basicProfile) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId,
        stepId,
        value: true,
      });
    }
  }, [basicProfileSaved, basicProfile]);

  const saveBasicProfile = async (values: BasicProfile) => {
    setSaving(true);
    const {name} = values;

    try {
      // Set BasicProfile (use IndexSchema.BasicProfile)

      setBasicProfileSaved(true);
    } catch (error) {
      alert(error.message);
    } finally {
      setSaving(false);
    }
  };

  const readBasicProfile = async () => {
    try {
      setFetching(true);

      // Read basic profile (use IdxSchema.BasicProfile enum)
      const resp = undefined;

      setBasicProfile(resp);
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
        onFinish={saveBasicProfile}
        initialValues={{
          from: idxDID,
        }}
      >
        <Form.Item label="DID" name="from" required>
          <Text code>{idxDID}</Text>
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
            onClick={readBasicProfile}
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
