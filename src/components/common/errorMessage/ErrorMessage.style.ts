import styled from "styled-components";

export const Message = styled.div`
  width: fit-content;
  white-space: pre;
  color: ${({ theme }) => theme.palette.red};
  font-size: 0.75rem;
`;
