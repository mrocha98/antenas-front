import React from 'react';
import { MdAddCircle, MdPersonAdd } from 'react-icons/md';
import { FaMedal } from 'react-icons/fa';
import Page from '../../../components/Page';
import PaperMenu from '../../../components/PaperMenu';
import MedalCreation from '../../../components/MedalCreation';
import MedalAttribution from '../../../components/MedalAttribution';
import Vinculation from './vinculation';

export default function Profile() {
  const tabs = [
    { icon: <MdAddCircle />, label: 'Criar medalha' },
    { icon: <FaMedal />, label: 'Atribuir medalha' },
    { icon: <MdPersonAdd />, label: 'Vincular alunos' },
  ];

  const panels = [
    { content: <MedalCreation /> },
    { content: <MedalAttribution /> },
    { content: <Vinculation /> },
  ];

  return (
    <Page title="Projetos">
      <PaperMenu tabs={tabs} panels={panels} />
    </Page>
  );
}
