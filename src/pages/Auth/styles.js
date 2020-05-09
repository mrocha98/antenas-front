import styled from 'styled-components';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  TextField,
  Button,
  Divider,
} from '@material-ui/core';
import { grayscale } from 'polished';
import { Page as GlobalPageStyle } from '../../styles/page';
import bgImage from '../../assets/images/rain-blur.jpg';

export const Page = styled(GlobalPageStyle)`
  margin: 0;
  padding: 0 !important;
  position: relative;
`;

export const Background = styled.div`
  background-image: url(${bgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  filter: blur(6px);
  height: 100vh;
  width: 100vw;
`;

export const Container = styled.article`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 10%;
  transform: translateY(-10%);
  width: 100%;
`;

export const MCard = styled(Card)`
  margin-top: 1.5rem;
  width: 80%;

  @media (min-width: 768px) {
    width: 60%;
  }

  @media (min-width: 1280px) {
    width: 25%;
  }
`;

export const MCardContent = styled(CardContent)``;

export const MCardActions = styled(CardActions)``;

export const MTypography = styled(Typography)`
  color: ${grayscale('#666')};
`;

export const Title = styled(Typography)`
  text-shadow: 3px 3px 6px black;
  color: #fcfaf9;
`;

export const FormContainer = styled.section`
  padding: 2rem;
`;

export const Form = styled.form``;

export const Field = styled.div`
  margin-bottom: 1rem;

  &:last-child {
    margin-bottom: 0;
  }

  &:nth-last-child(2) {
    margin-bottom: 2.5rem;
  }
`;

export const MTextField = styled(TextField).attrs(() => ({
  fullWidth: true,
  variant: 'outlined',
}))``;

export const MButton = styled(Button)`
  width: ${({ type }) => (type === 'submit' ? '100%' : 'auto')};
  z-index: 10;

  &.link {
    margin-top: 1rem;
  }
`;

export const MDivider = styled(Divider).attrs(() => ({
  variant: 'middle',
}))``;
