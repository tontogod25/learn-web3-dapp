import {GlobalContext, globalStateReducer, initialGlobalState} from 'context';
import {
  ChainType,
  MarkdownForChainIdT,
  GlobalStateT,
  LocalStorageStateT,
} from 'types';
import {GRID_LAYOUT, HEADER_HEIGHT} from 'lib/constants';
import React, {useEffect, useReducer} from 'react';
import styled from 'styled-components';
import {useLocalStorage} from 'hooks';
import Sidebar from './Sidebar';
import {Row, Col} from 'antd';
import Footer from './Footer';
import Nav from './Nav';
import {prepareGlobalState, prepareGlobalStateForStorage} from 'utils/context';

const Layout = (
  Protocol: React.FC,
  chain: ChainType,
  markdown: MarkdownForChainIdT,
) => {
  const [storageState, setStorageState] =
    useLocalStorage<LocalStorageStateT>('figment');
  const newGlobalState = prepareGlobalState(storageState, initialGlobalState);
  const [state, dispatch] = useReducer(globalStateReducer, newGlobalState);

  useEffect(() => {
    dispatch({
      type: 'SetCurrentChainId',
      currentChainId: chain.id,
    });
  }, []);

  useEffect(() => {
    setStorageState(prepareGlobalStateForStorage(state));
  }, [state, dispatch]);

  // Add spinner
  if (!state.currentChainId) {
    return <div> Loading </div>;
  }

  return (
    <GlobalContext.Provider value={{state, dispatch}}>
      <Col>
        <Nav />
        <BelowNav>
          <Sidebar markdown={markdown} />
          <RightPanel span={GRID_LAYOUT[1]}>
            <Protocol />
          </RightPanel>
        </BelowNav>
        <Footer />
      </Col>
    </GlobalContext.Provider>
  );
};

const BelowNav = styled(Row)`
  margin-top: ${HEADER_HEIGHT}px;
  position: fixed;
  width: 100vw;
`;

const RightPanel = styled(Col)`
  overflow: scroll;
  height: calc(100vh - 170px);
  padding: 120px 60px 20px 60px;
`;

export default Layout;
