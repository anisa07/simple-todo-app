import React from 'react';
import {render, screen} from '@testing-library/react';
import App from './App';
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  jest.mock('uuid', () => ({ v4: () => '1' }));
})
test('renders app component', () => {
  render(<App />);

  expect(screen.getByTestId('create-todo')).toBeInTheDocument();
  expect(screen.getByTestId('todo-list')).toBeInTheDocument();
  expect(screen.queryByTestId('delete-alert')).not.toBeInTheDocument();
});

test('create todo', async () => {
  render(<App />);

  expect(screen.queryByTestId('list-item')).not.toBeInTheDocument();
  await userEvent.type(screen.getByRole('textbox'), 'todo 1');
  await userEvent.click(screen.getByTestId('create-todo-btn'));
  expect(screen.getAllByTestId('list-item').length).toBe(1);
});

test('verify todo', async () => {
  render(<App />);

  await userEvent.type(screen.getByRole('textbox'), 'todo 2');
  await userEvent.click(screen.getByTestId('create-todo-btn'));
  await userEvent.click(screen.getByTestId('verify-todo-btn'));
  expect(screen.getByTestId('list-item').className).toBe('listItem verified');
});

test('delete todo', async () => {
  render(<App />);

  await userEvent.type(screen.getByRole('textbox'), 'todo 3');
  await userEvent.click(screen.getByTestId('create-todo-btn'));
  await userEvent.click(screen.getByTestId('delete-todo-btn'));
  expect(screen.getByTestId('delete-alert')).toBeInTheDocument();
  await userEvent.click(screen.getByTestId('approve-delete'));
  expect(screen.queryByTestId('list-item')).not.toBeInTheDocument();
  expect(screen.queryByTestId('delete-alert')).not.toBeInTheDocument();
});
