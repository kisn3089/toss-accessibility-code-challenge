import { styled } from "styled-components";

export const FormSection = styled.section`
  min-width: 400px;
  display: flex;
  flex-direction: column;
`;
export const FormHeader = styled.header``;

export const FormTitle = styled.h1`
  font-size: 1.5rem;
  margin: 0px;
`;

export const FormAnnounce = styled.p`
  color: ${({ theme }) => theme.palette.gray_deep};
  font-size: 0.875rem;
  font-weight: 600;
`;
