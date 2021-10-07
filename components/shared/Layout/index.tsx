import {GlobalContext, globalStateReducer, initialGlobalState} from 'context';
import {ChainType, MarkdownForChainIdT, GlobalStateT} from 'types';
import {GRID_LAYOUT, HEADER_HEIGHT} from 'lib/constants';
import React, {useEffect, useReducer} from 'react';
import styled from 'styled-components';
import {useLocalStorage} from 'hooks';
import Sidebar from './Sidebar';
import {Row, Col} from 'antd';
import Footer from './Footer';
import Nav from './Nav';

const Layout = (
  Protocol: React.FC,
  chain: ChainType,
  markdown: MarkdownForChainIdT,
) => {
  const [storageState, setStorageState] = useLocalStorage<GlobalStateT>(
    'figment',
    initialGlobalState,
  );
  const [state, dispatch] = useReducer(globalStateReducer, storageState);

  useEffect(() => {
    dispatch({
      type: 'SetCurrentChainId',
      currentChainId: chain.id,
    });
  }, []);

  useEffect(() => {
    setStorageState(state);
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
          <Col span={GRID_LAYOUT[1]} style={{padding: '120px 60px 20px 60px'}}>
            <Protocol />
          </Col>
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

export default Layout;
