import { ColorMode } from '@chakra-ui/react';
import styled from 'styled-components';

export const Container = styled.article`
  width: 100%;
  height: fit-content;

  margin-bottom: 100px;
`;

export const HeadingH1 = styled.h2`
  font-size: 1.8em;
  font-weight: 800;

  scroll-margin-top: 400px;

  &:not(:first-child) {
    margin: 0.8em 0;
  }
`;

export const HeadingH2 = styled.h3`
  font-size: 1.4em;
  font-weight: 700;
  margin: 0.8em 0;

  scroll-margin-top: 400px;
`;

export const HeadingH3 = styled.h4`
  font-size: 1em;
  font-weight: 600;
  margin: 0.8em 0;

  scroll-margin-top: 400px;
`;

export const Bold = styled.strong`
  font-weight: 800;
`;

export const BlockQuote = styled.blockquote`
  border: solid ${props => props.theme.colors.lightGray};
  border-width: 0 0 0 0.25rem;

  line-height: 1.71429;
  margin: 1.33333em 0;
  padding-left: 1.11111em;
  font-style: italic;
`;

export const CodeInline = styled.code`
  background-color: rgba(135, 131, 120, 0.15);
  padding: 0.1rem 0.2rem;
  border-radius: 0.2rem;

  color: #eb5757;
  font-weight: 600;
`;

export const Pre = styled.pre`
  background-color: #f7f6f3;

  margin: 1.14286em 0;
  padding: 1.14286em;
  border-radius: 0.28571em;

  overflow: auto;
  font-size: 0.85714em;
`;

export const CustomImageWrapper = styled.span`
  position: relative;

  display: flex;
  justify-content: center;

  width: 100%;

  & .autoImage {
    object-fit: contain !important;
    position: relative !important;
    height: auto !important;
  }

  margin: 1rem 0;
`;

export const Paragraph = styled.p`
  font-size: 0.875rem;
  letter-spacing: -0.02em;
  line-height: 1.71429;
  margin: 1.14286em 0;
`;

export const UnorderedList = styled.ul`
  margin-left: 1rem;
  list-style: disc;
  font-size: 0.875rem;

  li {
    margin: 1rem 0;
  }

  li ul {
    list-style: circle;
  }

  li ul li ul {
    list-style: square;
  }
`;

export const OrderedList = styled.ol`
  margin-left: 1rem;
  list-style: decimal;
  font-size: 0.875rem;

  li {
    margin: 1rem 0;
  }

  li ul {
    list-style: lower-alpha;
  }

  li ul li ul {
    list-style: lower-roman;
  }
`;

export const Anchor = styled.a<{ currentTheme: ColorMode }>`
  color: ${({ theme, currentTheme }) =>
    currentTheme === 'light' ? theme.colors.gray : theme.colors.lightGray};

  text-decoration: underline;
`;
