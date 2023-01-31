import { createGlobalStyle } from 'styled-components';
import { reset } from 'styled-reset';

export const GlobalStyle = createGlobalStyle`
  ${reset}

  a {
    color: #fff; 
    text-decoration: none; 
    outline: none
  }

  a:hover, a:active {
    text-decoration: none; 
  }

  scroll-margin-top: 1000px;
`;
