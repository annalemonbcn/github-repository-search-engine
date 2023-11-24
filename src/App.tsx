// import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";

import { query } from "./assets/query";
import { Repo } from "./types";
import { mapReponseData } from "./utils/utils";

function App() {
  const [repositories, setRepositories] = useState<Repo[]>([]);

  const originalRepositories = useRef<Repo[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const [sortByName, setSortByName] = useState<boolean>(false);
  const [sortByLanguage, setSortByLanguage] = useState<boolean>(false);
  const [filterByName, setFilterByName] = useState<string | null>(null)

  /**
   * Filters the repositories by name
   * useMemo -> to  prevent the overcalculating of that var
   */
  const filteredRepositories = useMemo(() => {
    return filterByName !== null && filterByName.length > 0
      ? repositories.filter((repo) => {
        return repo.name.toLowerCase().includes(filterByName.toLowerCase())
      }) : repositories
  }, [repositories, filterByName])

  /**
   * Orders the repositories by name or by language
   * useMemo -> to prevent the overcalculating of that var
   */
  const orderedRepositories = useMemo(() => {
    if (sortByName) {
      return filteredRepositories.toSorted((a, b) => {
        return a.name.localeCompare(b.name);
      });
    } else if (sortByLanguage) {
      return filteredRepositories.toSorted((a, b) => {
        const aLang = a.primaryLanguage?.name;
        const bLang = b.primaryLanguage?.name;
        return (aLang && bLang) ? aLang.localeCompare(bLang) : 0;
      });
    } else {
      return filteredRepositories;
    }
  }, [filteredRepositories, sortByName, sortByLanguage])

  /**
   * Toggles the sortByName value on state
   */
  const toggleSortByName = () => {
    setSortByName((prevState) => !prevState);
    setSortByLanguage(false)
  };

  /**
   * Toggles the sortByLanguage value on state
   */
  const toggleSortByLanguage = () => {
    setSortByLanguage((prevState) => !prevState);
    setSortByName(false)
  };

  useEffect(() => {
    fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_GITHUB_APIKEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => {
        setIsLoading(true);
        if (!res.ok) throw new Error("Error while making the request")
        return res.json();
      })
      .then((res) => {
        if (!(res.data.user)) {
          setError(true);
        } else {
          const auxRes: Repo[] = mapReponseData(res.data.user.repositories.nodes)
          setRepositories(auxRes); // -> local state
          originalRepositories.current = auxRes; // -> ref
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  

  return (
    <div className="w-3/4 mx-auto text-center">
      <h1 className="font-bold text-xl">Repositories</h1>

      {orderedRepositories.length > 0 && (
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

          <div className="p-2 border-b flex w-3/4 mx-auto">
            <div className="w-1/2 font-bold cursor-pointer" onClick={toggleSortByName}>Name</div>
            <div className="w-1/2 font-bold cursor-pointer" onClick={toggleSortByLanguage}>Primary language</div>
          </div>
          {orderedRepositories.map((repo) => {
            return (
              <div key={repo.id} className="repo flex w-3/4 mx-auto">
                <div className="p-2 w-1/2">{repo.name}</div>
                <div className="p-2 w-1/2">{repo.primaryLanguage?.name}</div>
              </div>
            );
          })}

          {isLoading && <p>Loading...</p>}
          {error && <p>Some error</p>}
          {!error && repositories.length === 0 && (
            <p>This user doesn't have any public repositories yet!</p>
          )}
        </div>
      )}

      {isLoading && <p className="strong">Loading...</p>}
      {error && <p>There has been an error</p>}
      {/* {!error && repositories.length === 0 && <p>No public repositories</p>} */}
    </div>
  );
}

export default App;
