import React from 'react';
import { Card as MCard, CardContent } from '@material-ui/core';

function AuthCard({ children }) {
  return (
    <MCard>
      <CardContent>{children}</CardContent>
    </MCard>
  );
}

export default AuthCard;
