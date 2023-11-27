export const fetchReposQuery = (nextCursor?: string | null) => `
{
  user(login: "annalemonbcn") {
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
