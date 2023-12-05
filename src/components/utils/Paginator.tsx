// Utils
import ButtonGray from "./buttons/ButtonGray";

// Context
import { ReposContext } from "../../api/context/ReposProvider";
import { useContext } from "react";
import fetchUserAndRepos from "../../api/services/fetchData";
import { SearchContext } from "../../api/context/SearchProvider";
import { updateReposContext } from "./func/reposUtils";
import { User } from "../../types";

const Paginator = () => {
  // Repos context
  const {
    setRepositories,
    hasNextPage,
    setHasNextPage,
    nextCursor,
    setNextCursor,
    setLanguagesList,
  } = useContext(ReposContext)!;
  const { query } = useContext(SearchContext)!;

  /**
   * Aux method to fetch the next 10 results from GraphqlAPI
   */
  const fetchNextPage = async () => {
    try {
      if (query) {
        const data: User | null = await fetchUserAndRepos(query, nextCursor);
        if (data) {
          // Update reposContext
          updateReposContext(
            data.repositories.nodes,
            true,
            setRepositories,
            data.repositories.pageInfo.hasNextPage,
            setHasNextPage,
            data.repositories.pageInfo.endCursor,
            setNextCursor,
            setLanguagesList
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (hasNextPage) {
    return (
      <div onClick={() => { fetchNextPage() }}>
        <ButtonGray text="Load 10 more" />
      </div>
    )
  }
  return null;
};

export default Paginator;
