import styled from 'styled-components';
import { Container, Modal } from '@bootstrap-styled/v4';

export const CardContainer = styled(Container)`
  margin-top: 50px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;

  &&&& > svg {
    margin: 10px;
  }
`;

export const EditTodoModal = styled(Modal)`
  &&&& input {
    width: 415px;
  }
`;
