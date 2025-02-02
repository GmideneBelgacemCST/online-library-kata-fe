import { renderHook, act } from "@testing-library/react";
import { useLogin } from "../hooks/useLogin";
import { useAuth } from "../hooks/useAuth";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom"; // ✅ Wrap test in a Router

// ✅ Mock `useAuth`
vi.mock("../hooks/useAuth", () => ({
    useAuth: vi.fn(() => ({
        login: vi.fn(), // ✅ Ensure `login` is defined
    })),
}));

// ✅ Wrap hook inside Router
const renderHookWithRouter = (hook) => {
    return renderHook(hook, {
        wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });
};

describe("useLogin Hook", () => {
    it("✅ initializes with empty username, password, and no notification", () => {
        const { result } = renderHookWithRouter(() => useLogin());

        expect(result.current.username).toBe("");
        expect(result.current.password).toBe("");
        expect(result.current.notification.message).toBe("");
        expect(result.current.loading).toBe(false);
    });

    it("✅ updates username and password", () => {
        const { result } = renderHookWithRouter(() => useLogin());

        act(() => {
            result.current.setUsername("john_doe");
            result.current.setPassword("password123");
        });

        expect(result.current.username).toBe("john_doe");
        expect(result.current.password).toBe("password123");
    });

    it("✅ handles successful login", async () => {
        const mockLogin = vi.fn().mockResolvedValueOnce();
        useAuth.mockReturnValue({ login: mockLogin });

        const { result } = renderHookWithRouter(() => useLogin());

        await act(async () => {
            await result.current.handleLogin({ preventDefault: () => {} });
        });

        expect(result.current.notification.message).toBe("Login successful!");
    });

    it("✅ handles failed login", async () => {
        const mockLogin = vi.fn().mockRejectedValueOnce(new Error("Invalid credentials"));
        useAuth.mockReturnValue({ login: mockLogin });

        const { result } = renderHookWithRouter(() => useLogin());

        await act(async () => {
            await result.current.handleLogin({ preventDefault: () => {} });
        });

        expect(result.current.notification.message).toBe("Invalid credentials");
    });
});
