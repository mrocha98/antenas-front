import React from 'react';
import Container from '@material-ui/core/Container';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import { MdExpandMore } from 'react-icons/md';
import Page from '../../../components/Page';
import MedalCardList from '../../../components/MedalCardList';
import './styles.scss';

export default function Profile() {
  return (
    <Page title="Perfil" className="page--aluno">
      <ExpansionPanel
        TransitionProps={{ unmountOnExit: true }}
        className="expand-panel"
      >
        <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
          <Typography>Medalhas</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Container maxWidth={false} disableGutters>
            <MedalCardList />
          </Container>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Page>
  );
}
