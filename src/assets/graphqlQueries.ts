export const fetchReposQuery = (nextCursor?: string | null) => `
  {
    user(login: "midudev") {
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

export const fetchUserQuery = `
  {
    user(login: "midudev") {
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
