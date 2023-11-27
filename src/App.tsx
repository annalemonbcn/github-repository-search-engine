import { useInfiniteQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { Repo, RepositoriesReponseFromAPI } from "./types";

import { mapReponseData } from "./utils/utils";
import { fetchReposQuery } from "./assets/graphqlQueries";

const fetchRepos = async ({
  pageParam = null,
}: {
  pageParam?: string | null;
}) => {
  const query = fetchReposQuery(pageParam);

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_APIKEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) throw new Error("Error while making the request");

  const data: RepositoriesReponseFromAPI = await response.json();

  return {
    repos: mapReponseData(data.data.user.repositories.nodes),
    nextCursor: data.data.user.repositories.pageInfo.endCursor,
    hasNextPage: data.data.user.repositories.pageInfo.hasNextPage,
  };
};

function App() {
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

  return (
    <div className="w-3/4 mx-auto text-center">
      <h1 className="font-bold text-xl">Repositories</h1>

      {!isLoading && sortedRepositories.length > 0 && (
        <div className="mt-4 flex flex-col">
          <div className="buttons flex gap-2 justify-center items-center my-4">
            <button
              className="rounded-md py-2 px-4 bg-slate-200 hover:bg-slate-500 hover:text-white"
              onClick={toggleSortByName}
            >
              {sortByName ? "No order by name" : "Order by name"}
            </button>
            <button
              className="rounded-md py-2 px-4 bg-slate-200 hover:bg-slate-500 hover:text-white"
              onClick={toggleSortByLanguage}
            >
              {sortByLanguage ? "No order by language" : "Order by language"}
            </button>
            <input
              type="text"
              className="border border-slate-300 rounded-md p-2"
              placeholder="Filter by name"
              onChange={(e) => setFilterByName(e.target.value)}
            />
          </div>

          {/* TABLE */}
          <div className="p-2 border-b flex w-3/4 mx-auto">
            <div
              className="w-1/2 font-bold cursor-pointer"
              onClick={toggleSortByName}
            >
              Name
            </div>
            <div
              className="w-1/2 font-bold cursor-pointer"
              onClick={toggleSortByLanguage}
            >
              Primary language
            </div>
          </div>
          {sortedRepositories.map((repo) => {
            return (
              <div key={repo.id} className="repo flex w-3/4 mx-auto">
                <div className="p-2 w-1/2">{repo.name}</div>
                <div className="p-2 w-1/2">{repo.primaryLanguage?.name}</div>
              </div>
            );
          })}

          {/* LOAD MORE */}
          {hasNextPage && (
            <div className="flex justify-center my-4">
              <button
                className="rounded-md py-2 px-4 bg-slate-200 hover:bg-slate-500 hover:text-white"
                onClick={() => {
                  fetchNextPage();
                }}
              >
                Load 10 more
              </button>
            </div>
          )}
        </div>
      )}

      {isLoading && <p>Loading...</p>}
      {isError && <p>Some error</p>}
      {!isLoading && !isError && repositories.length === 0 && (
        <p>This user doesn't have any public repositories yet!</p>
      )}
    </div>
  );
}

export default App;
