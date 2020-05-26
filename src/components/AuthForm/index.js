import React from 'react';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  formContainer: {
    textAlign: 'left',
    padding: '2rem',
  },
  formTitle: {
    textShadow: '3px 3px 4px black',
  },
});

function AuthForm({ children, title, onSubmit, ...rest }) {
  const classes = useStyles();
  return (
    <>
      <Typography
        variant="h5"
        component="h2"
        align="center"
        className={classes.formTitle}
      >
        {title}
      </Typography>
      <section className={classes.formContainer}>
        <form onSubmit={onSubmit} {...rest}>
          {children}
        </form>
      </section>
    </>
  );
}

export default AuthForm;
