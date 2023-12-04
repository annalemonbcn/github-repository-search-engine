declare global {
  interface Array<T> {
    toSorted(compareFn?: (a: T, b: T) => number): T[];
  }
}

/** REPOSITORIES TYPES  */
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

export type RepositoryTopics = {
  topic: {
    name: string;
  };
  url: string;
};

/**
 * Response ok from graphql api
 */
export type RepositoriesReponseFromAPI = {
  data: {
    user: {
      repositories: {
        nodes: Repo[];
        pageInfo: PageInfo;
      };
    };
  };
};

/**
 * Response ko from graphql api
 */
export type ErrorRepositoriesResponseFromAPI = {
  data: {
    user: null
  }
  errors: [
    {
      message: string;
      path: string;
      type: string;
      locations: [
        {
          line: number;
          column: number;
        },
      ];
    },
  ]
}

type pageInfo = {
  endCursor: string;
  hasNextPage: boolean;
  startCursor: string;
  hasPreviousPage: boolean;
};

/**
 * What fetchRepos() returns if res.ok
 */
export type FetchReposResult = {
  repos: Repo[];
  hasNextPage: boolean;
  nextCursor: string;
};



/** USER TYPES */
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
};

/**
 * Response from graphql api, even if its ok or ko
 */
export type UserResponseDataFromAPI = {
  data: {
    user: User;
  };
  errors?: [
    {
      type: string;
      path: string[];
      locations: {
        line: number;
        column: number;
      };
      message: string;
    },
  ];
};