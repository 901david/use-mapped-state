import React from 'react';
import {
  Card,
  CardBlock,
  CardTitle,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ModalHeader,
  ModalBody,
} from '@bootstrap-styled/v4';
import { useMappedState } from 'react-use-mapped-state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EditTodoModal, IconWrapper } from './styled-components';
import { TodoInput } from './todoInput';

const todoCardStartingState = [
  ['isDropdownOpen', false],
  ['isEditing', false],
  ['editingItem', null],
];

export const TodoCard = ({
  assignCompleteStatus,
  index,
  title,
  id,
  isCompleted,
  editTodo,
  deleteTodo,
}) => {
  const [{ isDropdownOpen, isEditing, editingItem }, setState] = useMappedState(
    todoCardStartingState
  );

  const toggleDropdown = () => setState('isDropdownOpen', prevVal => !prevVal);
  const toggleModal = () => setState('isEditing', prevVal => !prevVal);

  const handleAssignment = status => {
    assignCompleteStatus(status, index);
    toggleDropdown();
  };

  const onEdit = (id, value) => {
    setState(['editingItem', 'isEditing'], [{ id, title: value }, true]);
  };

  const onSubmit = title => {
    editTodo(id, title);
    setState(['isEditing', 'editingItem'], [false, null]);
  };

  return (
    <>
      <Card>
        <IconWrapper>
          <FontAwesomeIcon
            title='Delete'
            onClick={() => deleteTodo(id)}
            icon={faTrash}
          />
          <FontAwesomeIcon
            title='Edit'
            onClick={() => onEdit(id, title)}
            icon={faPencilAlt}
          />
        </IconWrapper>
        <CardBlock>
          <CardTitle>{title}</CardTitle>
          <Dropdown isOpen={isDropdownOpen} toggle={toggleDropdown}>
            <DropdownToggle caret>
              {isCompleted ? 'Completed' : 'Not Complete'}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={() => handleAssignment(true)}>
                Completed
              </DropdownItem>
              <DropdownItem onClick={() => handleAssignment(false)}>
                Not Completed
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardBlock>
      </Card>
      <EditTodoModal isOpen={isEditing} toggle={toggleModal}>
        <ModalHeader>Edit Todo</ModalHeader>
        <ModalBody>
          <TodoInput
            isEditing={true}
            value={editingItem && editingItem.title}
            onSubmit={onSubmit}
          />
        </ModalBody>
      </EditTodoModal>
    </>
  );
};
