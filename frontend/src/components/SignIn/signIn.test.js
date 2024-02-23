import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthService from '../../services/AuthService/auth.service';
import SignIn from './signIn';

jest.mock('../../services/AuthService/auth.service', () => ({
  loginUser: jest.fn(),
}));

describe('SignIn', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders login form', async () => {
    const { container } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('submits form with user input and logs in successfully', async () => {
    AuthService.loginUser.mockResolvedValueOnce({
      user_image: { url: 'user_image_url' },
      user_description: { email: 'test@example.com', is_admin: false },
    });

    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText('Escribe aqui tu correo');
    const passwordInput = getByPlaceholderText('Escribe aqui tu contraseña');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    const submitButton = getByText('Enter');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(AuthService.loginUser).toHaveBeenCalledWith('dGVzdEBleGFtcGxlLmNvbTpwYXNzd29yZA==');
    });
  });

  it('handles login error', async () => {
    AuthService.loginUser.mockRejectedValueOnce(new Error('Authentication failed'));

    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>
    );

    const emailInput = getByPlaceholderText('Escribe aqui tu correo');
    const passwordInput = getByPlaceholderText('Escribe aqui tu contraseña');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    const submitButton = getByText('Enter');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(AuthService.loginUser).toHaveBeenCalledWith('dGVzdEBleGFtcGxlLmNvbTpwYXNzd29yZA==');
      expect(getByText('Authentication failed')).toBeInTheDocument();
    });
  });
});
