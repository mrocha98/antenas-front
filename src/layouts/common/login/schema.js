import * as yup from 'yup';

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .email('Não esqueça do @ e do domínio')
    .required('E-mail é obrigatório'),
  password: yup.string().required('Senha é obrigatória'),
});

export default schema;
