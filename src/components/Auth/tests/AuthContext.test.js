import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthContext, { AuthProvider, useAuth } from '../AuthContext'; 
import authService from '../../services/authService'; 


jest.mock('../../services/authService');

describe('AuthContext', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('provides authentication context and hooks', async () => {
   
    authService.login.mockResolvedValue('mocked-token');

    const TestComponent = () => {
      const { login, token } = useAuth();

      const handleLogin = async () => {
        try {
          
          await login('mocked-token');
        } catch (error) {
     
        }
      };

      return (
        <div>
          <span data-testid="token">{token}</span>
          
          <button data-testid="login-button" onClick={handleLogin}>
            Login
          </button>
        </div>
      );
    };

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

  
    await act(async () => {
     
      fireEvent.click(screen.getByTestId('login-button'));
    });

  
    await waitFor(() => {
  
      expect(authService.login).toHaveBeenCalledWith('mocked-token');

      expect(authService.login).toHaveBeenCalledTimes(1); 

    
      expect(screen.getByTestId('token').textContent).toBe('mocked-token');
    });
  });
});
