import styled from 'styled-components';

export const Page = styled.div`
  @media only screen and (max-width: 600px) {
    margin: 0;
    padding-bottom: 8rem;
  }

  align-items: center;
  display: flex;
  flex-direction: column;
  margin-left: 5rem;
  padding: 1rem;
  text-align: center;

  p {
    align-self: flex-start;
    text-align: justify;
  }
`;
