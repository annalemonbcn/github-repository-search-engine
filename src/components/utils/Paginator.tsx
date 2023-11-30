// Utils
import ButtonGray from "./buttons/ButtonGray";

// Context
import { ReposContext } from "../../api/context/ReposProvider";
import { useContext } from "react";
import fetchRepos from "../../api/services/fetchRepos";
import { SearchContext } from "../../api/context/SearchProvider";
import { getLanguagesFromRepositoriesArray } from "./func/utils";

const Paginator = () => {
  // Repos context
  const reposContext = useContext(ReposContext);
  const searchContext = useContext(SearchContext)

  const fetchNextPage = async () => {
    console.log("Fetch next page implement pending");
    try {
      if(searchContext && searchContext.query){
        const data = await fetchRepos(searchContext?.query, reposContext?.nextCursor)
        console.log('data', data)
        // Handle data
        const { repos, nextCursor, hasNextPage } = data;
        const languages: string[] = getLanguagesFromRepositoriesArray(repos)     
        // Set data into repos context
        if(reposContext){
          reposContext.setRepositories(prevRepos => [...prevRepos, ...repos])
          reposContext.setHasNextPage(hasNextPage)
          reposContext.setNextCursor(nextCursor)
          const uniqueLanguages: string[] = reposContext?.languagesList.concat(languages.filter(language => reposContext.languagesList.indexOf(language) === -1));
          reposContext.setLanguagesList(uniqueLanguages)
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
