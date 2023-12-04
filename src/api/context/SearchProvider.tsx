
import React, { createContext, useState, ReactNode } from "react";

/**
 * props for the searchContext
 */
interface SearchContextProps {
  query: string | undefined;
  setQuery: React.Dispatch<React.SetStateAction<string | undefined>>;
  resetQuery: () => void
}

// Create context
export const SearchContext = createContext<SearchContextProps | undefined>(
  undefined
);

/**
 * prop for the SearchProvider
 */
interface SearchProviderProps {
  children: ReactNode;
}

const SearchProvider = (props: SearchProviderProps) => {
  // State
  const [query, setQuery] = useState<string | undefined>(undefined);

  /**
   * Reset searchContext state
   */
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
