import React from 'react';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from '@bootstrap-styled/v4';
import { useMappedState } from 'react-use-mapped-state';

export const TodoInput = ({ onSubmit, isEditing, value }) => {
  const startingState = [
    ['isDisabled', true],
    ['currentTodo', value || ''],
  ];
  const [{ isDisabled, currentTodo }, setState] = useMappedState(startingState);

  const handleTodoChange = evt => {
    const { value: userEnteredTodo } = evt.target;
    const shouldBeDisabled = isEditing
      ? userEnteredTodo === value
      : !userEnteredTodo;
    setState(
      ['currentTodo', 'isDisabled'],
      [userEnteredTodo, shouldBeDisabled]
    );
  };

  const onClickBtn = () => {
    onSubmit(currentTodo);
    setState(['currentTodo', 'isDisabled'], ['', true]);
  };

  return (
    <Col lg='12'>
      <Form>
        <FormGroup>
          <Label htmlFor='add-todo' />
          <Input
            value={currentTodo}
            onChange={handleTodoChange}
            id='add-todo'
            placeholder='Add todo here'
          />
        </FormGroup>
      </Form>
      <Button disabled={isDisabled} onClick={onClickBtn} color='primary'>
        {isEditing ? 'Save Changes' : 'Add Todo'}
      </Button>
    </Col>
  );
};
