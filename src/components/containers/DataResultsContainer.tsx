// Hooks
import { useState, useEffect, useMemo, useContext, useCallback } from "react";

// Types
import { Repo } from "../../types";

// Utils
import fetchRepos from "../../api/services/fetchRepos";
import { getLanguagesFromRepositoriesArray } from "../utils/func/utils";

// Components
import DataResultsView from "../views/DataResultsView";

// Context
import { SearchContext } from "../../api/context/SearchProvider";
import { ReposContext } from "../../api/context/ReposProvider";

const DataResultsContainer = () => {
  // Context
  const searchContext = useContext(SearchContext);
  const reposContext = useContext(ReposContext);
  const [isLoading, setIsLoading] = useState(false);
  
  /**
   * Aux method for fetching the data
   * Set data into context
   */
  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      if (searchContext?.query) {
        const data = await fetchRepos(searchContext.query);
        // Handle data
        const { repos, nextCursor, hasNextPage } = data;
        const languages: string[] = [
          "All",
          ...getLanguagesFromRepositoriesArray(repos),
        ];
        // Set data into repos context
        if (reposContext) {
          reposContext.setRepositories(repos);
          reposContext.setHasNextPage(hasNextPage);
          reposContext.setNextCursor(nextCursor);
          reposContext.setLanguagesList(languages);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [searchContext?.query])

  /**
   * useEffect for fetching data everytime the searchContext.query changes
   */
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Local data
  const localRepos: Repo[] | undefined = reposContext?.repositories;

  /**
   * Filters the repositories by name or languageg
   * useMemo -> to  prevent the overcalculating of that var
   */
  const filteredRepositories = useMemo(() => {
    if (!localRepos?.length) return [];

    const { filterByName, filterByLanguage } = reposContext || {};
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
  }, [localRepos, reposContext?.filterByName, reposContext?.filterByLanguage]);

  /**
   * Orders the repositories by name or by language
   * useMemo -> to prevent the overcalculating of that var
   */
  const sortedRepositories = useMemo(() => {
    if (!filteredRepositories.length || !reposContext?.sortByName) {
      return filteredRepositories;
    }
    return filteredRepositories.sort((a, b) => a.name.localeCompare(b.name));
  }, [filteredRepositories, reposContext?.sortByName]);

  const renderContent = () => {
    if (isLoading || !searchContext?.query) return null;

    if (!localRepos?.length) {
      return <p>This user doesn't have any public repositories yet</p>;
    }

    if (sortedRepositories.length) {
      return (
        <div className="w-5/6 mx-auto">
          <DataResultsView sortedRepositories={sortedRepositories} />
        </div>
      );
    }

    return null;
  };

  return <>{renderContent()}</>;
};

export default DataResultsContainer;
