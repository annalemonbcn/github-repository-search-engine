import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { NextUIProvider } from "@nextui-org/system";
import "./index.css";

// Providers
import ReposProvider from "./api/context/ReposProvider.tsx";
import SearchProvider from "./api/context/SearchProvider.tsx";
import UserProvider from "./api/context/UserProvider.tsx";

const providers = [
  NextUIProvider,
  SearchProvider,
  ReposProvider,
  UserProvider,
];

const rootComponent = providers.reduceRight(
  (children, Provider) => <Provider>{children}</Provider>,
  <App />
);

ReactDOM.createRoot(document.getElementById("root")!).render(rootComponent);