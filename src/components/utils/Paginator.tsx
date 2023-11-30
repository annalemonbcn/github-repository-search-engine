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
  const reposContext = useContext(ReposContext);
  const searchContext = useContext(SearchContext);

  const fetchNextPage = async () => {
    try {
      if (searchContext && searchContext.query) {
        const data = await fetchRepos(
          searchContext?.query,
          reposContext?.nextCursor
        );
        if (reposContext) {
          updateReposContext(
            data,
            true,
            reposContext?.setRepositories,
            reposContext?.setHasNextPage,
            reposContext?.setNextCursor,
            reposContext?.setLanguagesList
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {reposContext?.hasNextPage && (
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
