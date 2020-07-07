import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { MdExpandMore } from 'react-icons/md';
import ProjectStatus from '../ProjectStatus';
import Field from '../Field';
import ProjectStep from '../ProjectStep';
import Steps from '../../utils/Step';
import api from '../../services/api';
import './styles.scss';

export default function ProjectView({ projectId, defaultExpanded = true }) {
  const { register, reset } = useForm();
  const [projectStep, setProjectStep] = useState({});

  useEffect(() => {
    async function loadData() {
      const req = await api.post('/graphql', {
        query: `{
          projectById(id: "${projectId}") {
            productOwner,
            linkOne,
            title
            quickDescription,
            fullDescription,
            step
          }
        }`,
      });
      const { projectById } = req.data.data;
      const parsedStep = Steps.find(
        (step) => step.level === Number(projectById.step)
      );
      setProjectStep(parsedStep);
      delete projectById.step;
      reset({ ...projectById });
    }
    if (projectId) loadData();
  }, [projectId, reset]);

  return (
    <section className="project-view">
      <ExpansionPanel defaultExpanded={defaultExpanded}>
        <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
          <Typography>Informações</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className="project-view__info">
            <Field>
              <ProjectStep
                step={projectStep.level}
                title={projectStep.action}
              />
            </Field>
            <ProjectStatus projectId={projectId} />
            <Field>
              <InputLabel>Link #1</InputLabel>
              <OutlinedInput
                name="linkOne"
                inputRef={register}
                fullWidth
                readOnly
              />
            </Field>
            <Field>
              <InputLabel>Breve descrição</InputLabel>
              <OutlinedInput
                name="quickDescription"
                inputRef={register}
                multiline
                fullWidth
                readOnly
              />
            </Field>
            <Field>
              <InputLabel>E-mail do P.O.</InputLabel>
              <OutlinedInput
                name="productOwner"
                inputRef={register}
                type="email"
                fullWidth
                readOnly
              />
            </Field>
            <Field>
              <InputLabel>Descrição completa</InputLabel>
              <OutlinedInput
                name="fullDescription"
                inputRef={register}
                multiline
                fullWidth
                readOnly
              />
            </Field>
            <Field>
              <InputLabel>Descrição tecnológica</InputLabel>
              <OutlinedInput
                name="techDescription"
                inputRef={register}
                multiline
                fullWidth
                readOnly
              />
            </Field>
            <Field>
              <InputLabel>Link #2</InputLabel>
              <OutlinedInput
                name="linkTwo"
                inputRef={register}
                fullWidth
                readOnly
              />
            </Field>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </section>
  );
}
