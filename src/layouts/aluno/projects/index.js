import React from 'react';

import { FaGithubAlt } from 'react-icons/fa';
import Page from '../../../components/Page';
import PaperMenu from '../../../components/PaperMenu';
import Delivery from './delivery';

function Projects() {
  const tabs = [{ icon: <FaGithubAlt size={21} />, label: 'Entregas' }];

  const panels = [
    {
      content: <Delivery />,
    },
  ];

  return (
    <Page title="Projetos">
      <PaperMenu tabs={tabs} panels={panels} />
    </Page>
  );
}

export default Projects;
