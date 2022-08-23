import React from 'react';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import {Typography, Divider, Tag} from 'antd';
import {FileOutlined, LinkOutlined} from '@ant-design/icons';
import {SRLWrapper} from 'simple-react-lightbox';

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
  TextCode,
} from './Markdown.styles';

const lightboxOptions = {
  buttons: {
    showAutoplayButton: false,
    showCloseButton: true,
    showDownloadButton: true,
    showFullscreenButton: true,
    showNextButton: false,
    showPrevButton: false,
    showThumbnailsButton: false,
  },
  thumbnails: {
    showThumbnails: false,
  },
};

const {Text, Paragraph} = Typography;

const SHOW_LINK_ICON = false;

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
          const isSolution = String(children).indexOf('// solution') > -1;
          const codeStr = String(children)
            .replace('// solution\n', '')
            .replace(/\n$/, '');

          return !inline && match ? (
            <CodeBlock
              language={match[1]}
              isSolution={isSolution}
              codeStr={codeStr}
            />
          ) : (
            <TextCode>{children}</TextCode>
          );
        },
        hr: ({...props}) => {
          const {sourcePosition} = props;
          if (sourcePosition?.start.line !== 1) {
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

                const firstNode = textMatches[1] as string;
                const renderedChildren = children.map((child, index) => {
                  if (index === 0) {
                    return firstNode;
                  } else {
                    return child;
                  }
                });
                return (
                  <StyledAlert
                    message={<Text>{renderedChildren}</Text>}
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
                {SHOW_LINK_ICON && (
                  <a href={`#${id}`}>
                    <LinkIcon>
                      <LinkOutlined size={16} />
                    </LinkIcon>
                  </a>
                )}
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
              sourcePosition?.start.line === 2 &&
              text.includes('description:')
            ) {
              return null;
            } else {
              return (
                <StyledH2 id={id}>
                  {text}
                  {SHOW_LINK_ICON && (
                    <a href={`#${id}`}>
                      <LinkIcon>
                        <LinkOutlined size={16} />
                      </LinkIcon>
                    </a>
                  )}
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
                {SHOW_LINK_ICON && (
                  <a href={`#${id}`}>
                    <LinkIcon>
                      <LinkOutlined size={16} />
                    </LinkIcon>
                  </a>
                )}
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
          const alt = props.alt as string;
          const isRelativeGitbookUrl =
            src.includes('.gitbook') &&
            !src.includes('http') &&
            !src.includes('https');

          if (isRelativeGitbookUrl) {
            const prefix =
              'https://raw.githubusercontent.com/figment-networks/learn-tutorials/master/';
            const absoluteSrc = `${prefix}${src.replace(/\.{1,2}\//g, '')}`;

            return (
              <SRLWrapper options={lightboxOptions}>
                <a href={absoluteSrc}>
                  <StyledImage
                    src={absoluteSrc}
                    alt={alt}
                    srl_gallery_image="true"
                  />
                </a>
              </SRLWrapper>
            );
          } else {
            return (
              <SRLWrapper options={lightboxOptions}>
                <a href={src}>
                  <StyledImage src={src} srl_gallery_image="true" alt={alt} />
                </a>
              </SRLWrapper>
            );
          }
        },
      }}
    />
  );
};

export default Markdown;
