import {
  Form,
  Input,
  Button,
  Alert,
  Space,
  Typography,
  Col,
  Divider,
  Card,
} from 'antd';
import {useEffect, useState} from 'react';
import {
  getChainInnerState,
  getCurrentChainId,
  getCurrentStepIdForCurrentChain,
  useGlobalState,
} from 'context';
import {useIdx} from '@figment-ceramic/context/idx';
import {BasicProfile} from '@ceramicstudio/idx-constants';
import {IdxSchema} from '@figment-ceramic/types';
import {PROTOCOL_INNER_STATES_ID} from 'types';
import Auth from '@figment-ceramic/components/auth';

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

  const [saving, setSaving] = useState<boolean>(false);
  const [name, setName] = useState<string | undefined>(undefined);
  const [fetching, setFetching] = useState<boolean>(false);
  const [basicProfile, setBasicProfile] = useState<
    BasicProfile | undefined | null
  >(undefined);

  const {idx, isAuthenticated} = useIdx();

  const idxDID = getChainInnerState(
    state,
    chainId,
    PROTOCOL_INNER_STATES_ID.DID,
  );

  useEffect(() => {
    if (name) {
      dispatch({
        type: 'SetStepInnerState',
        chainId,
        innerStateId: PROTOCOL_INNER_STATES_ID.USER_NAME,
        value: name as string,
      });
    }
  }, [name]);

  useEffect(() => {
    if (basicProfile) {
      dispatch({
        type: 'SetStepIsCompleted',
        chainId,
        stepId,
        value: true,
      });
    }
  }, [basicProfile]);

  const saveBasicProfile = async (values: BasicProfile) => {
    setSaving(true);
    setBasicProfile(null);

    const {name} = values;

    try {
      // Set BasicProfile (use IndexSchema.BasicProfile)

      setName(name);
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
        <Auth />
      </div>

      {isAuthenticated && (
        <>
          <Card title="#1 - Set the name">
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
          </Card>

          {name && (
            <div>
              <Divider />
              <Card title="#2 - Get the name">
                <Space direction="vertical">
                  <Button
                    type="primary"
                    onClick={readBasicProfile}
                    disabled={fetching}
                    loading={fetching}
                  >
                    Get name
                  </Button>

                  {basicProfile && (
                    <div>
                      <Text>
                        Your name is <Text code>{basicProfile.name}</Text>
                      </Text>
                    </div>
                  )}
                </Space>
              </Card>
            </div>
          )}
        </>
      )}
    </Col>
  );
};

export default BasicProfileStep;
