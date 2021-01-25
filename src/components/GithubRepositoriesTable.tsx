import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Box } from '@material-ui/core';
import StarRoundedIcon from '@material-ui/icons/StarRounded';
import RestaurantIcon from '@material-ui/icons/Restaurant';
import { GithubRepository } from '../types/github-types';

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    height: '100%',
  },
  table: {
    height: '100%',
    tableLayout: 'fixed',
  },
  startIcon: {
    marginRight: theme.spacing(1),
    color: 'orange',
  },
  forkIcon: {
    marginRight: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

interface Props {
  repositories: GithubRepository[];
}

export const GithubRepositoriesTable: React.FC<Props> = ({ repositories }) => {
  const classes = useStyles();
  return (
    <Box height="100%">
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <StarRoundedIcon className={classes.startIcon} />
                  Stars
                </Box>
              </TableCell>
              <TableCell>
                <Box display="flex" alignItems="center">
                  <RestaurantIcon className={classes.forkIcon} />
                  Forks
                </Box>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {repositories.map((row, index) => (
              <TableRow key={`${row.name}_${index}`}>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <StarRoundedIcon className={classes.startIcon} />
                    {row.stars}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box display="flex" alignItems="center">
                    <RestaurantIcon className={classes.forkIcon} />
                    {row.forks}
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!repositories.length && (
          <Box pt={10} pb={10} textAlign="center">
            No repositories no show
          </Box>
        )}
      </TableContainer>
    </Box>
  );
};
