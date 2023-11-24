export const query = `
    {
      user(login: "midudev") {
        repositories(
          first: 10,      
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
    }`;