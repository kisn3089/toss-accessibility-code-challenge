import { css, styled } from "styled-components";

export const fadeInShortEaseout = css`
  animation: ${({ theme }) => theme.animations.fadeIn} 0.2s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const slideInShortEaseout = css`
  animation: ${({ theme }) => theme.animations.slideIn} 0.2s ease-out;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

export const OverlayLayout = styled.div<{ $isLastIndex: boolean }>`
  width: 100%;
  height: 100%;
  position: fixed;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  background-color: ${({ $isLastIndex }) =>
    $isLastIndex && "rgba(0, 0, 0, 0.5)"};
  display: flex;
  z-index: 1000;
`;

export const ModalFormLayout = styled.dialog`
  box-shadow: ${({ theme }) => theme.palette.gray_light} 0 0 6px 2px;
  padding: 18px;
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 12px;
  ${slideInShortEaseout}
`;
