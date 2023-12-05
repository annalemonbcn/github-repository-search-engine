export const fetchReposQuery = (
  username: string,
  nextCursor?: string | null
) => `
  {
    user(login: "${username}") {
      repositories(
        first: 10,
        after: ${nextCursor ? `"${nextCursor}"` : null},      
        orderBy: {
          field: UPDATED_AT,
          direction: DESC
        }
      ) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
        }
        nodes {
          name
          description
          id
          url
          primaryLanguage {
            name
          }
          updatedAt
          stargazerCount
          repositoryTopics(first: 5) {
            nodes {
              topic {
                name
              }
              url
            }
          }
        }
      }
    }
  }
`;

export const fetchUserQuery = (username: string) => `
  {
    user(login: "${username}") {
      avatarUrl
      login
      url
      bio
      followers {
        totalCount
      }
      following {
        totalCount
      }
      email
      public_repositories: repositories(privacy: PUBLIC) {
        totalCount
      }
      twitterUsername
      createdAt
    }
  }
`;

export const fetchUserAndReposQuery = (
  username: string,
  nextCursor?: string | null
) => {
  return `
  {
    user(login: "${username}") {
      avatarUrl
      login
      url
      bio
      followers {
        totalCount
      }
      following {
        totalCount
      }
      email
      public_repositories: repositories(privacy: PUBLIC) {
        totalCount
      }
      twitterUsername
      createdAt
      repositories(
        first: 10,
        after: ${nextCursor ? `"${nextCursor}"` : null}, 
        orderBy: {
          field: UPDATED_AT,
          direction: DESC
        }
      ) {
        totalCount
        pageInfo {
          endCursor
          hasNextPage
          startCursor
          hasPreviousPage
        }
        nodes {
          name
          description
          id
          url
          primaryLanguage {
            name
          }
          updatedAt
          stargazerCount
          repositoryTopics(first: 5) {
            nodes {
              topic {
                name
              }
              url
            }
          }
        }
      }
    }
  }
  `;
};
