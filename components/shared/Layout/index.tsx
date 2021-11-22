import {GlobalContext, globalStateReducer, initialGlobalState} from 'context';
import {ChainType, MarkdownForChainIdT, LocalStorageStateT} from 'types';
import {FOOTER_HEIGHT, GRID_LAYOUT, HEADER_HEIGHT} from 'lib/constants';
import React, {useEffect, useReducer} from 'react';
import styled from 'styled-components';
import {useLocalStorage} from 'hooks';
import Sidebar from './Sidebar';
import {Row, Col} from 'antd';
import Footer from './Footer';
import Nav from './Nav';
import {
  prepareGlobalState,
  prepareGlobalStateForStorage,
  isOneColumnStep,
  getChainId,
} from 'utils/context';
import {Spinner} from './Spinner';
import {colors} from 'utils/colors';
import Head from 'components/shared/Layout/Head';
import {ReactElement} from 'react';

type LayoutPropT = {
  children: ReactElement;
  chain: ChainType;
  markdown: MarkdownForChainIdT;
};

const Layout = ({children, chain, markdown}: LayoutPropT) => {
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

  if (!state.currentChainId) {
    return <Spinner color={colors.figmentYellow} />;
  }

  const isStepOneColumn = isOneColumnStep(state);
  const currentStepId = getChainId(state);

  return (
    <GlobalContext.Provider value={{state, dispatch}}>
      <Head label={chain.label} />
      <Col>
        <Nav />
        <BelowNav>
          <LeftPanel
            span={isStepOneColumn ? 24 : GRID_LAYOUT[0]}
            key={currentStepId}
          >
            <Sidebar markdown={markdown} />
          </LeftPanel>
          {!isStepOneColumn && (
            <RightPanel span={GRID_LAYOUT[1]}>{children}</RightPanel>
          )}
        </BelowNav>
        <Footer />
      </Col>
    </GlobalContext.Provider>
  );
};

const heightOffset = `${FOOTER_HEIGHT + HEADER_HEIGHT}px`;

const BelowNav = styled(Row)`
  margin-top: ${HEADER_HEIGHT}px;
  position: fixed;
  width: 100vw;
`;

const LeftPanel = styled(Col)`
  position: relative;
  padding: 40px;
  background: #f5f5f5;
  overflow: scroll;
  height: calc(100vh - ${heightOffset});
`;

const RightPanel = styled(Col)`
  overflow: scroll;
  height: calc(100vh - 170px);
  padding: 120px 60px 20px 60px;
`;

export default Layout;
