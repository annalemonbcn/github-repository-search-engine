// Hooks
import {
  ReactNode,
  createContext,
  useEffect,
  useState,
} from "react";

// Types
import { Repo } from "../../types";


interface ReposContextProps {
  repositories: Repo[];
  setRepositories: React.Dispatch<React.SetStateAction<Repo[]>>;
  languagesList: string[]
  setLanguagesList: React.Dispatch<React.SetStateAction<string[]>>
  hasNextPage: boolean;
  setHasNextPage: React.Dispatch<React.SetStateAction<boolean>>;
  nextCursor: string | undefined;
  setNextCursor: React.Dispatch<React.SetStateAction<string | undefined>>;
  sortByName: boolean
  toggleSortByName: () => void
  filterByName: string | null
  setFilterByName: React.Dispatch<React.SetStateAction<string | null>>
  filterByLanguage: string | null
  setFilterByLanguage: React.Dispatch<React.SetStateAction<string | null>>
}

// Create context
export const ReposContext = createContext<ReposContextProps | undefined>(
  undefined
);

interface ReposProviderProps {
  children: ReactNode;
}

const ReposProvider = (props: ReposProviderProps) => {

  const [repositories, setRepositories] = useState<Repo[]>([]);
  const [languagesList, setLanguagesList] = useState<string[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [nextCursor, setNextCursor] = useState<string | undefined>();
  const [sortByName, setSortByName] = useState<boolean>(false);
  const [filterByName, setFilterByName] = useState<string | null>(null);
  const [filterByLanguage, setFilterByLanguage] = useState<string | null>(null);

  useEffect(() => {
    console.log('repositories', repositories)
    console.log('languagesList', languagesList)
    console.log('hasNextPage', hasNextPage)
    console.log('nextCursor', nextCursor)
  }, [repositories])

  /**
   * Toggles the sortByName value on state
   */
  const toggleSortByName = () => {
    setSortByName((prevState) => !prevState);
  };

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
    toggleSortByName,
    filterByName,
    setFilterByName,
    filterByLanguage,
    setFilterByLanguage
  };

  return (
    <ReposContext.Provider value={reposContextValue}>
      {props.children}
    </ReposContext.Provider>
  );
};

export default ReposProvider;
