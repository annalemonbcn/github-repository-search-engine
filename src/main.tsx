import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { NextUIProvider } from "@nextui-org/system";
import "./index.css";

// Provider
import ReposProvider from "./api/context/ReposProvider.tsx";
import SearchProvider from "./api/context/SearchProvider.tsx";
import UserProvider from "./api/context/UserProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NextUIProvider>
    <SearchProvider>
      <ReposProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ReposProvider>
    </SearchProvider>
  </NextUIProvider>
);
