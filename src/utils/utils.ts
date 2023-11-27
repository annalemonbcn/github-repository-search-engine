import { Repo } from "../types"

export const mapReponseData = (data: Repo[]) => {
  return data.map((repo) => {
    if(!repo.primaryLanguage?.name){
      return {
        ... repo,
        primaryLanguage: {
          name: "Readme"
        }
      }
    }
    return repo
  })
}