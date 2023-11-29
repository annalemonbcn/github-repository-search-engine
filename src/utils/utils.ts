// Types
import { Repo } from "../types";

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