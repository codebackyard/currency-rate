import styled from 'styled-components';
import CardUI from '@material-ui/core/Card';
import TextFieldUI from '@material-ui/core/TextField';

export const Card = styled(CardUI)`
  max-width: 360px;
  min-width: 300px;
`;

export const CardHeader = styled.div`
  padding: 15px;
  padding-bottom: 0;
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100vh;

  @media (min-width: 960px) {
    padding: 10px;
  }
`;

export const TextField = styled(TextFieldUI)`
  width: 100%;
`;

export const FormRow = styled.div`
  padding: 15px;
`;
