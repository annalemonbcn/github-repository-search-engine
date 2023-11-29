import { fetchUserQuery } from "../../queries/graphqlQueries";

const fetchUser = async () => {
  return await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_GITHUB_APIKEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: fetchUserQuery }),
  })
    .then((res) => {
      // console.log("res", res);
      if (!res.ok) throw new Error("Error en el proceso");
      return res.json();
    })
    .then((res) => res.data.user);
};

export default fetchUser