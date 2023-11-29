// Hooks
import { useEffect, useState } from "react";

// Types
import { User } from "../../types";

// Query
import { fetchUserQuery } from "../../assets/graphqlQueries";
import UserView from "../views/UserView";


const UserContainer = () => {
  const [user, setUser] = useState<User | undefined>();

  useEffect(() => {
    fetch("https://api.github.com/graphql", {
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
      .then((res) => setUser(res.data.user));
  }, []);

  console.log('user', user)

  return <UserView user={user} />
};

export default UserContainer;
