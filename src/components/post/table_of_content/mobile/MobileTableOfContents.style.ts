import styled from 'styled-components';
import { ColorMode } from '@chakra-ui/react';

export const Container = styled.div`
  width: 100%;

  margin: 1.25rem 0;
`;

export const HeadingContainer = styled.ul<{ currentTheme: ColorMode }>`
  margin-left: 1rem;
  list-style: disc;
  font-size: 0.7rem;
  color: ${({ theme, currentTheme }) =>
    currentTheme === 'light' ? theme.colors.dark : theme.colors.white};

  li {
    margin: 0.5rem 0;
  }

  li ul {
    list-style: circle;
  }

  li ul li ul {
    list-style: square;
  }
`;
