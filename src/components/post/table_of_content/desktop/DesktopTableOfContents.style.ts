import styled from 'styled-components';
import { ColorMode } from '@chakra-ui/react';

export const Container = styled.div`
  position: fixed;
  top: 10%;
  left: 75%;
`;

export const Wrapper = styled.nav`
  position: sticky;
  position: -webkit-sticky;

  top: 24px;
  max-height: calc(100vh - 40px);
  overflow: auto;
`;

export const HeadingContainer = styled.ul<{ currentTheme: ColorMode }>`
  margin-left: 1rem;
  list-style: disc;
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.lightGray};

  li {
    margin: 0.5rem 0;
  }

  li.active {
    color: ${({ theme, currentTheme }) =>
      currentTheme === 'light' ? theme.colors.dark : theme.colors.white};
  }

  li ul {
    list-style: circle;
  }

  li ul li ul {
    list-style: square;
  }
`;
