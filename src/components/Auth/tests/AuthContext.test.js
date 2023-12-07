import { render, screen, waitFor, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AuthContext, { AuthProvider, useAuth } from '../AuthContext'; // Assuming AuthProvider and useAuth are exported
import authService from '../../services/authService'; // Import your authService

// Mock authService functions
jest.mock('../../services/authService');

describe('AuthContext', () => {
  // Clear mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('provides authentication context and hooks', async () => {
    // Mock the login function to resolve with a token
    authService.login.mockResolvedValue('mocked-token');

    const TestComponent = () => {
      const { login, token } = useAuth();

      const handleLogin = async () => {
        try {
          // Update the login function invocation to match the new signature
          await login('mocked-token');
        } catch (error) {
          // Handle errors if needed
        }
      };

      return (
        <div>
          <span data-testid="token">{token}</span>
          {/* Add data-testid to the button */}
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

    // Use act to ensure all state updates are processed
    await act(async () => {
      // Click the login button using fireEvent
      fireEvent.click(screen.getByTestId('login-button'));
    });

    // Wait for the assertions to pass
    await waitFor(() => {
      // Assert that the authService.login function was called with the expected arguments
      // Update the assertion to match the actual implementation of the login function
      expect(authService.login).toHaveBeenCalledWith('mocked-token');

      expect(authService.login).toHaveBeenCalledTimes(1); // Ensure it's called exactly once

      // Example: Assert that the token is updated after login
      expect(screen.getByTestId('token').textContent).toBe('mocked-token');
    });
  });
});
