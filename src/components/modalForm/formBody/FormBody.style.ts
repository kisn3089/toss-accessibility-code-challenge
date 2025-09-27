import styled from "styled-components";

export const FormLayout = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const Legend = styled.legend`
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
`;

export const Fieldset = styled.fieldset`
  border: none;
  margin: 0;
  padding: 0;
  min-width: 0;
`;
