import React from "react"; // ✅ Ensure React is imported
import { renderHook, act } from "@testing-library/react";
import { useLogin } from "../hooks/useLogin";
import { useAuth, AuthProvider } from "../hooks/useAuth";
import {describe, it, vi, expect} from "vitest";
import { BrowserRouter } from "react-router-dom";

vi.mock("../hooks/useAuth", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...actual,
        useAuth: vi.fn(() => ({
            isAuthenticated: false,
            user: null,
            login: vi.fn(),
            logout: vi.fn(),
            loading: false,
        })),
    };
});

const renderHookWithProviders = (hook) => {
    return renderHook(hook, {
        wrapper: ({ children }) => (
            <BrowserRouter>
                <AuthProvider>{children}</AuthProvider>
            </BrowserRouter>
        ),
    });
};

describe("useLogin Hook", () => {
    it("initializes with empty username, password, and no notification", () => {
        const { result } = renderHookWithProviders(() => useLogin());

        expect(result.current.username).toBe("");
        expect(result.current.password).toBe("");
        expect(result.current.notification.message).toBe("");
        expect(result.current.loading).toBe(false);
    });

    it("updates username and password", () => {
        const { result } = renderHookWithProviders(() => useLogin());

        act(() => {
            result.current.setUsername("john_doe");
            result.current.setPassword("password123");
        });

        expect(result.current.username).toBe("john_doe");
        expect(result.current.password).toBe("password123");
    });

    it("handles successful login", async () => {
        const mockLogin = vi.fn().mockResolvedValueOnce({ username: "john_doe" });
        useAuth.mockReturnValue({ ...useAuth(), login: mockLogin });

        const { result } = renderHookWithProviders(() => useLogin());

        await act(async () => {
            await result.current.handleLogin({ preventDefault: () => {} });
        });

        expect(result.current.notification.message).toBe("Login successful!");
        expect(mockLogin).toHaveBeenCalled();
    });

    it("handles failed login", async () => {
        const mockLogin = vi.fn().mockRejectedValueOnce(new Error("Invalid credentials"));
        useAuth.mockReturnValue({ ...useAuth(), login: mockLogin });

        const { result } = renderHookWithProviders(() => useLogin());

        await act(async () => {
            await result.current.handleLogin({ preventDefault: () => {} });
        });

        expect(result.current.notification.message).toBe("Invalid credentials.");
    });
});
