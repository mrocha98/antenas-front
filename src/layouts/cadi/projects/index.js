import React from 'react';
import { MdGavel } from 'react-icons/md';
import Page from '../../../components/Page';
import PaperMenu from '../../../components/PaperMenu';
import Approval from './approval';

function Projects() {
  const tabs = [{ icon: <MdGavel size={21} />, label: 'Aprovações' }];

  const panels = [
    {
      content: <Approval />,
    },
  ];

  return (
    <Page title="Projetos">
      <PaperMenu tabs={tabs} panels={panels} />
    </Page>
  );
}

export default Projects;
