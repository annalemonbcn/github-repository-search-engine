// Hooks
import { useContext, useEffect, useState, useCallback } from "react";

// Fetching
import fetchUser from "../../api/services/fetchUser";

// Components
import UserView from "../views/UserView";
import { SearchContext } from "../../api/context/SearchProvider";
import { UserContext } from "../../api/context/UserProvider";
import { toast } from "sonner";

const UserContainer = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { query } = useContext(SearchContext)!;
  const { user, setUser, resetUserContext } = useContext(UserContext)!;

  console.log("user -->", user);

  const fetchData = useCallback(async () => {
    if (!query) return;

    setIsLoading(true);

    try {
      const data = await fetchUser(query);

      // If user doesn't exist --> reset reposContext
      if (!data) {
        resetUserContext();
        toast.error("User doesn't exist");
      } else {
        setUser(data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
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
