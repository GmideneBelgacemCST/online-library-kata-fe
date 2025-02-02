import { renderHook, act } from "@testing-library/react";
import { useRegister } from "../hooks/useRegister";
import { registerUser } from "../services/usersService";
import {describe, vi,expect,it} from "vitest";
import { BrowserRouter } from "react-router-dom";
import {AuthProvider} from "../hooks/useAuth";
import React from "react";

// ✅ Mock `registerUser`
vi.mock("../services/usersService", () => ({
    registerUser: vi.fn(),
}));

// ✅ Wrap hook inside Router
const renderHookWithRouter = (hook) => {
    return renderHook(hook, {
        wrapper: ({ children }) => <BrowserRouter> <AuthProvider>{children}</AuthProvider></BrowserRouter>,
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
            result.current.handleChange({ target: { name: "password", value: "securePass123" } });
            result.current.handleChange({ target: { name: "name", value: "Test User" } });
            result.current.handleChange({ target: { name: "phone", value: "1234567890" } });
        });

        console.log("Updated formData:", result.current.formData);

        expect(result.current.formData.username).toBe("testUser");
        expect(result.current.formData.email).toBe("test@example.com");
        expect(result.current.formData.password).toBe("securePass123");
        expect(result.current.formData.name).toBe("Test User");
        expect(result.current.formData.phone).toBe("1234567890");
    });

    it("✅ handles successful registration", async () => {
        registerUser.mockResolvedValueOnce({ success: true });

        const { result } = renderHookWithRouter(() => useRegister());
        act(() => {
            result.current.handleChange({ target: { name: "username", value: "testUser" } });
            result.current.handleChange({ target: { name: "email", value: "test@example.com" } });
            result.current.handleChange({ target: { name: "password", value: "securePass123" } });
            result.current.handleChange({ target: { name: "name", value: "Test User" } });
            result.current.handleChange({ target: { name: "phone", value: "1234567890" } });
        });
        await act(async () => {
            await result.current.handleSubmit({ preventDefault: () => {} });
        });

        expect(result.current.notification.message).toBe("Registration successful!");
    });

    it("✅ handles failed registration", async () => {
        registerUser.mockRejectedValueOnce(new Error("Registration failed"));

        const { result } = renderHookWithRouter(() => useRegister());
        act(() => {
            result.current.handleChange({ target: { name: "username", value: "testUser" } });
            result.current.handleChange({ target: { name: "email", value: "test@example.com" } });
            result.current.handleChange({ target: { name: "password", value: "securePass123" } });
            result.current.handleChange({ target: { name: "name", value: "Test User" } });
            result.current.handleChange({ target: { name: "phone", value: "1234567890" } });
        });
        await act(async () => {
            await result.current.handleSubmit({ preventDefault: () => {} });
        });

        expect(result.current.notification.message).toBe("Registration failed. Please try again.");
    });
});
