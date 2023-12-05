// Types
import { Repo } from "../../../types";

/**
 * Format date from text
 * @param inputDate --> string
 * @returns Month day year
 * @example "2023-12-04T15:37:37Z" -> "December 4 2023"
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
export const getLanguagesFromRepositoriesArray = (
  repositories: Repo[]
): string[] => {
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
  repos: Repo[],
  appendData: boolean,
  setRepos: React.Dispatch<React.SetStateAction<Repo[] | null>>,
  hasNextPage: boolean,
  setHasNextPage: React.Dispatch<React.SetStateAction<boolean>>,
  nextCursor: string,
  setNextCursor: React.Dispatch<React.SetStateAction<string | undefined>>,
  setLanguagesList: React.Dispatch<React.SetStateAction<string[]>>
) => {
  const languages: string[] = [
    "All",
    ...getLanguagesFromRepositoriesArray(repos),
  ];

  const updatedRepos = updateReadmePrimaryLanguage(repos);

  // Update repositories
  if (appendData) {
    setRepos((prevRepos) => {
      if (prevRepos === null) {
        return updatedRepos;
      }
      return prevRepos.concat(updatedRepos);
    });
  } else {
    setRepos(updatedRepos);
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

/**
 * Aux function to search for the repos with no primaryLanguage informed
 * and assign them a "Readme" value
 * @description we are assuming that the no informed primary language repo is the Readme repository
 * @param data -> repositories from the response from api
 * @returns repositories from the response with the primaryLanguage === "" value changed
 */
const updateReadmePrimaryLanguage = (data: Repo[]) => {
  return data.map((repo) => {
    if (!repo.primaryLanguage?.name) {
      return {
        ...repo,
        primaryLanguage: {
          name: "Readme",
        },
      };
    }
    return repo;
  });
};
