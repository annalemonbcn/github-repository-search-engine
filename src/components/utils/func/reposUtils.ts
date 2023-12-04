// Types
import { Repo, FetchReposResult } from "../../../types";

/**
 * Format date from text
 * @param inputDate --> string ex: 2023-12-04T15:37:37Z
 * @returns Month day year Ex: December 4 2023
 */
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
};

/**
 * Iterate the repositories array finding the unique languages values
 * @param repositories
 * @returns a sorted array with unique languages
 */
export const getLanguagesFromRepositoriesArray = (repositories: Repo[]) => {
  const languages: string[] = [];

  repositories.forEach((repo) => {
    if (repo.primaryLanguage && repo.primaryLanguage.name) {
      const languageExists = languages.find(
        (language) => language === repo.primaryLanguage?.name
      );
      if (!languageExists) {
        languages.push(repo.primaryLanguage.name);
      }
    }
  });

  return languages.sort();
};

/**
 * Aux method for updating the reposContext states
 * @param data
 * @param appendData
 * @param setRepos
 * @param setHasNextPage
 * @param setNextCursor
 * @param setLanguagesList
 */
export const updateReposContext = (
  data: FetchReposResult,
  appendData: boolean,
  setRepos: React.Dispatch<React.SetStateAction<Repo[] | null>>,
  setHasNextPage: React.Dispatch<React.SetStateAction<boolean>>,
  setNextCursor: React.Dispatch<React.SetStateAction<string | undefined>>,
  setLanguagesList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const { repos, nextCursor, hasNextPage } = data;
  const languages: string[] = [
    "All",
    ...getLanguagesFromRepositoriesArray(repos),
  ];

  // Update repositories
  if (appendData) {
    setRepos((prevRepos) => {
      if (prevRepos === null) {
        return repos;
      }
      return prevRepos.concat(repos);
    });
  } else {
    setRepos(repos);
  }

  // Update hasNextPage and nextCursor
  setHasNextPage(hasNextPage);
  setNextCursor(nextCursor);

  // Update languagesList
  setLanguagesList((prevLanguages) => [
    ...prevLanguages,
    ...languages.filter((language) => !prevLanguages.includes(language)),
  ]);
};
