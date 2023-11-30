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

const DataResultsContainer = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState<boolean>();

  // Contexts
  const searchContext = useContext(SearchContext);
  const reposContext = useContext(ReposContext);

  const query = searchContext?.query;

  const {
    repositories,
    setRepositories,
    filterByName,
    filterByLanguage,
    sortByName,
    setHasNextPage,
    setNextCursor,
    setLanguagesList,
  } = reposContext || {};


  /**
   * Aux method for fetching the data
   * Set data into context
   */
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setIsError(false);
    if (query) {
      try {
        const data: FetchReposResult = await fetchRepos(query);
        console.log('data', data)
        // Update reposContext
        if (setRepositories && setHasNextPage && setNextCursor && setLanguagesList)
          updateReposContext(
            data,
            false,
            setRepositories,
            setHasNextPage,
            setNextCursor,
            setLanguagesList
          );
      } catch (error) {
        console.error("Error:", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }
  }, [query]);

  /**
   * useEffect for fetching data everytime the searchContext.query changes
   */
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Local data
  const localRepos: Repo[] | undefined = repositories;

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
    if (!filteredRepositories.length || !sortByName) {
      return filteredRepositories;
    }
    return filteredRepositories.sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredRepositories, sortByName]);

  // Render
  const renderContent = () => {
    if (isLoading || !query) return null;

    if (isError) return <p>Oops! Something went wrong</p>;

    if (!localRepos?.length)
      return <p>This user doesn't have any public repositories yet</p>;

    if (sortedRepositories.length)
      return (
        <div className="w-5/6 mx-auto">
          <DataResultsView sortedRepositories={sortedRepositories} />
        </div>
      );

    return null;
  };

  return <>{renderContent()}</>;
};

export default DataResultsContainer;
