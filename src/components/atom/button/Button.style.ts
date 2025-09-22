import { styled } from "styled-components";
import type { ColorProperties } from "./Button.type";

export const ButtonAtom = styled.button<{ $colorProperties: ColorProperties }>`
  min-width: fit-content;
  height: 36px;
  padding: 8px 16px;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ $colorProperties }) =>
    $colorProperties.backgroundColor};
  color: ${({ $colorProperties }) => $colorProperties.color};

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.palette.gray_light};
    cursor: not-allowed;
  }

  &:focus {
    border: none;
    outline: 1px solid ${({ theme }) => theme.palette.red};
  }
`;
