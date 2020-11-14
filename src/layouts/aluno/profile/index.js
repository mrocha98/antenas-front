import React from 'react';
import Container from '@material-ui/core/Container';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Typography from '@material-ui/core/Typography';
import { MdExpandMore } from 'react-icons/md';
import Page from '../../../components/Page';
import MedalCardList from '../../../components/MedalCardList';
import './styles.scss';

export default function Profile() {
  return (
    <Page title="Perfil" className="page--aluno">
      <Accordion
        TransitionProps={{ unmountOnExit: true }}
        className="expand-panel"
      >
        <AccordionSummary expandIcon={<MdExpandMore />}>
          <Typography>Medalhas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Container maxWidth={false} disableGutters>
            <MedalCardList />
          </Container>
        </AccordionDetails>
      </Accordion>
    </Page>
  );
}
