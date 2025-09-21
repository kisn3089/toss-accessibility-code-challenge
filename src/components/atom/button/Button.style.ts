import { styled } from "styled-components";

export const ButtonAtom = styled.button`
  min-width: fit-content;
  height: 36px;
  padding: 8px 16px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;
