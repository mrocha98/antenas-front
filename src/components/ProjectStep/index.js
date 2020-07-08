import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';

function ProjectStep({ step = 0, title = '' }) {
  return (
    <>
      <InputLabel>Etapa</InputLabel>
      <Card raised>
        <CardHeader avatar={<Avatar>{step + 1}</Avatar>} title={title} />
      </Card>
    </>
  );
}

export default ProjectStep;
