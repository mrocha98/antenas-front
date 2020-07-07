import React from 'react';
import { MdGavel, MdEvent } from 'react-icons/md';
import Page from '../../../components/Page';
import PaperMenu from '../../../components/PaperMenu';
import Approval from './approval';

function Projects() {
  const tabs = [
    { icon: <MdGavel size={21} />, label: 'Aprovações' },
    { icon: <MdEvent size={21} />, label: 'Reuniões' },
  ];

  const panels = [
    {
      content: <Approval />,
    },
    {
      content: <div>reuniões</div>,
    },
  ];

  return (
    <Page title="Projetos">
      <PaperMenu tabs={tabs} panels={panels} />
    </Page>
  );
}

export default Projects;
