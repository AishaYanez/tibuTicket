import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import AuthPage from './authPage';
import { MemoryRouter } from 'react-router-dom';
import AuthService from '../../services/AuthService/auth.service';

describe('AuthPage', () => {
it('renders login form', async () => {
  const {container} =render(
    <MemoryRouter>
      <AuthPage />
      </MemoryRouter>);

  await waitFor(() => {
  expect(container.firstChild).toBeInTheDocument();

  });
});
});