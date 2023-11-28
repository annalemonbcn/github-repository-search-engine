declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[]
  }
}

export type Repo = {
  name: string;
  description: null | string;
  id: string;
  url: string;
  primaryLanguage: {
    name: string;
  } | null;
  updatedAt: string;
  stargazerCount: number;
  repositoryTopics: {
    nodes: RepositoryTopics[];
  };
};

export type RepositoryTopics = {
  topic: {
    name: string;
  };
  url: string;
};

export type RepositoriesReponseFromAPI = {
  data: {
    user: {
      repositories: {
        nodes: Repo[],
        pageInfo: PageInfo,
      }
    }
  }
}

type pageInfo = {
  endCursor:       string;
  hasNextPage:     boolean;
  startCursor:     string;
  hasPreviousPage: boolean;
}

export type FetchReposResult = {
  repos: Repo[],
  hasNextPage: boolean,
  nextCursor: string
}