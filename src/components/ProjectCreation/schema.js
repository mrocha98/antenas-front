import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().trim().required('Campo obrigatório'),
  quickDescription: yup.string().trim().required('Campo obrigatório'),
  linkOne: yup.string().trim().required('Campo obrigatório'),
});

export default schema;
