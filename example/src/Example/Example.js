import React from 'react';
import { Container } from '@bootstrap-styled/v4';

import { useMappedState } from 'react-use-mapped-state';
import { TodoCard } from './Card';
import { CardContainer } from './styled-components';
import { TodoInput } from './todoInput';

const getUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const startingState = [
  [
    'todos',
    [
      { title: 'Get Groceries', isCompleted: false, id: getUUID() },
      { title: 'Take out trash', isCompleted: true, id: getUUID() },
      {
        title: 'Publish new version of project',
        isCompleted: false,
        id: getUUID(),
      },
    ],
  ],
];

const Example = () => {
  const [{ todos }, setState] = useMappedState(startingState);

  const addTodo = title => {
    setState(
      'todos',
      [{ title, isCompleted: false, id: getUUID() }].concat([...todos])
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

  const editTodo = (id, title) => {
    setState('todos', prevTodos => {
      const toEditIdx = prevTodos.findIndex(t => t.id === id);
      const copyTodos = [...prevTodos];
      copyTodos.splice(toEditIdx, 1, { ...prevTodos[toEditIdx], title });
      return copyTodos;
    });
  };
  const deleteTodo = id => {
    setState('todos', prevTodos => {
      const toRemoveIdx = prevTodos.findIndex(t => t.id === id);
      const copyTodos = [...prevTodos];
      copyTodos.splice(toRemoveIdx, 1);
      return copyTodos;
    });
  };

  return (
    <>
      <Container>
        <TodoInput isEditing={false} onSubmit={addTodo} />
      </Container>
      <CardContainer>
        {todos.map((todo, idx) => {
          return (
            <TodoCard
              key={idx}
              index={idx}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
              assignCompleteStatus={modifyCompletedState}
              {...todo}
            />
          );
        })}
      </CardContainer>
    </>
  );
};

export default Example;
