
import React, { createContext, useState, ReactNode } from "react";

interface SearchContextProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  resetQuery: () => void
}

// Create context
export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined
);

interface SearchProviderProps {
  children: ReactNode;
}

const SearchProvider = (props: SearchProviderProps) => {
  // State
  const [query, setQuery] = useState<string>("");

  const resetQuery = (): void => {
    setQuery("");
  }

  // Provider value
  const searchContextValue: SearchContextProps = {
    query,
    setQuery,
    resetQuery
  };

  return (
    <SearchContext.Provider value={searchContextValue}>
      {props.children}
    </SearchContext.Provider>
  )
}

export default SearchProvider
