import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { NextUIProvider } from "@nextui-org/system";
import "./index.css";

// Provider
import ReposProvider from "./api/context/ReposProvider.tsx";
import SearchProvider from "./api/context/SearchProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NextUIProvider>
    <SearchProvider>
      <ReposProvider>
        <App />+{" "}
      </ReposProvider>
    </SearchProvider>
  </NextUIProvider>
);
