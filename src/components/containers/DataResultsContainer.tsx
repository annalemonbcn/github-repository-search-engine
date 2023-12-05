// Hooks
import { useState, useEffect, useMemo, useContext, useCallback } from "react";

// Types
import { Repo, User } from "../../types";

// Utils
import fetchUserAndRepos from "../../api/services/fetchData";
import { updateReposContext } from "../utils/func/reposUtils";

// Components
import DataResultsView from "../views/DataResultsView";

// Context
import { SearchContext } from "../../api/context/SearchProvider";
import { ReposContext } from "../../api/context/ReposProvider";

// Toast
import { toast } from "sonner";
import { UserContext } from "../../api/context/UserProvider";


const DataResultsContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<boolean>();

  // Contexts
  const { query } = useContext(SearchContext)!;
  const { setUser, resetUserContext } = useContext(UserContext)!
  const {
    repositories,
    setRepositories,
    filterByName,
    filterByLanguage,
    sortByName,
    setHasNextPage,
    setNextCursor,
    setLanguagesList,
    resetReposContext,
  } = useContext(ReposContext)!;

  /**
   * Aux method for fetching the user repos
   * If !data --> resetReposContext and showError
   * If data --> set data into reposContext states
   */
  const fetchData = useCallback(async () => {
    if (!query) return;

    // Reset local state
    setIsLoading(true);
    setIsError(false);
    
    // Reset reposContext
    resetReposContext();
    
    try {
      const data: User | null = await fetchUserAndRepos(query);

      // If user doesn't exist --> reset contexts
      if (!data) {
        resetReposContext();
        resetUserContext();

        toast.error("User doesn't exist!");
      }
      // If data
      else {
        // Update reposContext
        updateReposContext(
          data.repositories.nodes,
          false,
          setRepositories,
          data.repositories.pageInfo.hasNextPage,
          setHasNextPage,
          data.repositories.pageInfo.endCursor,
          setNextCursor,
          setLanguagesList
        );
        // Update userContext
        setUser(data)
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error when making the request :(");
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [query]);

  /**
   * useEffect for fetching data everytime the searchContext.query changes
   */
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Set data
  const localRepos: Repo[] | null | undefined = repositories;
  
  /**
   * Filters the repositories by name or languageg
   * useMemo -> to  prevent the overcalculating of that var
   */
  const filteredRepositories = useMemo(() => {
    if (!localRepos?.length) return [];

    return localRepos.filter((repo) => {
      const nameCondition =
        !filterByName ||
        repo.name.toLowerCase().includes(filterByName.toLowerCase());

      const languageCondition =
        !filterByLanguage ||
        filterByLanguage === "All" ||
        repo.primaryLanguage?.name.includes(filterByLanguage);

      return nameCondition && languageCondition;
    });
  }, [localRepos, filterByName, filterByLanguage]);

  /**
   * Orders the repositories by name or by language
   * useMemo -> to prevent the overcalculating of that var
   */
  const sortedRepositories = useMemo(() => {
    return sortByName
      ? filteredRepositories.toSorted((a, b) => {
          return a.name.localeCompare(b.name);
        })
      : filteredRepositories;
  }, [filteredRepositories, sortByName]);

  
  // Render
  const renderContent = () => {
    // If isLoading or if no query
    if (isLoading || !query) return null;

    // If error
    if (isError)
      return (
        <>
          <p>Oops! Something went wrong :(</p>
          <p>Please try again later</p>
        </>
      );

    // If user doesn't exist
    if (!localRepos)
      return (
        <>
          <p>User doesn't exist!</p>
          <p>Please try again with a valid username</p>
        </>
      );

    // If user doesn't have any public repos
    if (localRepos.length === 0)
      return <p>This user doesn't have any public repositories yet</p>;

    // If user exist && has repos
    if (sortedRepositories)
      return (
        <div className="w-5/6 mx-auto">
          <DataResultsView sortedRepositories={sortedRepositories} />
        </div>
      );

    // Else
    return null;
  };

  return <>{renderContent()}</>;
};

export default DataResultsContainer;
