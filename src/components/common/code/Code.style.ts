import styled from "styled-components";
import { fadeInShortEaseout } from "../../modal/overlay/Overlay.style";

export const CodeLayout = styled.pre`
  position: fixed;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 600px;
  padding: 40px;
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 12px;
  box-shadow: ${({ theme }) => theme.palette.gray_light} 0 0 6px 2px;
  ${fadeInShortEaseout}
`;

export const CodeBlock = styled.code`
  font-size: 0.75rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: "Courier New", monospace;
  line-height: 1.4;
`;
