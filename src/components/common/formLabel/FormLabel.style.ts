import { css, styled } from "styled-components";

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const RowGap = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0 4px;
`;

export const Label = styled.label`
  width: fit-content;
  font-size: 0.875rem;
  font-weight: 600;
`;

export const Optional = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.palette.gray_deep};
`;

// 공통 스타일 base
const baseInputStyles = css`
  width: 100%;
  height: 36px;
  border: 1px solid ${({ theme }) => theme.palette.gray_light};
  border-radius: 6px;
  padding: 4px 8px;

  &:focus {
    border: 1px solid ${({ theme }) => theme.palette.blue};
  }
`;

export const Input = styled.input`
  ${baseInputStyles}
`;

export const Select = styled.select`
  ${baseInputStyles}
`;
