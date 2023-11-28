// Types
import { RepositoriesReponseFromAPI } from "../types";

// Query
import { fetchReposQuery } from "../assets/graphqlQueries";

// Utils
import { mapReponseData } from "../utils/utils";


const fetchRepos = async ({
  pageParam = null,
}: {
  pageParam?: string | null;
}) => {
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
    repos: mapReponseData(data.data.user.repositories.nodes),
    nextCursor: data.data.user.repositories.pageInfo.endCursor,
    hasNextPage: data.data.user.repositories.pageInfo.hasNextPage,
  };
};

export default fetchRepos