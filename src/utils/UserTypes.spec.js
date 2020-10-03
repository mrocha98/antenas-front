import UserTypes from './UserTypes';

describe('utils/UserTypes', () => {
  it('should return correctly values for each user type', () => {
    const expectedValueForEmpresario = 1;
    const expectedValueForCadi = 2;
    const expectedValueForAluno = 3;
    const expectedValueForProfessor = 4;

    expect(UserTypes.EMPRESARIO).toEqual(expectedValueForEmpresario);
    expect(UserTypes.CADI).toEqual(expectedValueForCadi);
    expect(UserTypes.ALUNO).toEqual(expectedValueForAluno);
    expect(UserTypes.PROFESSOR).toEqual(expectedValueForProfessor);
  });
});
