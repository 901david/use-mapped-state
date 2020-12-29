import React from 'react';
import {
  Card,
  CardBlock,
  CardTitle,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from '@bootstrap-styled/v4';
import { useMappedState } from 'react-use-mapped-state';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTrash } from '@fortawesome/free-solid-svg-icons';

const todoCardStartingState = [['isDropdownOpen', false]];

export const TodoCard = ({
  assignCompleteStatus,
  index,
  title,
  isCompleted,
}) => {
  const [{ isDropdownOpen }, setState] = useMappedState(todoCardStartingState);

  const toggle = () => setState('isDropdownOpen', prevVal => !prevVal);

  const handleAssignment = status => {
    assignCompleteStatus(status, index);
    toggle();
  };

  return (
    <Card>
      <FontAwesomeIcon icon={faTrash} />
      <FontAwesomeIcon icon={faPencilAlt} />
      <CardBlock>
        <CardTitle>{title}</CardTitle>
        <Dropdown isOpen={isDropdownOpen} toggle={toggle}>
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
  );
};
