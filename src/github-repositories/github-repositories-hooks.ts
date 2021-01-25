import { useQuery } from 'react-query';
import { GithubRepository } from '../types/github-types';
import { fetchRepositories, RepositoriesRequest, RepositoriesResponse } from './github-repositories-api';

export const processResponse = (res: RepositoriesResponse): GithubRepository[] =>
  res.search.nodes.map(({ name, stargazerCount, forkCount }) => ({
    name,
    stars: stargazerCount,
    forks: forkCount,
  }));

export const useGithubRepositories = (params: RepositoriesRequest) => {
  return useQuery<GithubRepository[], Error>(
    ['github-repositories', params],
    async () => processResponse(await fetchRepositories({ ...params, query: `${params.query} in:name is:public` })),
    { keepPreviousData: true, refetchOnWindowFocus: false },
  );
};
