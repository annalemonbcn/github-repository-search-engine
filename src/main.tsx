import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/system";

// Tanstack
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NextUIProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </NextUIProvider>
);
