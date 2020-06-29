import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
  container: {
    display: 'grid',
    height: '100vh',
    placeItems: 'center',
    width: '100vw',
    zIndex: '999',
  },
});

export default function GlobalCircularProgress() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <CircularProgress color="secondary" size="21rem" />
    </div>
  );
}
