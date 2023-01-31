import { ColorMode } from '@chakra-ui/react';
import styled from 'styled-components';

type Theme = { currentTheme: ColorMode };

export const Container = styled.div`
  width: 100%;
`;

export const Form = styled.form<{ currentTheme: ColorMode }>`
  display: flex;

  input {
    margin-right: 1rem;
  }

  button {
    border: 1px solid
      ${({ theme, currentTheme }) =>
        currentTheme === 'light' ? theme.colors.dark : theme.colors.white};

    font-weight: 400;
  }
`;

export const Row = styled.div`
  width: 100%;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;

  margin-bottom: 1rem;
`;

export const Button = styled.button<Theme>`
  text-decoration: underline;

  font-size: 1rem;
  color: ${({ theme, currentTheme }) =>
    currentTheme === 'light' ? theme.colors.gray : theme.colors.lightGray};

  &:hover {
    color: ${({ theme, currentTheme }) =>
      currentTheme === 'light' ? theme.colors.lightGray : theme.colors.gray};
  }
`;
