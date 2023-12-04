import { useContext } from "react";

// Types
import { Repo } from "../../types";

// Components
import UserContainer from "../containers/UserContainer";
import RepoView from "./RepoView";
import FiltersContainer from "../containers/FiltersContainer";
import Paginator from "../utils/Paginator";

// Context
import { SearchContext } from "../../api/context/SearchProvider";

interface DataResultsViewProps {
  sortedRepositories: Repo[];
}

const DataResultsView = ({ sortedRepositories }: DataResultsViewProps) => {
  // Search context
  const searchContext = useContext(SearchContext);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <UserContainer />
        </div>
        <div className="md:w-2/3 flex flex-col gap-4">
          {!sortedRepositories.length ? (
            <p>This user doesn't have any public repositories yet</p>
          ) : (
            <>
              <h2 className="text-xl font-semibold">
                Search results for user {searchContext?.query}
              </h2>
              <FiltersContainer />
              <div className="flex flex-col gap-4">
                {sortedRepositories.length > 0 &&
                  sortedRepositories.map((repo, index) => (
                    <RepoView repo={repo} key={index} />
                  ))}
              </div>
              <Paginator />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataResultsView;
