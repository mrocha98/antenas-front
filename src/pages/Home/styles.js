import styled from 'styled-components';

export const Container = styled.div`
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
