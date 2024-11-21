import React from 'react';
import { render } from '../src/utils/testUtil';
import userEvent from '@testing-library/user-event';
import { it, expect } from 'vitest';
import NewFlight from '../src/pages/Flights/NewFlight';

it('should have code and capacity input fields, flight departure date and create flight button not disabled', () => {
  const { getByLabelText, getByRole, getByText } = render(<NewFlight />);
  expect(getByLabelText('Code')).toBeVisible();
  expect(getByLabelText('Capacity')).toBeVisible();
  expect(
    getByRole('button', { name: /calendar icon select date/i }),
  ).toBeVisible();
  expect(getByText(/create flight/i)).toBeVisible();
});

it('should show appropriate error when fields are not filled correctly', async () => {
  const user = userEvent.setup();
  const { getByRole, getByText } = render(<NewFlight />);
  await user.click(getByText(/create flight/i));
  const codeErrorElement = getByText('Code is required');
  const capacityErrorElement = getByText('Capacity is required');
  const departureDateErrorElement = getByText(
    'Departure date must be a valid date!',
  );
  expect(codeErrorElement).toBeVisible();
  expect(capacityErrorElement).toBeVisible();
  expect(departureDateErrorElement).toBeVisible();
  const codeTextField = getByRole('textbox', { name: /code/i });
  const capacityTextField = getByRole('spinbutton', { name: /capacity/i });
  await user.type(codeTextField, 'we');
  expect(codeErrorElement).toHaveTextContent('Code must be exactly 6 letters');
  await user.type(codeTextField, 'qweddd');
  expect(codeErrorElement).not.toBeVisible();
  await user.type(codeTextField, 'qwedddad');
  expect(codeErrorElement).toHaveTextContent('Code must be exactly 6 letters');
  await user.type(capacityTextField, '22');
  expect(capacityErrorElement).not.toBeVisible();
  await user.click(getByText(/select date/i));
  await user.click(getByText('13'));
  expect(departureDateErrorElement).not.toBeVisible();
});
