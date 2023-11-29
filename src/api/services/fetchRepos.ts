// Types
import { RepositoriesReponseFromAPI, Repo, FetchReposResult } from "../../types";

// Query
import { fetchReposQuery } from "../../queries/graphqlQueries";

/**
 * Fetch repos from GraphQL Github API
 * @param pageParam (optional) -> next endpoint for fetching next data
 * @returns an FetchReposResult type object
 */
const fetchRepos = async ({
  pageParam = null,
}: {
  pageParam?: string | null;
}): Promise<FetchReposResult> => {
  const query = fetchReposQuery(pageParam);

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_APIKEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  if (!response.ok) throw new Error("Error while making the request");
  
  const data: RepositoriesReponseFromAPI = await response.json();

  return {
    repos: mapResponseData(data.data.user.repositories.nodes),
    nextCursor: data.data.user.repositories.pageInfo.endCursor,
    hasNextPage: data.data.user.repositories.pageInfo.hasNextPage,
  };
};

export default fetchRepos;

/**
 * Aux function to search for the repos with no primaryLanguage informed
 * and assign them a "Readme" value
 * @param data -> repositories from the response from api
 * @returns repositories from the response with the primaryLanguage === "" value changed
 */
const mapResponseData = (data: Repo[]) => {
  return data.map((repo) => {
    if (!repo.primaryLanguage?.name) {
      return {
        ...repo,
        primaryLanguage: {
          name: "Readme",
        },
      };
    }
    return repo;
  });
};
