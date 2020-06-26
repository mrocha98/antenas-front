import React from 'react';
import { MdAddCircle, MdNewReleases } from 'react-icons/md';
import Typography from '@material-ui/core/Typography';
import PaperMenu from '../../../components/PaperMenu';
import ProjectCreation from '../../../components/ProjectCreation';
import ProjectView from '../../../components/ProjectView';

export default function Projects() {
  const tabs = [
    { icon: <MdAddCircle size={21} />, label: 'Criar' },
    { icon: <MdNewReleases size={21} />, label: 'Acompanhar' },
  ];

  const panels = [
    { content: <ProjectCreation /> },
    { content: <ProjectView /> },
  ];

  return (
    <article className="page">
      <Typography component="h1" variant="h2">
        Projetos
      </Typography>
      <PaperMenu tabs={tabs} panels={panels} />
    </article>
  );
}
