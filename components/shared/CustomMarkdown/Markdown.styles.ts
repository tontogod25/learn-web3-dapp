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
  margin: 30px 0;
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
  font-size: 30px;

  ${headingWithLinkMixin}
`;

export const StyledH2 = styled.h2`
  margin-top: 1em;
  margin-bottom: 1em;
  font-size: 24px;

  ${headingWithLinkMixin}
`;

export const StyledH3 = styled.h3`
  margin-top: 0.75em;
  margin-bottom: 0.75em;
  font-size: 17px;

  ${headingWithLinkMixin}
`;

export const StyledImage = styled.img`
  width: 100%;
  height: auto;
  margin: 30px 0;
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
