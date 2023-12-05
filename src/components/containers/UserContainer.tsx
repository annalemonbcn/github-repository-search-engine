// Hooks
import { useContext } from "react";

// Components
import UserView from "../views/UserView";
import { UserContext } from "../../api/context/UserProvider";

const UserContainer = () => {

  const { user } = useContext(UserContext)!;

  // Render
  if (user) {
    return <UserView user={user} />;
  }
  return <div>Cargando...</div>;
};

export default UserContainer;
