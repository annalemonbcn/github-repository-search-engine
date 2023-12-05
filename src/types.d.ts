declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[];
  }
}


/**
 * Basic repo type from graphql api
 */
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

type RepositoryTopics = {
  topic: {
    name: string;
  };
  url: string;
};


/**
 * User basic type from graphql api
 */
export type User = {
  avatarUrl: string;
  login: string;
  url: string;
  bio: string;
  followers: {
    totalCount: number;
  };
  following: {
    totalCount: number;
  };
  email: string;
  public_repositories: {
    totalCount: number;
  };
  twitterUsername: string | null;
  createdAt: string;
  repositories: {
    totalCount: number;
    pageInfo: pageInfo;
    nodes: Repo[];
  }
};

type pageInfo = {
  endCursor: string;
  hasNextPage: boolean;
};

/**
 * Data response from graphql api fetch request
 */
export type FetchUserAndReposResponseDataFromAPI = {
  data: {
    user: null | User
  };
  errors: [
    {
      message: string;
      path: string;
      type: string;
      locations: [
        {
          line: number;
          column: number;
        }
      ];
    }
  ];
}