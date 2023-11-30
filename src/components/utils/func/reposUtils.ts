// Types
import { Repo, FetchReposResult } from "../../../types";

export const formatDate = (inputDate: string) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const date = new Date(inputDate);
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day} ${year}`;
}

export const getLanguagesFromRepositoriesArray = (repositories: Repo[]) => {
  const languages: string[] = [];

  repositories.forEach((repo) => {
    if (repo.primaryLanguage && repo.primaryLanguage.name) {
      const languageExists = languages.find((language) => language === repo.primaryLanguage?.name)
      if(!languageExists){
        languages.push(repo.primaryLanguage.name)
      }
    }
  })

  return languages.sort();
}

export const updateReposContext = (
  data: FetchReposResult,
  appendData: boolean,
  setRepos: React.Dispatch<React.SetStateAction<Repo[]>>,
  setHasNextPage: React.Dispatch<React.SetStateAction<boolean>>,
  setNextCursor: React.Dispatch<React.SetStateAction<string | undefined>>,
  setLanguagesList: React.Dispatch<React.SetStateAction<string[]>>

) => {
  const { repos, nextCursor, hasNextPage } = data;
  const languages: string[] = ["All", ...getLanguagesFromRepositoriesArray(repos)];

  // Update repositories
  if (appendData) {
    setRepos(prevRepos => [...prevRepos, ...repos]);
  } else {
    setRepos(repos);
  }

  // Update hasNextPage and nextCursor
  setHasNextPage(hasNextPage);
  setNextCursor(nextCursor);

  // Update languagesList
  setLanguagesList(prevLanguages => [
    ...prevLanguages,
    ...languages.filter(language => !prevLanguages.includes(language))
  ]);

}