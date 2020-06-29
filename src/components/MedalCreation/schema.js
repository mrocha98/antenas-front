import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Campo obrigatório!'),
  description: yup.string().required('Campo obrigatório!'),
  type: yup.string().required('Campo obrigatório!'),
});

export default schema;
