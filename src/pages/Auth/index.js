import React from 'react';
import {
  Page,
  Background,
  Container,
  MCard,
  MCardContent,
  MTypography,
  Title,
  FormContainer,
  Form,
  MTextField,
  Field,
  MButton,
  MDivider,
} from './styles';

function Auth() {
  return (
    <Page>
      <Background />
      <Container>
        <Title variant="h2" component="h1">
          Antenas
        </Title>
        <MCard>
          <MCardContent>
            <MTypography variant="h5" component="h2">
              Autentique-se
            </MTypography>
            <FormContainer>
              <Form>
                <Field>
                  <MTextField required label="E-mail" type="email" autoFocus />
                </Field>
                <Field>
                  <MTextField required label="Senha" type="password" />
                </Field>
                <Field>
                  <MButton
                    variant="contained"
                    color="primary"
                    type="submit"
                    size="large"
                    onClick={() => window.alert('ronaldo')}
                  >
                    Confirmar
                  </MButton>
                </Field>
              </Form>
            </FormContainer>
            <MDivider />
            <MButton color="primary" className="link">
              Criar conta
            </MButton>
          </MCardContent>
        </MCard>
      </Container>
    </Page>
  );
}

export default Auth;
