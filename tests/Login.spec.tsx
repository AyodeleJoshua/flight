import React from 'react';
import { render } from '../src/utils/testUtil';
import userEvent from '@testing-library/user-event';
import { it, expect } from 'vitest';
import Login from '../src/pages/Auth/Login';

it('should have email, password input fields and submit button not disabled', () => {
  const { getByLabelText, getByRole } = render(<Login />);
  expect(getByLabelText('Email')).toBeInTheDocument();
  expect(getByLabelText('Password')).toBeInTheDocument();
  expect(getByRole('button')).toBeInTheDocument();
  expect(getByLabelText('Password')).not.toBeDisabled();
  expect(getByRole('button')).not.toBeDisabled();
  expect(getByLabelText('Email')).not.toBeDisabled();
});

it('should display error message when login button is clicked without filling email and password correctly', async () => {
  const user = userEvent.setup();
  const { getByText, getByRole, getByLabelText } = render(<Login />);
  await user.click(getByRole('button'));
  const emailTextField = getByLabelText('Email');
  const passwordErrorElement = getByText('Password is required');
  const emailErrorElement = getByText('Email is required');
  expect(passwordErrorElement).toBeVisible();
  expect(emailErrorElement).toBeVisible();
  await user.type(getByLabelText('Password'), '123456773');
  await user.type(emailTextField, 'joshua');
  expect(passwordErrorElement).not.toBeVisible();
  expect(emailErrorElement).toHaveTextContent('Email must be valid');
  await user.type(emailTextField, 'joshua@gmail.com');
  expect(emailErrorElement).not.toBeVisible();
});
