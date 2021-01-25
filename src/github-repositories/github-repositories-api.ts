import { gql, GraphQLClient } from 'graphql-request';
import { ENV } from '../env-config';

const graphQLClient = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    authorization: `Bearer ${ENV.REACT_APP_GITHUB_TOKEN}`,
  },
});

export interface RepositoriesRequest {
  query: string;
  first: number;
}

export interface RepositoriesResponse {
  search: {
    nodes: {
      name: string;
      forkCount: number;
      stargazerCount: number;
    }[];
  };
}

export const fetchRepositories = (params: RepositoriesRequest) => {
  return graphQLClient.request<RepositoriesResponse, RepositoriesRequest>(
    gql`
      query Search($query: String!, $first: Int) {
        search(query: $query, type: REPOSITORY, first: $first) {
          repositoryCount
          nodes {
            ... on Repository {
              name
              forkCount
              stargazerCount
            }
          }
        }
      }
    `,
    params,
  );
};
