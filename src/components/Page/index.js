import React from 'react';
import Typography from '@material-ui/core/Typography';
import './styles.scss';

function Page({ children = null, title = '', className = '' }) {
  return (
    <article className={`page ${className}`}>
      <Typography compoennt="h1" variant="h2" className="page-title">
        {title}
      </Typography>
      {children}
    </article>
  );
}

export default Page;
