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

export const OverlayLayout = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  ${fadeInShortEaseout}
`;

export const ModalFormLayout = styled.main`
  padding: 28px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.white};
  border-radius: 12px;
`;
