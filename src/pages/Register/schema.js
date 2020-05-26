import * as yup from 'yup';
import UserTypes from '../../utils/UserTypes';

const schema = yup.object().shape({
  name: yup.string().trim().required('Nome é obrigatório'),
  email: yup
    .string()
    .trim()
    .email('Não esqueça do @ e do domínio')
    .required('E-Mail é obrigatório'),
  password: yup.string().trim().required('Senha é obrigatória'),
  type: yup
    .number()
    .typeError('Escolha um tipo de usuário')
    .integer()
    .oneOf(Object.values(UserTypes)),
  position: yup.string().when('type', {
    is: UserTypes.CADI,
    then: yup.string().required('Cargo é obrigatório'),
  }),
  company: yup.string().when('type', {
    is: UserTypes.EMPRESARIO,
    then: yup.string().required('Nome da empresa é obrigatório'),
  }),
  cnpj: yup.string().when('type', {
    is: UserTypes.EMPRESARIO,
    then: yup.string().required('CNPJ é obrigatório'),
  }),
});

export default schema;
