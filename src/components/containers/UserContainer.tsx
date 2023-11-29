// Hooks
import { useQuery } from "@tanstack/react-query";

// Types
import { User } from "../../types";

// Fetching
import fetchUser from "../../api/services/fetchUser";

// Components
import UserView from "../views/UserView";


const UserContainer = () => {
  // TODO: implement isError
  const { isLoading, isError, data } = useQuery(["users"], fetchUser);

  const user: User = data;

  if (!isLoading) {
    return <UserView user={user} />;
  } else {
    return <div>Cargando...</div>;
  }
};

export default UserContainer;
