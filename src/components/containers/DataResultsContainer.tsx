// Hooks
import { useState, useEffect, useMemo, useContext, useCallback } from "react";

// Types
import { Repo, FetchReposResult } from "../../types";

// Utils
import fetchRepos from "../../api/services/fetchRepos";
import { updateReposContext } from "../utils/func/reposUtils";

// Components
import DataResultsView from "../views/DataResultsView";

// Context
import { SearchContext } from "../../api/context/SearchProvider";
import { ReposContext } from "../../api/context/ReposProvider";

// Toast
import { toast } from "sonner";

const DataResultsContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<boolean>();

  // Contexts
  const { query } = useContext(SearchContext)!;
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
   * Aux method for fetching the data
   * Set data into context
   */
  const fetchData = useCallback(async () => {
    if (!query) return;

    // Reset local state
    setIsLoading(true);
    setIsError(false);
    
    // Reset reposContext
    resetReposContext();

    try {
      const data: FetchReposResult | null = await fetchRepos(query);
      // If user doesn't exist --> reset reposContext
      if (!data) {
        resetReposContext();

        toast.error("User doesn't exist!");
      }
      // If user exist --> update reposContext
      else {
        updateReposContext(
          data,
          false,
          setRepositories,
          setHasNextPage,
          setNextCursor,
          setLanguagesList
        );
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
  console.log("localRepos -->", localRepos);
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

  console.log("sortedRepositories", sortedRepositories);
  console.log("localRepos", localRepos);

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
