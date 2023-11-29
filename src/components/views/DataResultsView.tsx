// Types
import { Repo, FetchReposResult } from "../../types";

// Components
import UserContainer from "../containers/UserContainer";
import RepoView from "./RepoView";
import FiltersContainer from "../containers/FiltersContainer";
import Paginator from "../../utils/Paginator";

interface DataResultsViewProps {
  sortedRepositories: Repo[];
  sortByName: boolean;
  toggleSortByName: () => void;
  sortByLanguage: boolean;
  toggleSortByLanguage: () => void;
  setFilterByName: React.Dispatch<React.SetStateAction<string | null>>;
  isError: boolean;
  hasNextPage: boolean | undefined;
  fetchNextPage: (options?: {
    pageParam?: string | null | undefined;
  }) => Promise<FetchReposResult>;
}

const DataResultsView = (props: DataResultsViewProps) => {
  const {
    sortedRepositories,
    sortByName,
    toggleSortByName,
    sortByLanguage,
    toggleSortByLanguage,
    setFilterByName,
    hasNextPage,
    fetchNextPage,
  } = props;

  const filtersContainerProps = {
    toggleSortByName,
    sortByName,
    toggleSortByLanguage,
    sortByLanguage,
    setFilterByName,
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <UserContainer />
        </div>
        <div className="md:w-2/3 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">
            {/* TODO */}
            {/* Search results for user {searchContext?.query} */}
            Search results for user
          </h2>
          {/* Filters */}
          <FiltersContainer {...filtersContainerProps} />
          {/* Repositories list */}
          <div className="flex flex-col gap-4">
            {sortedRepositories.length > 0 &&
              sortedRepositories.map((repo, index) => (
                <RepoView repo={repo} key={index} />
              ))}
          </div>
          {/* Pagination */}
          <Paginator hasNextPage={hasNextPage} fetchNextPage={fetchNextPage} />
        </div>
      </div>
    </div>
  );
};

export default DataResultsView;
