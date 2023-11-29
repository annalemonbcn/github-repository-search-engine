import React from "react";

// Hooks
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

// Types
import { Repo } from "../../types";

// Utils
import fetchRepos from "../../api/services/fetchRepos";
import { getLanguagesFromRepositoriesArray } from "../../utils/func/utils";

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
  const languagesList = [
    "All",
    ...getLanguagesFromRepositoriesArray(repositories),
  ];

  // State
  const [sortByName, setSortByName] = useState<boolean>(false);
  const [filterByName, setFilterByName] = useState<string | null>(null);
  const [filterByLanguage, setFilterByLanguage] = useState<string | null>(null);

  /**
   * Filters the repositories by name or language
   * useMemo -> to  prevent the overcalculating of that var
   */
  const filteredRepositories = useMemo(() => {
    if (!isLoading) {
      //Filter by name
      if (filterByName !== null && filterByName.length > 0) {
        return repositories.filter((repo) => {
          return repo.name.toLowerCase().includes(filterByName.toLowerCase());
        });
      }
      // Filter by language
      if (filterByLanguage !== null && filterByLanguage.length > 0) {
        if (filterByLanguage === "All") {
          return repositories;
        } else {
          return repositories.filter((repo) => {
            return repo.primaryLanguage?.name.includes(filterByLanguage);
          });
        }
      }
    }
    return repositories;
  }, [repositories, filterByName, filterByLanguage]);

  /**
   * Orders the repositories by name or by language
   * useMemo -> to prevent the overcalculating of that var
   */
  const sortedRepositories = useMemo(() => {
    return !isLoading && sortByName
      ? filteredRepositories.toSorted((a, b) => {
          return a.name.localeCompare(b.name);
        })
      : filteredRepositories;
  }, [filteredRepositories, sortByName]);

  /**
   * Toggles the sortByName value on state
   */
  const toggleSortByName = () => {
    setSortByName((prevState) => !prevState);
  };

  const dataResultsViewProps = {
    sortedRepositories,
    languagesList,
    sortByName,
    toggleSortByName,
    setFilterByName,
    filterByLanguage,
    setFilterByLanguage,
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
