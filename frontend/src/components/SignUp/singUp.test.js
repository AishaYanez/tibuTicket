import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AuthService from '../../services/AuthService/auth.service';
import SignUp from './signUp';

jest.mock('../../services/AuthService/auth.service', () => ({
  createAccount: jest.fn(),
}));

describe('SignUp', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders sign up form', async () => {
    const { container } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(container.firstChild).toBeInTheDocument();
    });
  });

  it('submits form with user input and signs up successfully', async () => {
    AuthService.createAccount.mockResolvedValueOnce({
      data: { status: { message: 'Account created successfully' } },
    });

    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const nicknameInput = getByPlaceholderText('Pon tu nombre y apellidos');
    const emailInput = getByPlaceholderText('Escribe aqui tu correo');
    const passwordInput = getByPlaceholderText('Escribe aqui tu contraseña');

    fireEvent.change(nicknameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    const submitButton = getByText('Enter');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(AuthService.createAccount).toHaveBeenCalledWith('dGVzdEBleGFtcGxlLmNvbTpwYXNzd29yZA==', expect.any(FormData));
      expect(getByText('Account created successfully')).toBeInTheDocument();
    });
  });

  it('handles sign up error', async () => {
    AuthService.createAccount.mockRejectedValueOnce(new Error('Failed to create account'));

    const { getByText, getByPlaceholderText } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    const nicknameInput = getByPlaceholderText('Pon tu nombre y apellidos');
    const emailInput = getByPlaceholderText('Escribe aqui tu correo');
    const passwordInput = getByPlaceholderText('Escribe aqui tu contraseña');

    fireEvent.change(nicknameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    const submitButton = getByText('Enter');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(AuthService.createAccount).toHaveBeenCalledWith('dGVzdEBleGFtcGxlLmNvbTpwYXNzd29yZA==', expect.any(FormData));
      expect(getByText('Failed to create account')).toBeInTheDocument();
    });
  });
});
