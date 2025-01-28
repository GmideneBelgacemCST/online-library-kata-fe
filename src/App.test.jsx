import { render, screen } from '@testing-library/react';
import React from 'react';
import App from './App.js'
import { MemoryRouter } from 'react-router-dom';

jest.mock("./domains/users/pages/RegisterPage", () => () => <div>Register Page</div>);
jest.mock("./domains/users/pages/LoginPage", () => () => <div>Login Page</div>);
jest.mock("./components/HomePage", () => () => <div>Home Page</div>);

describe("App Component", () => {
  test("redirects from `/` to `/register`", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Register Page/i)).toBeInTheDocument();
  });

  test("renders RegisterPage for `/register`", () => {
    render(
      <MemoryRouter initialEntries={["/register"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Register Page/i)).toBeInTheDocument();
  });

  test("renders LoginPage for `/login`", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });

  test("renders HomePage for `/home`", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });

  test("renders 404 page for unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/unknown-page"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/404 - Page Not Found/i)).toBeInTheDocument();
  });
});