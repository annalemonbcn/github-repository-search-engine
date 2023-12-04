// Types
import {
  RepositoriesReponseFromAPI,
  Repo,
  FetchReposResult,
  ErrorRepositoriesResponseFromAPI,
} from "../../types";

// Query
import { fetchReposQuery } from "../../queries/graphqlQueries";

/**
 * Fetch repos from GraphQL Github API
 * @param pageParam (optional) -> next endpoint for fetching next data
 * @returns a FetchReposResult type object
 */
/**
 * Fetch repos info from GraphQL Github API
 * @param username --> github user of which we fetch their repositories
 * @param nextCursor (optional) --> endpoint to make the request to obtain 10 more repositories
 * @returns if user found --> FetchReposResult type object | if user not found --> null
 */
const fetchRepos = async (
  username: string,
  nextCursor: string | null = null
): Promise<FetchReposResult | null> => {
  const query = fetchReposQuery(username, nextCursor);

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_APIKEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });
  // Check res
  if (!response.ok) throw new Error("Error when making the request");

  const data: RepositoriesReponseFromAPI | ErrorRepositoriesResponseFromAPI =
    await response.json();
  if (data.data.user !== null) {
    return {
      repos: mapResponseData(data.data.user.repositories.nodes),
      nextCursor: data.data.user.repositories.pageInfo.endCursor,
      hasNextPage: data.data.user.repositories.pageInfo.hasNextPage,
    };
  }
  return null;
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
