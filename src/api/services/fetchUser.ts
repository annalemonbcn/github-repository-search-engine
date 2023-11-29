// Types
import { User, UserResponseDataFromAPI } from "../../types";

// Query
import { fetchUserQuery } from "../../queries/graphqlQueries";

const fetchUser = async (): Promise<User> => {
  const query = fetchUserQuery;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_APIKEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query }),
  });

  if (!response.ok) throw new Error("Error while making the request");

  const data: UserResponseDataFromAPI = await response.json();

  return data.data.user;
};

export default fetchUser;
