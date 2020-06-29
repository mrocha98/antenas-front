import React from 'react';
import { MdAddCircle, MdPersonAdd, MdBusinessCenter } from 'react-icons/md';
import Page from '../../../components/Page';
import PaperMenu from '../../../components/PaperMenu';
import MedalCreation from '../../../components/MedalCreation';
import MedalAttribution from '../../../components/MedalAttribution';
import ProjectAttribution from '../../../components/ProjectAttribution';

export default function Profile() {
  const tabs = [
    { icon: <MdAddCircle />, label: 'Criar medalha' },
    { icon: <MdPersonAdd />, label: 'Atribuir medalha' },
    { icon: <MdBusinessCenter />, label: 'Gerir projeto' },
  ];

  const panels = [
    { content: <MedalCreation /> },
    { content: <MedalAttribution /> },
    { content: <ProjectAttribution /> },
  ];

  return (
    <Page title="Projetos">
      <PaperMenu tabs={tabs} panels={panels} />
    </Page>
  );
}
