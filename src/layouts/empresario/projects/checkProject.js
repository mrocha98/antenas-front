import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import InputLabel from '@material-ui/core/InputLabel';
import ProjectView from '../../../components/ProjectView';
import Field from '../../../components/Field';
import { arrayToOptions } from '../../../helpers/ReactSelectHelper';
import { useAuth } from '../../../contexts/auth';
import UserTypes from '../../../utils/UserTypes';
import api from '../../../services/api';

function CheckProject() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState('');
  const { getUserInfo } = useAuth();
  const { email } = JSON.parse(getUserInfo());

  const handleProjectChange = (option) => setSelectedProject(option?.value);

  useEffect(() => {
    async function loadProjects() {
      const req = await api.post('/graphql', {
        query: `{
          ProjectsByOwner(email: "${email}", type: ${UserTypes.EMPRESARIO}) {
            _id
            title
          }
        }`,
      });
      const { ProjectsByOwner } = req.data.data;
      const options = arrayToOptions({
        array: ProjectsByOwner,
        labelKey: 'title',
      });
      setProjects(options);
    }
    loadProjects();
  }, [email]);

  return (
    <section>
      <Field>
        <InputLabel>Projeto</InputLabel>
        <Select
          isClearable
          options={projects}
          onChange={handleProjectChange}
          placeholder="Selecionar projeto"
        />
      </Field>
      {selectedProject && <ProjectView projectId={selectedProject} />}
    </section>
  );
}

export default CheckProject;
