import React from 'react';
import ReactMarkdown from 'react-markdown';
import {dracula} from 'react-syntax-highlighter/dist/cjs/styles/prism';
import gfm from 'remark-gfm';
import {Typography, Divider, Tag} from 'antd';
import {FileOutlined, LinkOutlined} from '@ant-design/icons';

import {extractStringFromTree, stringToCssId} from './utils/string-utils';
import {GitbookHintType, gitbookHintTypeToAntd} from './utils/markdown-utils';
import VideoPlayer from './VideoPlayer';
import CodeBlock from './CodeBlock';

import {
  StyledListItem,
  StyledAlert,
  StyledImage,
  StyledH1,
  StyledH2,
  StyledH3,
  LinkIcon,
  StyledLink,
} from './Markdown.styles';

const {Text, Paragraph} = Typography;

const Markdown = ({
  children,
  captureMessage,
}: {
  children: string;
  captureMessage(str: string, children: any): void;
}): JSX.Element => {
  return (
    <ReactMarkdown
      plugins={[gfm]}
      rawSourcePos={true}
      children={children}
      components={{
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <CodeBlock
              language={match[1]}
              codeStr={String(children).replace(/\n$/, '')}
            />
          ) : (
            <Text code>{children}</Text>
          );
        },
        hr: ({...props}) => {
          const {sourcePosition} = props;
          if (sourcePosition.start.line !== 1) {
            return <Divider />;
          } else {
            return null;
          }
        },
        a: ({...props}) => {
          return <StyledLink {...props} target="_blank" rel="noreferrer" />;
        },
        p: ({node, ...props}) => {
          const {children} = props;

          const text = extractStringFromTree(props);

          if (typeof text === 'string') {
            if (text.includes('{% hint')) {
              const styleMatches = text.match(/{%\s*hint\s*style="(\w+)"\s*%}/);
              const textMatches = text.match(
                /{%\s*hint\s*style="\w+"\s*%}\s*(.*)/,
              );

              const style = styleMatches[1]
                ? gitbookHintTypeToAntd(styleMatches[1] as GitbookHintType)
                : 'info';

              if (textMatches) {
                const lastChild = children[children.length - 1] as string;

                if (children.length > 1 && typeof lastChild === 'string') {
                  children[children.length - 1] = lastChild.replace(
                    /{%\s*endhint\s*%}/g,
                    '',
                  );
                }

                children[0] = textMatches[1] as string;

                return (
                  <StyledAlert
                    message={<Text>{children}</Text>}
                    type={style}
                    showIcon
                  />
                );
              } else {
                if (captureMessage) {
                  captureMessage('Could not parse markdown hint', children);
                } else {
                  return null;
                }
              }
            } else if (text.includes('{% embed')) {
              const linkComponent = children[1] as JSX.Element;
              const captionString = children[2] as string;
              const captionMatches = captionString.match(/.*caption="(.*?)"/);

              let caption = null;
              if (captionMatches) {
                caption = `Video: ${captionMatches[1]}`;
              }

              return (
                <VideoPlayer url={linkComponent.props.href} caption={caption} />
              );
            } else if (text.includes('{% code')) {
              const matches = text.match(/{%\s*code\s*title="([\w/.]+)"\s*%}/);
              if (matches?.length > 1) {
                return <Tag icon={<FileOutlined />}>{matches[1]}</Tag>;
              }

              return null;
            } else if (text.includes('{% endcode')) {
              return null;
            }
          }

          return <Paragraph>{children}</Paragraph>;
        },
        blockquote: ({...props}) => {
          return <StyledAlert message={props.children} type="info" showIcon />;
        },
        h1: ({...props}) => {
          const text = extractStringFromTree(props);

          if (text) {
            const id = stringToCssId(text);

            return (
              <StyledH1 id={id}>
                {text}
                <a href={`#${id}`}>
                  <LinkIcon>
                    <LinkOutlined size={16} />
                  </LinkIcon>
                </a>
              </StyledH1>
            );
          }

          return null;
        },
        h2: ({...props}) => {
          const {sourcePosition} = props;
          const text = extractStringFromTree(props);

          if (text) {
            const id = stringToCssId(text);

            if (
              sourcePosition.start.line === 2 &&
              text.includes('description:')
            ) {
              return null;
            } else {
              return (
                <StyledH2 uppercase id={id}>
                  {text}
                  <a href={`#${id}`}>
                    <LinkIcon>
                      <LinkOutlined size={16} />
                    </LinkIcon>
                  </a>
                </StyledH2>
              );
            }
          }

          return null;
        },
        h3: ({...props}) => {
          const text = extractStringFromTree(props);

          if (text) {
            const id = stringToCssId(text);

            return (
              <StyledH3 id={id}>
                {text}
                <a href={`#${id}`}>
                  <LinkIcon>
                    <LinkOutlined size={16} />
                  </LinkIcon>
                </a>
              </StyledH3>
            );
          }

          return null;
        },
        li: ({...props}) => {
          const {children} = props;
          return <StyledListItem>{children}</StyledListItem>;
        },
        img: ({...props}) => {
          const src = props.src as string;
          const isRelativeGitbookUrl =
            src.includes('.gitbook') &&
            !src.includes('http') &&
            !src.includes('https');

          if (isRelativeGitbookUrl) {
            const prefix =
              'https://raw.githubusercontent.com/figment-networks/datahub-learn/master/';
            const absoluteSrc = `${prefix}${src.replace(/\.{1,2}\//g, '')}`;
            return <StyledImage src={absoluteSrc} />;
          } else {
            return <StyledImage src={src} />;
          }
        },
      }}
    />
  );
};

export default Markdown;
