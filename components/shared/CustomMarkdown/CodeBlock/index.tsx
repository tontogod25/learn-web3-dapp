import React, {useState} from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {dracula} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import styled from 'styled-components';

const CodeBlock = ({
  codeStr,
  language,
  isSolution,
}: {
  codeStr: any;
  language: any;
  isSolution: boolean;
}) => {
  const [showCode, setShowCode] = useState<boolean>(!isSolution);

  return (
    <RevealWrapper>
      {!showCode && (
        <Reveal onClick={() => setShowCode(true)}>Show Solution</Reveal>
      )}
      <CodeBlockWrapper showCode={showCode}>
        {!showCode && <Overlay />}
        <SyntaxHighlighter
          language={language}
          PreTag="div"
          customStyle={{margin: '0.5em 0'}}
          style={dracula}
        >
          {codeStr}
        </SyntaxHighlighter>
      </CodeBlockWrapper>
    </RevealWrapper>
  );
};

const CodeBlockWrapper = styled.div<{showCode: boolean}>`
  position: relative;
  filter: ${({showCode}) => (showCode ? 'blur(0)' : 'blur(6px)')};
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const RevealWrapper = styled.div`
  position: relative;
`;

const Reveal = styled.div`
  position: absolute;
  color: white;
  z-index: 100;
  display: flex;

  /* button */
  border: solid 1px white;
  padding: 4px 10px;
  cursor: pointer;
  border-radius: 3px;
  &:hover {
    background: #555;
  }

  /* center */
  margin-left: auto;
  margin-right: auto;
  margin-top: 30px;
  left: 0;
  right: 0;
  width: 130px;
`;

export default CodeBlock;
