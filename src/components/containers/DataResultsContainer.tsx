import { useEffect } from "react";

// Hooks
import { useMemo, useContext } from "react";

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

  // Local data
  let isLoading: boolean = false;

  /**
   * Aux method for fetching the data
   * Set data into context
   */
  const fetchData = async () => {
    // Set isLoading
    isLoading = true;

    if (searchContext && searchContext.query) {
      try {
        const data = await fetchRepos(searchContext.query);
        // Handle data
        const { repos, nextCursor, hasNextPage } = data;
        const languages: string[] = ["All", ...getLanguagesFromRepositoriesArray(repos)]
        // Set data into repos context
        if (reposContext) {
          reposContext.setRepositories(repos);
          reposContext.setHasNextPage(hasNextPage);
          reposContext.setNextCursor(nextCursor);
          reposContext.setLanguagesList(languages)
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        isLoading = false;
      }
    }
  };

  /**
   * useEffect for fetching data everytime the searchContext.query changes
   */
  useEffect(() => {
    fetchData();
  }, [searchContext?.query]);

  // Local data
  const localRepos: Repo[] | undefined = reposContext?.repositories;


  /**
   * Filters the repositories by name or language
   * useMemo -> to  prevent the overcalculating of that var
   */
  const filteredRepositories = useMemo(() => {
    return localRepos
      ? // Filter by name
        reposContext?.filterByName !== null && reposContext?.filterByName?.length > 0
        ? localRepos.filter((repo) => {
            return repo.name.toLowerCase().includes(reposContext?.filterByName.toLowerCase());
          })
        : // Filter by language
        reposContext?.filterByLanguage !== null &&
          reposContext?.filterByLanguage.length > 0 &&
          reposContext?.filterByLanguage !== "All"
        ? localRepos.filter((repo) => {
            return repo.primaryLanguage?.name.includes(reposContext?.filterByLanguage);
          })
        : localRepos
      : [];
  }, [localRepos, reposContext?.filterByName, reposContext?.filterByLanguage]);

  /**
   * Orders the repositories by name or by language
   * useMemo -> to prevent the overcalculating of that var
   */
  const sortedRepositories = useMemo(() => {
    return filteredRepositories && reposContext?.sortByName
      ? filteredRepositories.toSorted((a, b) => {
          return a.name.localeCompare(b.name);
        })
      : filteredRepositories;
  }, [filteredRepositories, reposContext?.sortByName]);

  
  const dataResultsViewProps = {
    sortedRepositories,
  };

  if (!isLoading && searchContext?.query) {
    return (
      <>
        {localRepos?.length === 0 ? (
          <p>This user doesn't have any public repositories yet</p>
        ) : (
          <>
            {/* If user has > 0 repos */}
            {sortedRepositories && sortedRepositories.length > 0 && (
              <div className="w-5/6 mx-auto">
                <DataResultsView sortedRepositories={sortedRepositories} />
              </div>
            )}
          </>
        )}
      </>
    );
  }
  
};

export default DataResultsContainer;
