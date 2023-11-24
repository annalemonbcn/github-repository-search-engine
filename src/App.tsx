// import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";

import { Repo } from "./types";

import { mapReponseData } from "./utils/utils";
import { fetchReposQuery } from "./assets/graphqlQueries";

const fetchRepos = async (nextCursor?: string) => {

  const query = fetchReposQuery(nextCursor);

  return await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_APIKEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Error while making the request");
      return res.json();
    })
    .then((res) => res.data)
}

function App() {
  const [repositories, setRepositories] = useState<Repo[]>([]);
  const [sortByName, setSortByName] = useState<boolean>(false);
  const [sortByLanguage, setSortByLanguage] = useState<boolean>(false);
  const [filterByName, setFilterByName] = useState<string | null>(null);

  const originalRepositories = useRef<Repo[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  
  const [nextCursor, setNextCursor] = useState<string>("");
  const [hasNextPage, setHasNextPage] = useState<boolean | undefined>(undefined);
  const [loadPage, setLoadPage] = useState<boolean>(false)

  useEffect(() => {
    console.log('repositories', repositories)
    console.log('nextCursor', nextCursor)
    console.log('hasNextPage', hasNextPage)
    console.log('loadPage', loadPage)
  }, [repositories, nextCursor, hasNextPage, loadPage])


  /**
   * Filters the repositories by name
   * useMemo -> to  prevent the overcalculating of that var
   */
  const filteredRepositories = useMemo(() => {
    return filterByName !== null && filterByName.length > 0
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
    if (sortByName) {
      return filteredRepositories.toSorted((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (sortByLanguage) {
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

  // Fetch data
  useEffect(() => {
    
    setIsLoading(true);
    setIsError(false);

    fetchRepos(nextCursor)
      .then((res) => {
        // console.log('res', res)
        if (!res.user) {
          setIsError(true);
          // TODO: User doesn't exist
        } else {
          const auxRes: Repo[] = mapReponseData(
            res.user.repositories.nodes
          );
          setRepositories(prevUsers => {
            const newRepos = prevUsers.concat(auxRes)
            originalRepositories.current = newRepos;
            return newRepos
          }); // -> update local state
          setNextCursor(res.user.repositories.pageInfo.endCursor) // -> update cursor
          setHasNextPage(res.user.repositories.pageInfo.hasNextPage) // -> update hasNextPage
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsError(err);
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
        setLoadPage(false);
      });
  }, [loadPage]);

  return (
    <div className="w-3/4 mx-auto text-center">
      <h1 className="font-bold text-xl">Repositories</h1>

      {sortedRepositories.length > 0 && (
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
                onClick={() => setLoadPage(true)}
                // TODO -> fix double click (?)
              >
                Load 10 more
              </button>
            </div>
          )}
        </div>
      )}

      {isLoading && <p>Loading...</p>}
      {isError && <p>Some error</p>}
      {!isError && repositories.length === 0 && (
        <p>This user doesn't have any public repositories yet!</p>
      )}
    </div>
  );
}

export default App;
