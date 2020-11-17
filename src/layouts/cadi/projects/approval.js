import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import Field from '../../../components/Field';
import ProjectView from '../../../components/ProjectView';
import ProjectApproval from '../../../components/ProjectApproval';
import api from '../../../services/api';
import { arrayToOptions } from '../../../helpers/ReactSelectHelper';
import UserTypes from '../../../utils/UserTypes';

function Approval() {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [selectedProject, setSelectedProject] = useState('');

  const handleUserChange = (option) => {
    setSelectedUser(option?.value);
    setSelectedProject('');
  };

  const handleProjectChange = (option) => setSelectedProject(option?.value);

  useEffect(() => {
    async function loadUsers() {
      const req = await api.post('/graphql', {
        query: `{
          users(type: ${UserTypes.EMPRESARIO}) {
            name
            email
          }
        }`,
      });
      const { users: usersList } = req.data.data;
      const options = arrayToOptions({
        array: usersList,
        labelKey: 'name',
        valueKey: 'email',
      });
      setUsers(options);
    }
    loadUsers();
  }, []);

  useEffect(() => {
    async function loadProjects() {
      const req = await api.post('/graphql', {
        query: `{
          ProjectsByOwner(email: "${selectedUser}", type: ${UserTypes.EMPRESARIO}) {
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
    if (selectedUser) loadProjects();
  }, [selectedUser]);

  return (
    <Container maxWidth="xl" disableGutters>
      <Field>
        <InputLabel>Empresário</InputLabel>
        <Select
          name="empresario"
          instanceId="empresario"
          isClearable
          options={users}
          onChange={handleUserChange}
          placeholder="Selecionar empresário"
          noOptionsMessage={() => 'Sem resultados...'}
        />
      </Field>
      {selectedUser && (
        <>
          <Field>
            <InputLabel>Projeto</InputLabel>
            <Select
              name="project"
              instanceId="project"
              isClearable
              options={projects}
              onChange={handleProjectChange}
              placeholder="Selecionar projeto"
              noOptionsMessage={() =>
                'Esse empresário não possui projetos cadastrados...'
              }
            />
          </Field>
          {selectedProject && (
            <>
              <Field>
                <ProjectView
                  projectId={selectedProject}
                  isEditable={false}
                  defaultExpanded={false}
                />
              </Field>
              <Field>
                <ProjectApproval projectId={selectedProject} />
              </Field>
            </>
          )}
        </>
      )}
    </Container>
  );
}

export default Approval;
