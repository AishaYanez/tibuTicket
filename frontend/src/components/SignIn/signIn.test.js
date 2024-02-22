import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthService from '../../services/AuthService/auth.service';
import SignIn from './signIn';

describe('SinIn', () => {
  it('render login form', async () => {
    const { container } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>);

    await waitFor(() => {
      expect(container.firstChild).toBeInTheDocument();

    });
  });
});