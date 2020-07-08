import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { MdExpandMore } from 'react-icons/md';
import ReunionField from '../ReunionField';
import ProjectStatus from '../ProjectStatus';
import Field from '../Field';
import ProjectStep from '../ProjectStep';
import PopUp from '../PopUp';
import Steps from '../../utils/Step';
import api from '../../services/api';
import './styles.scss';

export default function ProjectView({
  projectId,
  isEditable = false,
  defaultExpanded = true,
}) {
  const { register, reset, handleSubmit } = useForm();
  const [projectStep, setProjectStep] = useState({});
  const isNotFirstStep = projectStep.level > 0;
  const [projectUpdated, setProjectUpdated] = useState({
    display: false,
    message: '',
    severity: '',
  });

  useEffect(() => {
    async function loadData() {
      const req = await api.post('/graphql', {
        query: `{
          projectById(id: "${projectId}") {
            productOwner
            linkOne
            linkTwo
            title
            quickDescription
            fullDescription
            techDescription
            step
            reunion {
              place
              possibleDate
            }
          }
        }`,
      });
      const { projectById } = req.data.data;

      const parsedStep = Steps.find(
        (step) => step.level === Number(projectById.step)
      );
      setProjectStep(parsedStep);

      reset({ ...projectById });
    }
    if (projectId) loadData();
  }, [projectId, reset]);

  const onSubmit = async (data, event) => {
    event.preventDefault();

    const { level } = projectStep;
    const step = level <= 2 ? level + 1 : level;

    const {
      quickDescription,
      fullDescription,
      techDescription,
      linkOne,
      linkTwo,
      reunion: { place, possibleDate },
    } = data;

    try {
      await api.post('/graphql', {
        query: `mutation {
          updateProject(_id: "${projectId}", quickDescription: "${quickDescription}", fullDescription: "${fullDescription}", techDescription: "${techDescription}" linkOne: "${linkOne}", linkTwo: "${linkTwo}" reunion: { place: "${place}", possibleDate: "${possibleDate}" }, step: "${step}") {
            _id
          }
        }`,
      });
      setProjectUpdated({
        display: true,
        message: 'Operação efetuada com sucesso!',
        severity: 'success',
      });
    } catch (err) {
      setProjectUpdated({
        display: true,
        message: err.response.data.errors[0].message,
        severity: 'error',
      });
    }
  };

  const onClosePopUp = () =>
    setProjectUpdated((oldData) => {
      return { ...oldData, display: false };
    });

  return (
    <section className="project-view">
      <ExpansionPanel defaultExpanded={defaultExpanded}>
        <ExpansionPanelSummary expandIcon={<MdExpandMore />}>
          <Typography>Informações</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <form
            className="project-view__info"
            onSubmit={handleSubmit(onSubmit)}
          >
            <PopUp
              display={projectUpdated.display}
              severity={projectUpdated.severity}
              message={projectUpdated.message}
              onClose={onClosePopUp}
            />
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
                readOnly={!isEditable}
              />
            </Field>
            <Field>
              <InputLabel>Breve descrição</InputLabel>
              <OutlinedInput
                name="quickDescription"
                inputRef={register}
                multiline
                fullWidth
                readOnly={!isEditable}
              />
            </Field>
            <Field>
              <InputLabel>E-mail do P.O.</InputLabel>
              <OutlinedInput
                name="productOwner"
                inputRef={register}
                type="email"
                fullWidth
                readOnly={!isEditable}
              />
            </Field>
            {isNotFirstStep && (
              <>
                <Field>
                  <InputLabel>Descrição completa</InputLabel>
                  <OutlinedInput
                    name="fullDescription"
                    inputRef={register}
                    multiline
                    fullWidth
                    readOnly={!isEditable}
                  />
                </Field>
                <Field>
                  <InputLabel>Descrição tecnológica</InputLabel>
                  <OutlinedInput
                    name="techDescription"
                    inputRef={register}
                    multiline
                    fullWidth
                    readOnly={!isEditable}
                  />
                </Field>
                <Field>
                  <InputLabel>Link #2</InputLabel>
                  <OutlinedInput
                    name="linkTwo"
                    inputRef={register}
                    fullWidth
                    readOnly={!isEditable}
                  />
                </Field>
                <Field>
                  <ReunionField register={register} isEditable={isEditable} />
                </Field>
                {isEditable && (
                  <Field applyHugeDistance>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="button-submit"
                    >
                      Confirmar
                    </Button>
                  </Field>
                )}
              </>
            )}
          </form>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </section>
  );
}
