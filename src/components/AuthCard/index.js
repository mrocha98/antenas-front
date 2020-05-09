import React from 'react';
import { Card as MCard, CardContent } from '@material-ui/core';
import './styles.scss';

function AuthCard({ children }) {
  return (
    <MCard className="auth-card">
      <CardContent>{children}</CardContent>
    </MCard>
  );
}

export default AuthCard;
