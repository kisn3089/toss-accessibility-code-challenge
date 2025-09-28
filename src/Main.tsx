import "modern-normalize";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { Overlay } from "./components/modal/overlay/Overlay";
import { ModalFormPage } from "./pages/modalFormPage/ModalFormPage";
import { ModalProvider } from "./components/modal/provider/ModalProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <ModalProvider>
        <ModalFormPage />
        <Overlay />
      </ModalProvider>
    </ThemeProvider>
  </StrictMode>
);
