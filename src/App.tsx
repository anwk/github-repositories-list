import React from 'react';
import { Box, CircularProgress, Input, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDebounce } from 'use-debounce/lib';
import { GithubRepositoriesTable } from './components/GithubRepositoriesTable';
import { hooks } from './github-repositories';

export const App: React.FC = () => {
  const [searchInput, setSearchInput] = React.useState<string>('');
  const [debouncedSearchInput] = useDebounce(searchInput, 500);

  const { data, isLoading, status, error } = hooks.useGithubRepositories({ query: debouncedSearchInput, first: 50 });
  return (
    <Box>
      <Box textAlign="center">
        <Typography variant="h2" color="primary">
          Github Repositories
        </Typography>
      </Box>
      <Box width="80%" m="auto">
        <Box mt={3} mb={2}>
          <Box width={300}>
            <Input
              placeholder="Search repository..."
              fullWidth
              value={searchInput}
              onChange={({ target }) => setSearchInput(target.value)}
            />
          </Box>
        </Box>
        <Box width="100%" height={500} display="flex" justifyContent="center" alignItems="center">
          {isLoading && <CircularProgress size={70} />}
          {data && <GithubRepositoriesTable repositories={data} />}
          {status === 'error' && <Alert severity="error">{error?.message}</Alert>}
        </Box>
      </Box>
    </Box>
  );
};
