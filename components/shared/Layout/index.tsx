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
      type: 'SetChainId',
      currentChainId: chain.id,
    });
  }, [chain]);

  useEffect(() => {
    setStorageState(state);
  }, [state, dispatch]);

  if (!state.currentChainId) {
    return <div> Loading </div>;
  }

  return (
    <GlobalContext.Provider value={{state, dispatch}}>
      <Col>
        <Nav />
        <BelowNav>
          <Sidebar markdown={markdown} />
          <Col span={GRID_LAYOUT[1]} style={{padding: '120px 60px 60px 60px'}}>
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
`;

export default Layout;
