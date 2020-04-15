import styled from 'styled-components';

export const Container = styled.div`
  @media only screen and (max-width: 600px) {
    margin: 0;
  }
  margin-left: 5rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  &.ghost {
    width: 10%;
  }

  p {
    align-self: flex-start;
    text-align: justify;
  }
`;
