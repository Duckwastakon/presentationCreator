import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { VariableContainer } from "./presentationVariables.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <VariableContainer>
      <App/>
    </VariableContainer>
  </StrictMode>,
);
