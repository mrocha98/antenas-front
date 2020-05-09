import React from 'react';
import { Typography } from '@material-ui/core';
import './styles.scss';

function AuthForm({ children, title }) {
  return (
    <>
      <Typography variant="h5" component="h2" className="title">
        {title}
      </Typography>
      <section className="form-container">
        <form>{children}</form>
      </section>
    </>
  );
}

export default AuthForm;
