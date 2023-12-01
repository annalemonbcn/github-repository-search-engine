// Types
import { User } from "../../types";

// Hooks
import { useContext, useEffect, useState, useCallback } from "react";

// Fetching
import fetchUser from "../../api/services/fetchUser";

// Components
import UserView from "../views/UserView";
import { SearchContext } from "../../api/context/SearchProvider";

const UserContainer = () => {
  const searchContext = useContext(SearchContext);
  const query = searchContext?.query;
  const [user, setUser] = useState<User | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  

  const fetchData = useCallback(async () => {
    // Set isLoading
    setIsLoading(true);

    if (query) {
      try {
        const data = await fetchUser(query);
        setUser(data)
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    }
  }, [query]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!isLoading && user) {
    return <UserView user={user} />;
  }
  return <div>Cargando...</div>;
  
};

export default UserContainer;
