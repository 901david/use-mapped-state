import React from 'react';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CardDeck,
} from '@bootstrap-styled/v4';

import { useMappedState } from 'react-use-mapped-state';
import { TodoCard } from './Card';
import { CardContainer } from './styled-components';

const startingState = [
  ['isDisabled', true],
  ['currentTodo', ''],
  ['todos', [{ title: 'Test Todo', isCompleted: false }]],
];

const Example = () => {
  const [{ isDisabled, todos, currentTodo }, setState] = useMappedState(
    startingState
  );

  const handleTodoChange = evt => {
    const { value: userEnteredTodo } = evt.target;
    const shouldBeDisabled = !userEnteredTodo;
    setState(
      ['currentTodo', 'isDisabled'],
      [userEnteredTodo, shouldBeDisabled]
    );
  };

  const addCard = () => {
    setState(
      'todos',
      [{ title: currentTodo, isCompleted: false }].concat([...todos])
    );
  };

  const modifyCompletedState = (status, index) => {
    const newTodos = todos.map((todo, idx) => {
      if (index === idx) {
        return {
          ...todo,
          isCompleted: status,
        };
      }
      return todo;
    });
    setState('todos', newTodos);
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
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
            <Button disabled={isDisabled} onClick={addCard} color='primary'>
              Add Todo
            </Button>
          </Col>
        </Row>
      </Container>
      <CardContainer>
        <Row>
          <CardDeck>
            {todos.map((todo, idx) => {
              return (
                <TodoCard
                  key={idx}
                  index={idx}
                  assignCompleteStatus={modifyCompletedState}
                  {...todo}
                />
              );
            })}
          </CardDeck>
        </Row>
      </CardContainer>
    </>
  );
};

export default Example;
