import { styled } from "styled-components";

export const FormSection = styled.section<{ $maxHeight?: number }>`
  min-width: 400px;
  max-height: ${({ $maxHeight }) => `${$maxHeight}px`};
  display: flex;
  flex-direction: column;
  overflow: scroll;
  padding: 10px;
`;
export const FormHeader = styled.header``;

export const FormTitle = styled.h1`
  width: fit-content;
  font-size: 1.5rem;
  margin: 0px;
`;

export const FormAnnounce = styled.p`
  color: ${({ theme }) => theme.palette.gray_deep};
  font-size: 0.875rem;
  font-weight: 600;
`;
