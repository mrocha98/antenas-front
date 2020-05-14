import React from 'react';
import { Typography } from '@material-ui/core';
import './styles.scss';

function AuthForm({ children, title, onSubmit, ...rest }) {
  return (
    <>
      <Typography variant="h5" component="h2" className="title">
        {title}
      </Typography>
      <section className="form-container">
        <form onSubmit={onSubmit} {...rest}>
          {children}
        </form>
      </section>
    </>
  );
}

export default AuthForm;
