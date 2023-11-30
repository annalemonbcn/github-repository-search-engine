import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { NextUIProvider } from "@nextui-org/system";
import "./index.css";

// Provider
import ReposProvider from "./api/context/ReposProvider.tsx";
import SearchProvider from "./api/context/SearchProvider.tsx";

// Tanstack
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <NextUIProvider>
    <SearchProvider>
      <ReposProvider>
        {/*  TODO: delete */}
        <QueryClientProvider client={queryClient}> 
          <App />
        </QueryClientProvider>
      </ReposProvider>
    </SearchProvider>
  </NextUIProvider>
);
