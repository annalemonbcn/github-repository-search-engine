// Types
import { RepositoriesReponseFromAPI, Repo } from "../types";

// Query
import { fetchReposQuery } from "../assets/graphqlQueries";


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
    repos: mapResponseData(data.data.user.repositories.nodes),
    nextCursor: data.data.user.repositories.pageInfo.endCursor,
    hasNextPage: data.data.user.repositories.pageInfo.hasNextPage,
  };
};

export default fetchRepos

const mapResponseData = (data: Repo[]) => {
  return data.map((repo) => {
    if(!repo.primaryLanguage?.name){
      return {
        ... repo,
        primaryLanguage: {
          name: "Readme"
        }
      }
    }
    return repo
  })
}