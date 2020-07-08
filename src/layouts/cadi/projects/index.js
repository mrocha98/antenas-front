import React from 'react';
import { MdGavel, MdInsertLink } from 'react-icons/md';
import Page from '../../../components/Page';
import PaperMenu from '../../../components/PaperMenu';
import Approval from './approval';
import Vinculation from './vinculation';

function Projects() {
  const tabs = [
    { icon: <MdGavel size={21} />, label: 'Aprovações' },
    { icon: <MdInsertLink size={21} />, label: 'Vinculação de Professor' },
  ];

  const panels = [
    {
      content: <Approval />,
    },
    {
      content: <Vinculation />,
    },
  ];

  return (
    <Page title="Projetos">
      <PaperMenu tabs={tabs} panels={panels} />
    </Page>
  );
}

export default Projects;
