// Types
import { FetchUserAndReposResponseDataFromAPI, User } from "../../types";

// Query
import { fetchUserAndReposQuery } from "../../queries/graphqlQueries";

/**
 * Fetch user info and user repos from the GraphQL Github API
 * @param username --> github user of which we fetch the info
 * @param nextCursor (optional) --> endpoint to make the request to obtain 10 more repositories
 * @returns if user found --> User | if user not found --> null
 */
const fetchUserAndRepos = async (
  username: string,
  nextCursor: string | null = null
): Promise<User | null> => {
  const query = fetchUserAndReposQuery(username, nextCursor);

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

  const data: FetchUserAndReposResponseDataFromAPI = await response.json();

  if (data.data.user !== null) {
    return data.data.user;
  }
  return null;
};

export default fetchUserAndRepos;
