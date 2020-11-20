import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter'
import Login from './Pages/Login'
import App from './App'

describe('2 - Crie todos os elementos que devem respeitar os atributos descritos no protótipo para a tela de login', () => {
  it('Tem os data-testids email-input, password-input e login-submit-btn', () => {
    const { getByTestId } = render(<Login/>);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });
});

describe('3 - Desenvolva a tela de maneira que a pessoa deve conseguir escrever seu email no input de email', () => {
  it('É possível escrever o email', () => {
    const { getByTestId } = render(<Login/>);
    const emailInput = getByTestId('email-input');

    fireEvent.change(emailInput, { target: { value: 'email@email.com' } })
    expect(emailInput.value).toBe('email@email.com')
  });
});

describe('4 - Desenvolva a tela de maneira que a pessoa deve conseguir escrever sua senha no input de senha', () => {
  it('É possível escrever a senha', () => {
    const { getByTestId } = render(<Login/>);
    const passwordInput = getByTestId('password-input');

    fireEvent.change(passwordInput, { target: { value: '123456' } })
    expect(passwordInput.value).toBe('123456')
  });
});

describe('5 - Desenvolva a tela de maneira que o formulário só seja válido após um email válido e uma senha de mais de 6 caracteres serem preenchidos', () => {
  it('O botão deve estar desativado se o email for inválido', () => {
    const { getByTestId, getByText } = render(<Login/>);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');

    expect(button).toBeDisabled();

    fireEvent.change(emailInput, { target: { value: 'emailemail.com' } })
    fireEvent.change(passwordInput, { target: { value: '1234567' } })

    expect(button).toBeDisabled();
  });

  it('O botão deve estar desativado se a senha deve tiver 6 caracteres ou menos', () => {
    const { getByTestId, getByText } = render(<Login/>);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'email@email.com' } })
    fireEvent.change(passwordInput, { target: { value: '1234' } })

    expect(button).toBeDisabled();
  });

  it('O botão deve estar ativado se o email e a senha forem válidos', () => {
    const { getByTestId, getByText } = render(<Login/>);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'email@email.com' } })
    fireEvent.change(passwordInput, { target: { value: '12345678' } })

    expect(button).not.toBeDisabled();
  });
});

describe('6 - Salve 2 tokens no localStorage após a submissão, identificados pelas chaves mealsToken e cocktailsToken', () => {
  afterEach(() => { 
    
    localStorage.clear()
  });
  it('Após a submissão mealsToken e cocktailsToken devem estar salvos em localStorage', () => {
    
    const { getByTestId } = render(<App/>);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'email@email.com' } })
    fireEvent.change(passwordInput, { target: { value: '12345678' } })
    fireEvent.click(button)

    expect(localStorage.getItem('mealsToken')).toBe("1");
    expect(localStorage.getItem('cocktailsToken')).toBe("1");
    cleanup()
  });

});

describe('7 - Salve o e-mail da pessoa usuária no localStorage na chave user após a submissão', () => {
  afterEach(() => { 

  it('Após a submissão a chave user deve estar salva em localStorage', () => {
    const { getByTestId } = render(<App/>);
    const emailInput = getByTestId('email-input');
    const passwordInput = getByTestId('password-input');
    const button = getByTestId('login-submit-btn');

    fireEvent.change(emailInput, { target: { value: 'email@email.com' } })
    fireEvent.change(passwordInput, { target: { value: '12345678' } })
    fireEvent.click(button)

    const user = JSON.parse(localStorage.getItem('user'))

    expect(user.email).toBe(emailInput.value);
    });
  });

// });

// describe('8 - Redirecione a pessoa usuária para a tela principal de receitas de comidas após a submissão e validação com sucesso do login', () => {
//   it('A rota muda para a tela principal de receitas de comidas', () => {
//     cy.visit('http://localhost:3000/', {
//       onBeforeLoad(win) {
//         win.localStorage.clear();
//       },
//     });

//     cy.get('[data-testid="login-submit-btn"]').should('be.disabled');
//     cy.window().then((win) => {
//       expect(win.localStorage.getItem('user')).to.be.null;
//     });


//     cy.get('[data-testid="email-input"]').type('email@mail.com');
//     cy.get('[data-testid="password-input"]').type('1234567');
//     cy.get('[data-testid="login-submit-btn"]').click();

//     cy.location().should((loc) => expect(loc.pathname).to.eq('/comidas'));

//     cy.window().then((win) => {
//       win.localStorage.clear();
//     });
//   });
// });
