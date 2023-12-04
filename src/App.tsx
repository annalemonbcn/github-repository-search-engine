import React, { useEffect } from "react";

// Func
import { handleSlashKeyPress } from "./components/utils/func/handleKeyPress";

// Components
import Header from "./components/Header";
import DataResultsContainer from "./components/containers/DataResultsContainer";
import SearchContainer from "./components/containers/SearchContainer";
import Footer from "./components/Footer";
import { Toaster } from "sonner";

function App() {
  useEffect(() => {
    window.addEventListener("keydown", handleSlashKeyPress);
    return () => {
      window.removeEventListener("keydown", handleSlashKeyPress);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-center text-custom-black App">
      <div className="flex-grow">
        <Header />
        <Toaster position="top-right" richColors />
        <SearchContainer />
        <DataResultsContainer />
      </div>
      <Footer />
    </div>
  );
}

export default App;
