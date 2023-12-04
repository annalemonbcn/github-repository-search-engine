import React, { useEffect } from "react";

// Func
import { handleKeyPress } from "./components/utils/func/handleKeyPress";

// Components
import Header from "./components/Header";
import DataResultsContainer from "./components/containers/DataResultsContainer";
import SearchContainer from "./components/containers/SearchContainer";
import Footer from "./components/Footer";

function App() {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-center text-custom-black App">
      <div className="flex-grow">
        <Header />
        <SearchContainer />
        <DataResultsContainer />
      </div>
      <Footer />
    </div>
  );
}

export default App;
