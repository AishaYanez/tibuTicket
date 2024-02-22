import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthService from '../../services/AuthService/auth.service';
import SignUp from './signUp';

describe('SinUp', () => {
it('renders login form', async () => {
  const {container} =render(
    <MemoryRouter>
      <SignUp />
      </MemoryRouter>);

  await waitFor(() => {
  expect(container.firstChild).toBeInTheDocument();

  });
});
});