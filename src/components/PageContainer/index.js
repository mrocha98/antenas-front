import React from 'react';
import './styles.scss';

function PageContainer({ children }) {
  return (
    <article className="page page--auth">
      <div className="container">{children}</div>
    </article>
  );
}

export default PageContainer;
