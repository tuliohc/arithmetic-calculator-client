import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { signOut } from '../../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useBalance } from '../../../contexts/BalanceProvider';
import Header from './Header';

// Mock the necessary hooks and functions
jest.mock('../../../api/auth');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));
jest.mock('../../../contexts/BalanceProvider', () => ({
  useBalance: jest.fn(),
}));

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header buttons and calls navigate when clicked', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useBalance as jest.Mock).mockReturnValue({ balance: '1000' });

    const { getByText } = render(
      <Router>
        <Header />
      </Router>
    );

    const calculatorButton = getByText('CALCULATOR');
    fireEvent.click(calculatorButton);
    expect(mockNavigate).toHaveBeenCalledWith('/calculator');

    const recordsButton = getByText('RECORDS');
    fireEvent.click(recordsButton);
    expect(mockNavigate).toHaveBeenCalledWith('/records-list');
  });

  it('calls signOut when sign out button is clicked', async () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useBalance as jest.Mock).mockReturnValue({ balance: '1000' });

    const { getByText } = render(
      <Router>
        <Header />
      </Router>
    );

    const signOutButton = getByText('Sign out');
    fireEvent.click(signOutButton);

    expect(signOut).toHaveBeenCalledTimes(1);
  });

  it('displays formatted balance from BalanceContext', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    (useBalance as jest.Mock).mockReturnValue({ balance: '1000' });
  
    const { getByText } = render(
      <Router>
        <Header />
      </Router>
    );
  
    expect(getByText('$1000.00')).toBeInTheDocument();
  });
  
});
