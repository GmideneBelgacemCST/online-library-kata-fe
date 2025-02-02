import { renderHook, act } from "@testing-library/react";
import { useRegister } from "../hooks/useRegister";
import { registerUser } from "../services/usersService";
import { vi } from "vitest";
import { BrowserRouter } from "react-router-dom";

// ✅ Mock `registerUser`
vi.mock("../services/usersService", () => ({
    registerUser: vi.fn(),
}));

// ✅ Wrap hook inside Router
const renderHookWithRouter = (hook) => {
    return renderHook(hook, {
        wrapper: ({ children }) => <BrowserRouter>{children}</BrowserRouter>,
    });
};

describe("useRegister Hook", () => {
    it("✅ initializes with empty form data and no notifications", () => {
        const { result } = renderHookWithRouter(() => useRegister());

        expect(result.current.formData.username).toBe("");
        expect(result.current.notification.message).toBe("");
        expect(result.current.loading).toBe(false);
    });

    it("✅ updates form data", () => {
        const { result } = renderHookWithRouter(() => useRegister());

        act(() => {
            result.current.handleChange({ target: { name: "username", value: "testUser" } });
            result.current.handleChange({ target: { name: "email", value: "test@example.com" } });
        });

        expect(result.current.formData.username).toBe("testUser");
        expect(result.current.formData.email).toBe("test@example.com");
    });

    it("✅ handles successful registration", async () => {
        registerUser.mockResolvedValueOnce({ success: true });

        const { result } = renderHookWithRouter(() => useRegister());

        await act(async () => {
            await result.current.handleSubmit({ preventDefault: () => {} });
        });

        expect(result.current.notification.message).toBe("Registration successful!");
    });

    it("✅ handles failed registration", async () => {
        registerUser.mockRejectedValueOnce(new Error("Registration failed"));

        const { result } = renderHookWithRouter(() => useRegister());

        await act(async () => {
            await result.current.handleSubmit({ preventDefault: () => {} });
        });

        expect(result.current.notification.message).toBe("Registration failed");
    });
});
