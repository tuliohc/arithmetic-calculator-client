import { render, waitFor, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import SignIn from './SignIn';
import { signIn } from '../../api/auth';

jest.mock('../../api/auth');

const getFormElements = () => {
  const { getByTestId } = render(
    <BrowserRouter>
      <SignIn />
    </BrowserRouter>
  );
  const emailField = getByTestId('email-field')
  const passwordField = getByTestId('password-field')
  const signinButton = getByTestId('signin-button')
  return {
    emailField,
    passwordField,
    signinButton
  }
}

const simulateUserSignIn = () => {
  const { emailField, passwordField, signinButton } = getFormElements()

  act(() => {
    userEvent.type(emailField, 'test@example.com');
    userEvent.type(passwordField, 'testpassword');
    userEvent.click(signinButton);
  });
}

const mockSignIn = signIn as jest.MockedFunction<typeof signIn>;

describe('SignIn', () => {
  beforeEach(() => {
    mockSignIn.mockClear();
  });

  it('should render email and password fields and submit button', () => {
    const { emailField, passwordField, signinButton } = getFormElements()
    
    expect(emailField).toBeInTheDocument();
    expect(passwordField).toBeInTheDocument();
    expect(signinButton).toBeInTheDocument();
  });

  it('should show error message when sign-in fails', async () => {
    mockSignIn.mockRejectedValue(new Error('Sign-in failed'));

    simulateUserSignIn();

    await waitFor(() => expect(mockSignIn).toHaveBeenCalled());
    await waitFor(() => expect(screen.getByText(/Sign-in failed./i)).toBeInTheDocument());
  });

  it('should redirects to calculator page when sign-in is successful', async () => {
    mockSignIn.mockResolvedValue(undefined);

    simulateUserSignIn();

    await waitFor(() => expect(mockSignIn).toHaveBeenCalled());
    await waitFor(() => expect(window.location.pathname).toBe('/calculator'));
  });
});
