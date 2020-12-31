import { renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

describe('Should  render the application correctly', () => {
  beforeEach(() => {
    render(<App />);
  });
  describe('On first render', () => {
    test('should render prepopulated todos', () => {
      expect(screen.getByText('Get Groceries')).toBeInTheDocument();
      expect(screen.getByText('Take out trash')).toBeInTheDocument();
      expect(
        screen.getByText('Publish new version of project')
      ).toBeInTheDocument();
    });

    test('should have correct values in dropdown todo 1', () => {
      const renderedButton = screen.getByText('Get Groceries').parentElement
        .children[1].children[0];
      expect(renderedButton).toHaveTextContent('Not Complete');
    });

    test('should have correct values in dropdown todo 2', () => {
      const renderedButton = screen.getByText('Take out trash').parentElement
        .children[1].children[0];
      expect(renderedButton).toHaveTextContent('Complete');
    });

    test('should have correct values in dropdown todo 3', () => {
      const renderedButton = screen.getByText('Publish new version of project')
        .parentElement.children[1].children[0];
      expect(renderedButton).toHaveTextContent('Not Complete');
    });

    test('should find correct number of delete icons', () => {
      expect(screen.getAllByTitle('Delete').length).toEqual(3);
    });

    test('should find correct number of edit icons', () => {
      expect(screen.getAllByTitle('Edit').length).toEqual(3);
    });

    test('should render add todo button disabled', () => {
      expect(screen.getByText('Add Todo')).toHaveClass('disabled');
    });

    test('should render add todo input with no value', () => {
      expect(screen.getByPlaceholderText('Add todo here')).toHaveValue('');
    });
  });

  describe('When Adding a todo', () => {
    test('should enable Add todo button after typing in add todo input', async () => {
      const addTodoInput = screen.getByPlaceholderText('Add todo here');
      await userEvent.type(addTodoInput, 'My Brand New Todo');
      expect(addTodoInput).toHaveValue('My Brand New Todo');
      expect(screen.getByText('Add Todo')).not.toHaveClass('disabled');
    });

    test('should disable Add todo button after typing in add todo input and clearing', async () => {
      const addTodoInput = screen.getByPlaceholderText('Add todo here');
      await userEvent.type(addTodoInput, 'My Brand New Todo');
      expect(addTodoInput).toHaveValue('My Brand New Todo');
      expect(screen.getByText('Add Todo')).not.toHaveClass('disabled');
      await userEvent.clear(addTodoInput);
      expect(screen.getByText('Add Todo')).toHaveClass('disabled');
    });

    test('should add new todo to view', async () => {
      const addTodoInput = screen.getByPlaceholderText('Add todo here');
      await userEvent.type(addTodoInput, 'My Brand New Todo');
      expect(addTodoInput).toHaveValue('My Brand New Todo');
      const todoBtn = screen.getByText('Add Todo');
      expect(todoBtn).not.toHaveClass('disabled');

      await userEvent.click(todoBtn);
      expect(screen.getByPlaceholderText('Add todo here')).toHaveValue('');
      expect(screen.getByText('My Brand New Todo')).toBeInTheDocument();
      const dropdownBtn = screen.getByText('My Brand New Todo').parentElement
        .children[1].children[0];
      expect(dropdownBtn).toHaveTextContent('Not Complete');
    });
  });

  describe('When Editing a todo', () => {
    test('should open edit todo modal when edit icon clicked', async () => {
      const editTodoOneIcon = screen.getAllByTitle('Edit')[0];
      await userEvent.click(editTodoOneIcon);
      expect(screen.getByText('Edit Todo')).toBeInTheDocument();
    });

    test('should open edit todo modal when edit icon clicked with correct todo text populated', async () => {
      const editTodoOneIcon = screen.getAllByTitle('Edit')[0];
      await userEvent.click(editTodoOneIcon);
      expect(screen.getByText('Edit Todo')).toBeInTheDocument();
      expect(screen.getAllByPlaceholderText('Add todo here')[1]).toHaveValue(
        'Get Groceries'
      );
    });

    test('should open edit todo modal when edit icon clicked with save changes button disabled', async () => {
      const editTodoOneIcon = screen.getAllByTitle('Edit')[0];
      await userEvent.click(editTodoOneIcon);
      expect(screen.getByText('Edit Todo')).toBeInTheDocument();
      expect(screen.getAllByPlaceholderText('Add todo here')[1]).toHaveValue(
        'Get Groceries'
      );
      expect(screen.getByText('Save Changes')).toHaveClass('disabled');
    });

    test('should enable save changes button when changes are made', async () => {
      const editTodoOneIcon = screen.getAllByTitle('Edit')[0];
      await userEvent.click(editTodoOneIcon);
      await userEvent.type(
        screen.getAllByPlaceholderText('Add todo here')[1],
        ' For Dinner'
      );
      expect(screen.getByText('Save Changes')).not.toHaveClass('disabled');
    });

    test('should disable save changes button when changes are made and then reverted', async () => {
      const editTodoOneIcon = screen.getAllByTitle('Edit')[0];
      await userEvent.click(editTodoOneIcon);
      const editInput = screen.getAllByPlaceholderText('Add todo here')[1];
      await userEvent.type(editInput, ' For Dinner');
      expect(screen.getByText('Save Changes')).not.toHaveClass('disabled');
      await userEvent.clear(editInput);
      await userEvent.type(editInput, 'Get Groceries');
      expect(screen.getByText('Save Changes')).toHaveClass('disabled');
    });

    test('should update view when todo updated', async () => {
      const editTodoOneIcon = screen.getAllByTitle('Edit')[0];
      await userEvent.click(editTodoOneIcon);
      const editInput = screen.getAllByPlaceholderText('Add todo here')[1];
      await userEvent.type(editInput, ' For Dinner');
      const saveBtn = screen.getByText('Save Changes');
      expect(saveBtn).not.toHaveClass('disabled');
      await userEvent.click(saveBtn);
      await waitFor(() => expect(screen.queryByText('Edit Todo')).toBeFalsy());
      expect(screen.getByText('Get Groceries For Dinner')).toBeInTheDocument();
    });
  });

  describe('When deleting a todo', () => {
    test('should remove todo from view', async () => {
      const deleteBtnOne = screen.getAllByTitle('Delete')[0];
      await userEvent.click(deleteBtnOne);
      expect(screen.queryByText('Get Groceries')).toBeFalsy();
    });
  });

  describe('When modifying the complete status', () => {
    test('should open dropdown when button clicked', async () => {
      const dropdownBtnOne = screen.getAllByText('Not Complete')[0];
      expect(screen.queryAllByRole('menu').length).toEqual(0);
      await userEvent.click(dropdownBtnOne);
      expect(screen.queryAllByRole('menu').length).toEqual(1);
    });

    test('should change text selection when dropdown is clicked', async () => {
      const dropdownBtnOne = screen.getAllByText('Not Complete')[0];
      expect(screen.queryAllByRole('menu').length).toEqual(0);
      expect(screen.getAllByText('Not Complete').length).toEqual(2);
      await userEvent.click(dropdownBtnOne);
      expect(screen.queryAllByRole('menu').length).toEqual(1);
      await userEvent.click(screen.queryAllByRole('menu')[0].children[0]);
      expect(screen.getAllByText('Not Complete').length).toEqual(1);
    });
  });
});
