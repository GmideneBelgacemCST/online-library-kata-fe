import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App.js';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from './domains/users/hooks/useAuth.js';

jest.mock("./domains/users/pages/RegisterPage", () => {
  const RegisterPage = () => <div>Register Page</div>;
  RegisterPage.displayName = "RegisterPage"; 
  return RegisterPage;
});

jest.mock("./domains/users/pages/LoginPage", () => {
  const LoginPage = () => <div>Login Page</div>;
  LoginPage.displayName = "LoginPage"; 
  return LoginPage;
});

jest.mock("./components/HomePage", () => {
  const HomePage = () => <div>Home Page</div>;
  HomePage.displayName = "HomePage";
  return HomePage;
});

describe("App Component", () => {
  test("redirects from `/` to `/register`", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
         <AuthProvider>  
        <App />
         </AuthProvider>  
      </MemoryRouter>
    );
    expect(screen.getByText(/Register Page/i)).toBeInTheDocument();
  });

  test("renders RegisterPage for `/register`", () => {
    render(
      <MemoryRouter initialEntries={["/register"]}>
        <AuthProvider>  
        <App />
         </AuthProvider> 
      </MemoryRouter>
    );
    expect(screen.getByText(/Register Page/i)).toBeInTheDocument();
  });

  test("renders LoginPage for `/login`", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
         <AuthProvider>  
        <App />
         </AuthProvider> 
      </MemoryRouter>
    );
    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });

  test("renders HomePage for `/home`", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
         <AuthProvider>  
        <App />
         </AuthProvider> 
      </MemoryRouter>
    );
    screen.debug();
    expect(screen.getByText(/HomePage/i)).toBeInTheDocument();
  });

  test("renders 404 page for unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/unknown-page"]}>
         <AuthProvider>  
        <App />
         </AuthProvider> 
      </MemoryRouter>
    );
    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
  });
});
