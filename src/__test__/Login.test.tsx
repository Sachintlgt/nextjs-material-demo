import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import Login from '../components/Login';
import userEvent from "@testing-library/user-event";
import { saveLocalStorageItem } from '@/utils/utility';

jest.mock('../utils/utility', () => ({
  saveLocalStorageItem: jest.fn(),
  getLocalStorageItem: jest.fn()
}));
const mockUsePathname = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => mockUsePathname,
}))

jest.mock('@mui/material', () => ({
  TextField: (props: any) => <input {...props} />,
  Typography: (props: any) => <div>{props.children}</div>,
  Button: (props: any) => <button {...props}></button>
}));


jest.mock('../components/DisplayAPIStatus', () => ({
  DisplayAPIStatus: (props: any) => (
    <div>
      {props.error && <div data-testid="api-error">{props.error}</div>}
      {props.message && <div data-testid="api-message">{props.message}</div>}
    </div>
  ),
}));

const MockedLogin = Login;

describe('Login Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the login form correctly', () => {
    render(<MockedLogin />);
    expect(screen.getByTestId('userName')).toBeInTheDocument();
    expect(screen.getByTestId('password')).toBeInTheDocument();
  });

  it('displays validation errors', async () => {
    render(<MockedLogin />);
    
    fireEvent.submit(screen.getByTestId('userName'));

    await waitFor(() => {
      expect(screen.getByTestId('userName')).toHaveAttribute('aria-invalid');
      expect(screen.getByTestId('password')).toHaveAttribute('aria-invalid');
    });
  });

  it('handles successful login', async () => {
    render(<MockedLogin />);
    const userEl = screen.getByTestId('userName');
    const passEl = screen.getByTestId('password');
    userEvent.type(userEl, "emilys");
    userEvent.type(passEl, "emilyspass");
    const btnEl = screen.getByTestId("btn");
    fireEvent.click(btnEl);
    saveLocalStorageItem('token', 'abc');
    expect(saveLocalStorageItem).toHaveBeenCalled()
  });
});
