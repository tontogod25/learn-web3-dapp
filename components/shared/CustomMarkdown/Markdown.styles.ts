import styled, {css} from 'styled-components';
import {Alert, Typography} from 'antd';

const {Text} = Typography;

const headingWithLinkMixin = css`
  margin-left: -20px;
  padding-left: 20px;
  position: relative;

  a {
    visibility: hidden;
  }

  &:hover {
    a {
      visibility: visible;
    }
  }
`;

export const StyledListItem = styled.li`
  padding: 5px 0;
`;

export const StyledAlert = styled(Alert)`
  margin: 1em 0;
  border-radius: 5px;
  align-items: start;

  .ant-typography {
    margin-bottom: 0;
  }

  .ant-alert-icon {
    margin-top: 5px;
    margin-right: 14px;
  }
`;

export const StyledLink = styled.a`
  &&& {
    color: ${({theme}) => theme.colors.yellowDark};

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const StyledH1 = styled.h1`
  margin: 1em 0;

  ${headingWithLinkMixin}
`;

export const StyledH2 = styled.h2`
  margin: 0.75em 0;
  font-size: 24px;

  ${headingWithLinkMixin}
`;

export const StyledH3 = styled.h3`
  margin-top: 0.75em 0;
  font-size: 17px;

  ${headingWithLinkMixin}
`;

export const StyledImage = styled.img`
  max-width: 500px;
  max-height: 600px;
  margin: 30px auto;
  border-radius: 5px;
  box-shadow: rgb(150 150 150) 0 4px 10px;
  display: block;
  margin-top: 60px;
  margin-bottom: 60px;
`;

export const LinkIcon = styled.div`
  position: absolute;
  left: -4px;
  top: 0;

  svg {
    color: #777;
    width: 18px;
  }
`;

export const TextCode = styled(Text)`
  padding: 0.2em 0.4em;
  margin: 0;
  color: #25292e;
  background-color: #dbdbdb;
  font-family: 'Monaco';
  font-size: 85%;
  border-radius: 6px;
`;
