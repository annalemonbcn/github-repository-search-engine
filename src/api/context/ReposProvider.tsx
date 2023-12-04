// Hooks
import { ReactNode, createContext, useState } from "react";

// Types
import { Repo } from "../../types";


/**
 * props for the reposContext
 */
interface ReposContextProps {
  repositories: Repo[] | null;
  setRepositories: React.Dispatch<React.SetStateAction<Repo[] | null>>
  languagesList: string[]
  setLanguagesList: React.Dispatch<React.SetStateAction<string[]>>
  hasNextPage: boolean;
  setHasNextPage: React.Dispatch<React.SetStateAction<boolean>>;
  nextCursor: string | undefined;
  setNextCursor: React.Dispatch<React.SetStateAction<string | undefined>>;
  sortByName: boolean
  setSortByName: React.Dispatch<React.SetStateAction<boolean>>
  filterByName: string | null
  setFilterByName: React.Dispatch<React.SetStateAction<string | null>>
  filterByLanguage: string | null
  setFilterByLanguage: React.Dispatch<React.SetStateAction<string | null>>
  resetReposContext: () => void
}

// Create context
export const ReposContext = createContext<ReposContextProps | undefined>(
  undefined
);

/**
 * prop for the ReposProvider
 */
interface ReposProviderProps {
  children: ReactNode;
}

const ReposProvider = (props: ReposProviderProps) => {

  const [repositories, setRepositories] = useState<Repo[] | null>(null);
  const [languagesList, setLanguagesList] = useState<string[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const [sortByName, setSortByName] = useState<boolean>(false);
  const [filterByName, setFilterByName] = useState<string | null>(null);
  const [filterByLanguage, setFilterByLanguage] = useState<string | null>(null);

  /**
   * Reset all reposContext state
   */
  const resetReposContext = () => {
    setRepositories(null)
    setLanguagesList([])
    setHasNextPage(false)
    setNextCursor(undefined)
    setSortByName(false)
    setFilterByName(null)
    setFilterByLanguage(null)
  }

  // Provider value
  const reposContextValue: ReposContextProps = {
    repositories,
    setRepositories,
    languagesList,
    setLanguagesList,
    hasNextPage,
    setHasNextPage,
    nextCursor,
    setNextCursor,
    sortByName,
    setSortByName,
    filterByName,
    setFilterByName,
    filterByLanguage,
    setFilterByLanguage,
    resetReposContext
  };

  return (
    <ReposContext.Provider value={reposContextValue}>
      {props.children}
    </ReposContext.Provider>
  );
};

export default ReposProvider;
