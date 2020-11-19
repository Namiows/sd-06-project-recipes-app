import React from 'react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './services/renderWithRouter';
import App from '../App';
import { fireEvent } from '@testing-library/react';

describe('A tela de Login: ', () => {
  it('deve ter um input de email', () => {
    const { getByPlaceholderText } = renderWithRouter(<App />);
    const emailInput = getByPlaceholderText('E-mail');
    expect(emailInput).toBeInTheDocument();
  });

  it('deve ter um input de senha', () => {
    const { getByPlaceholderText } = renderWithRouter(<App />);
    const passwordInput = getByPlaceholderText('Password');
    expect(passwordInput).toBeInTheDocument();
  });

  it('deve ter um botão para entrar', () => {
    const { getByRole } = renderWithRouter(<App />);
    const loginButton = getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeInTheDocument();
  });

  it('deve ter o botão habilitado com email e senha validos', () => {
    const { getByRole, getByPlaceholderText } = renderWithRouter(<App />);
    const loginButton = getByRole('button', { name: /entrar/i });
    expect(loginButton).toBeDisabled();
    const emailInput = getByPlaceholderText('E-mail');
    const passwordInput = getByPlaceholderText('Password');
    fireEvent.change(emailInput, { target: { value: 'mariano@google.com' } });
    fireEvent.change(passwordInput, { target: { value: '1234567' } });
    expect(loginButton).not.toBeDisabled();
    fireEvent.change(emailInput, { target: { value: 'mariano@google' } });
    expect(loginButton).toBeDisabled();
    fireEvent.change(emailInput, { target: { value: 'mariano@google.com' } });
    fireEvent.change(passwordInput, { target: { value: '123456' } });
    expect(loginButton).toBeDisabled();
  });
});
