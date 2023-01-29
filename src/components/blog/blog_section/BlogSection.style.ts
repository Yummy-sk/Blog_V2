import { ColorMode } from '@chakra-ui/react';
import styled from 'styled-components';

type Theme = { currentTheme: ColorMode };

export const Container = styled.section`
  width: 100%;

  display: flex;
  flex-direction: column;
`;

export const Head = styled.div<Theme>`
  display: flex;
  flex-direction: column;
  justify-content: center;

  margin: 1.75rem 0 0.8rem 0;

  h2 {
    font-size: 1.28571em;
    font-weight: 600;

    color: ${({ theme, currentTheme }) =>
      currentTheme === 'light' ? theme.colors.dark : theme.colors.white};
    margin-bottom: 0.5rem;
  }

  ul {
    display: flex;

    li {
      margin-right: 0.5rem;
      cursor: pointer;
    }
  }
`;

export const Middle = styled.div<Theme>`
  margin-bottom: 0.4375rem;

  display: flex;
  font-weight: 600;
  p {
    margin-left: 0.25rem;
    transition: color 0.3s ease-in-out;

    color: ${({ theme, currentTheme }) =>
      currentTheme === 'light' ? theme.colors.gray : theme.colors.lightGray};
    text-decoration: underline;
    font-size: 0.875rem;

    &:hover {
      color: ${({ theme, currentTheme }) =>
        currentTheme === 'light' ? theme.colors.lightGray : theme.colors.gray};
    }
  }

  summary {
    list-style: none;
    font-size: 0.875rem;
  }
`;

export const Bottom = styled.div<Theme>`
  font-weight: 400;

  time {
    color: ${({ theme, currentTheme }) =>
      currentTheme === 'light' ? theme.colors.gray : theme.colors.lightGray};
    font-size: 0.875rem;
  }
`;

export const Tag = styled.button<Theme>`
  transition: color 0.3s ease-in-out;
  font-size: 0.875rem;

  color: ${({ theme, currentTheme }) =>
    currentTheme === 'light' ? theme.colors.gray : theme.colors.lightGray};

  &:hover {
    color: ${({ theme, currentTheme }) =>
      currentTheme === 'light' ? theme.colors.lightGray : theme.colors.gray};
  }
`;
