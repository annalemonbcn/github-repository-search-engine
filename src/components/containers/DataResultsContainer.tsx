// Hooks
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

// Types
import { Repo } from "../../types";

// Utils
import fetchRepos from "../../api/services/fetchRepos";

// Components
import DataResultsView from "../views/DataResultsView";

const DataResultsContainer = () => {
  // React-query hook
  const { isLoading, isError, data, hasNextPage, fetchNextPage } =
    useInfiniteQuery(["repos"], ({ pageParam }) => fetchRepos({ pageParam }), {
      getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    });

  // Local data
  const repositories: Repo[] = data?.pages?.flatMap((page) => page.repos) ?? [];

  // State
  const [sortByName, setSortByName] = useState<boolean>(false);
  const [sortByLanguage, setSortByLanguage] = useState<boolean>(false);
  const [filterByName, setFilterByName] = useState<string | null>(null);

  /**
   * Filters the repositories by name
   * useMemo -> to  prevent the overcalculating of that var
   */
  const filteredRepositories = useMemo(() => {
    return !isLoading && filterByName !== null && filterByName.length > 0
      ? repositories.filter((repo) => {
          return repo.name.toLowerCase().includes(filterByName.toLowerCase());
        })
      : repositories;
  }, [repositories, filterByName]);

  /**
   * Orders the repositories by name or by language
   * useMemo -> to prevent the overcalculating of that var
   */
  const sortedRepositories = useMemo(() => {
    if (!isLoading && sortByName) {
      return filteredRepositories.toSorted((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (!isLoading && sortByLanguage) {
      return filteredRepositories.toSorted((a, b) => {
        const aLang = a.primaryLanguage?.name;
        const bLang = b.primaryLanguage?.name;
        return aLang && bLang ? aLang.localeCompare(bLang) : 0;
      });
    } else {
      return filteredRepositories;
    }
  }, [filteredRepositories, sortByName, sortByLanguage]);

  /**
   * Toggles the sortByName value on state
   */
  const toggleSortByName = () => {
    setSortByName((prevState) => !prevState);
    setSortByLanguage(false);
  };

  /**
   * Toggles the sortByLanguage value on state
   */
  const toggleSortByLanguage = () => {
    setSortByLanguage((prevState) => !prevState);
    setSortByName(false);
  };

  const dataResultsViewProps = {
    sortedRepositories,
    sortByName,
    toggleSortByName,
    sortByLanguage,
    toggleSortByLanguage,
    setFilterByName,
    isError,
    hasNextPage,
    fetchNextPage,
  };

  // TODO: refactor return
  return (
    <>
      {/* If loading */}
      {isLoading && <p>Loading...</p>}

      {/* If user has > 0 repos */}
      {!isLoading && sortedRepositories.length > 0 && (
        <div className="w-5/6 mx-auto">
          <DataResultsView {...dataResultsViewProps} />
        </div>
      )}

      {/* If is error */}
      {isError && <p>Some error</p>}
      
      {/* If user has no repos */}
      {!isLoading && !isError && repositories.length === 0 && (
          <p>This user doesn't have any public repositories yet!</p>
      )}
    </>
  );
};

export default DataResultsContainer;
