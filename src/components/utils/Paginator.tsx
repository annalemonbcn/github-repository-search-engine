// Utils
import ButtonGray from "./buttons/ButtonGray";

// Context
import { ReposContext } from "../../api/context/ReposProvider";
import { useContext } from "react";
import fetchRepos from "../../api/services/fetchRepos";
import { SearchContext } from "../../api/context/SearchProvider";
import { updateReposContext } from "./func/reposUtils";

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

  const fetchNextPage = async () => {
    try {
      if (query) {
        const data = await fetchRepos(query, nextCursor);
        if (data) {
          updateReposContext(
            data,
            true,
            setRepositories,
            setHasNextPage,
            setNextCursor,
            setLanguagesList
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {hasNextPage && (
        <div
          onClick={() => {
            fetchNextPage();
          }}
        >
          <ButtonGray text="Load 10 more" />
        </div>
      )}
    </>
  );
};

export default Paginator;
