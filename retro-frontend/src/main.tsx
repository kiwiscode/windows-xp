import { createRoot } from "react-dom/client";
import "./index.css";
// import "xp.css/dist/XP.css";
import App from "./App.tsx";
import { AppProvider } from "./context/AppContext.tsx";

createRoot(document.getElementById("root")!).render(
  <AppProvider>
    <App />
  </AppProvider>
);
