import styled from 'styled-components';

export const Container = styled.header`
  width: 100%;

  padding-top: 1.875rem;
`;

export const Header = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 1.8em !important;
  font-weight: 800;

  margin-bottom: 1.5em;
`;

export const Nav = styled.nav`
  width: 100%;

  display: flex;
  align-items: center;
  flex-direction: row-reverse;

  padding-bottom: 2rem;

  ul {
    display: flex;
  }

  @media (max-width: 600px) {
    align-items: center;
    justify-content: center;
  }
`;

interface NavLinkProps {
  isActive: boolean;
}

export const Anchor = styled.a<NavLinkProps>`
  text-decoration: ${({ isActive }) =>
    isActive ? 'none' : 'underline'} !important;
  margin-left: 1em;

  color: ${({ theme, isActive }) =>
    isActive ? theme.colors.dark : theme.colors.gray};
  font-size: 1em !important;
  font-weight: ${({ isActive }) => (isActive ? '800' : '400')};
`;
