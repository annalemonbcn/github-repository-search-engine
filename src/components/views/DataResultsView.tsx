// Types
import { Repo } from "../../types";

// Components
import RepoView from "./RepoView";
import FiltersContainer from "../containers/FiltersContainer";


interface DataResultsViewProps {
  repos: Repo[];
  sortByName: boolean;
  toggleSortByName: () => void;
  sortByLanguage: boolean;
  toggleSortByLanguage: () => void;
  setFilterByName: React.Dispatch<React.SetStateAction<string | null>>;
  hasNextPage: boolean | undefined;
  // fetchNextPage
}

const DataResultsView = (props: DataResultsViewProps) => {

  const { 
    repos,
    sortByName,
    toggleSortByName,
    sortByLanguage,
    toggleSortByLanguage,
    setFilterByName
  } = props

  const filtersContainerProps = {
    toggleSortByName,
    sortByName,
    toggleSortByLanguage,
    sortByLanguage,
    setFilterByName
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          {/* <UserContainer /> */}
          <p>User container</p>
        </div>
        <div className="md:w-2/3 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">
            // TODO
            {/* Search results for user {searchContext?.query} */}
            Search results for user
          </h2>
          <FiltersContainer {...filtersContainerProps} />
          <div className="flex flex-col gap-4">
            {repos.length > 0 && (
              repos.map((repo, index) => <RepoView repo={repo} key={index} />)
            )}
          </div>
          {/* <Paginator /> */}
          <p>Paginator</p>
        </div>
      </div>
    </div>
  );
};

export default DataResultsView;
