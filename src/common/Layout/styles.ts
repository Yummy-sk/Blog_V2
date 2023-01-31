import styled from 'styled-components';

export const Container = styled.main`
  position: relative;
  width: 100vw;
  min-height: 100vh;

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wrapper = styled.div`
  width: 676px;
  height: 100%;
  min-height: 100vh;

  padding: 0 1rem;
  background-color: inherit;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 676px) {
    width: 100%;
  }
`;
