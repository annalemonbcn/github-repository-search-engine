// Types
import { User, UserResponseDataFromAPI } from "../../types";

// Query
import { fetchUserQuery } from "../../queries/graphqlQueries";

/**
 * Fetch user info from GraphQL Github API
 * @param username --> github user of which we fetch their info
 * @returns user info
 */
const fetchUser = async (username: string): Promise<User> => {
  const query = fetchUserQuery(username);

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_APIKEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query })
  });

  if (!response.ok) throw new Error("Error while making the request");

  const data: UserResponseDataFromAPI = await response.json();

  return data.data.user;
};

export default fetchUser;
