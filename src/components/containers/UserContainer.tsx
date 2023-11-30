// Types
import { User } from "../../types";

// Fetching
import fetchUser from "../../api/services/fetchUser";

// Components
import UserView from "../views/UserView";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../api/context/SearchProvider";

const UserContainer = () => {
  const searchContext = useContext(SearchContext);

  const [user, setUser] = useState<User | undefined>();

  let isLoading = false;
  

  const fetchData = async () => {
    // Set isLoading
    isLoading = true;

    if (searchContext && searchContext.query) {
      try {
        const data = await fetchUser(searchContext.query);
        setUser(data)
      } catch (error) {
        console.error("Error:", error);
      } finally {
        isLoading = false;
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchContext?.query]);

  if (!isLoading && user) {
    return <UserView user={user} />;
  } else {
    return <div>Cargando...</div>;
  }
};

export default UserContainer;
