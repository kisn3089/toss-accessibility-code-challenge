import { styled } from "styled-components";

export const MaxSize = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  max-width: 400px;
`;

export const Caption = styled.p`
  white-space: pre-line;
  font-size: 0.8rem;
  color: ${({ theme }) => theme.palette.gray_deep};
  line-height: 1.2;
`;

export const ButtonGap = styled.div`
  display: flex;
  gap: 8px;
`;
