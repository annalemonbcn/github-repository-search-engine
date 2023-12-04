import { createContext, useState, ReactNode } from "react"

import { User } from "../../types";

/**
 * props for the searchContext
 */
interface UserContextProps {
  user: User | undefined
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
  resetUserContext: () => void
}

export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

/**
 * prop for the UserProvider
 */
interface UserProviderProps {
  children: ReactNode;
}

const UserProvider = (props: UserProviderProps) => {

  const [user, setUser] = useState<User | undefined>();

  /**
   * Reset userContextState
   */
  const resetUserContext = () => {
    setUser(undefined)
  }

  const userContextValue: UserContextProps = {
    user,
    setUser,
    resetUserContext 
  }

  return (
    <UserContext.Provider value={userContextValue}>
      {props.children}
    </UserContext.Provider>
  )
}

export default UserProvider
