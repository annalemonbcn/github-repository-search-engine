import { User } from "../../../types"

export const resetUser = (
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  setUser(undefined)
  setIsLoading(false)
}