import React, { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import CircularProgess from '@material-ui/core/CircularProgress';
import InputLabel from '@material-ui/core/InputLabel';
import Field from '../Field';
import api from '../../services/api';

function ProjectStatus({ projectId }) {
  const [status, setStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorFromServer, setErrorFromServer] = useState(false);
  const [waitingForAproval, setWaitingForAproval] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    async function loadData() {
      try {
        const req = await api.post('/graphql', {
          query: `{
            projectById(id: "${projectId}") {
              state {
                aproved,
                reason
              }
            }
          }`,
        });
        const { state } = req.data.data.projectById;

        if (state) {
          const [lastItem] = state.slice(-1);
          const { aproved, reason } = lastItem;
          setStatus({ aproved, reason, error: false });
        } else {
          setWaitingForAproval(true);
        }
      } catch {
        setErrorFromServer(true);
      }
    }
    loadData().finally(() => setIsLoading(false));

    return () => {
      setStatus({});
      setWaitingForAproval(false);
      setErrorFromServer(false);
    };
  }, [projectId]);

  const chooseSeverity = () => {
    if (errorFromServer) return 'error';
    if (waitingForAproval || isLoading) return 'info';
    return status.aproved ? 'success' : 'warning';
  };

  const chooseTitle = () => {
    if (errorFromServer) return 'Erro';
    if (waitingForAproval) return 'Aguardando aprovação';
    return status.aproved ? 'Aprovado' : 'Reprovado';
  };

  return (
    <Field>
      <InputLabel>Status</InputLabel>
      {isLoading ? (
        <CircularProgess color="secondary" />
      ) : (
        <Alert variant="outlined" severity={chooseSeverity()}>
          <AlertTitle>{chooseTitle()}</AlertTitle>
          <span>
            {errorFromServer
              ? 'Não foi possível buscar os dados no servidor!'
              : status.reason}
          </span>
        </Alert>
      )}
    </Field>
  );
}

export default ProjectStatus;
