import { useContext } from 'react';

// Context
import { SearchContext } from '../../api/context/SearchProvider';

// Components
import Searchbar from '../utils/Searchbar';

const SearchContainer = () => {

  const { query } = useContext(SearchContext)!;

  return (
    <div className="w-5/6 lg:w-4/6 mx-auto my-10 searchContainer">
      <div
        className={`introText transition-opacity transition-height ${
          query
            ? "opacity-0 h-0"
            : "opacity-100 h-auto"
        }`}
      >
        <p className="mb-2 text-lg max-w-3xl mx-auto">
          Type the name of a GitHub user and explore all their repositories. Use
          the "Previous page" and "Next page" navigation to explore all the
          repositories!
        </p>
        <p className="mb-6 text-xl">
          Start your adventure now!<span className="italic">&lt;/&gt;</span>
        </p>
      </div>
      <Searchbar />
    </div>
  );
}

export default SearchContainer
