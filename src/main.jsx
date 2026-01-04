import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HeroUIProvider } from "@heroui/react";
import { ToastContainer, toast } from 'react-toastify';
import "./index.css";
import App from "./App.jsx";
import HomeContextProvider from "./context/HomeContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HomeContextProvider>
      <HeroUIProvider>
        <App />
        <ToastContainer />
      </HeroUIProvider>
    </HomeContextProvider>
  </StrictMode>
);
