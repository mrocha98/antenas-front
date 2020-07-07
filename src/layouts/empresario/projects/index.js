import React from 'react';
import { MdAddCircle, MdNewReleases } from 'react-icons/md';
import Page from '../../../components/Page';
import PaperMenu from '../../../components/PaperMenu';
import ProjectCreation from '../../../components/ProjectCreation';
import CheckProject from './checkProject';

export default function Projects() {
  const tabs = [
    { icon: <MdAddCircle size={21} />, label: 'Criar' },
    { icon: <MdNewReleases size={21} />, label: 'Acompanhar' },
  ];

  const panels = [
    { content: <ProjectCreation /> },
    { content: <CheckProject /> },
  ];

  return (
    <Page title="Projetos">
      <PaperMenu tabs={tabs} panels={panels} />
    </Page>
  );
}
