import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';

export const LogoContainer = styled(FontAwesomeIcon)<{ hover: string }>`
  transition: color 0.3s ease-in-out;
  color: ${({ theme }) => theme.colors.gray};

  &:hover {
    color: ${({ hover }) => hover};
  }
`;
