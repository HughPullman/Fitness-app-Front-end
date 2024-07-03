import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, beforeEach, expect, it, afterEach } from "vitest";

import { loginService } from "../src/utils/user.service";
import Login from "../src/pages/Login/Login";

vi.mock("../src/utils/user.service.js");

describe("Login page tests", () => {
  beforeEach(() => {
    const routes = [
      {
        path: "/login",
        element: <Login />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/login"],
    });

    render(<RouterProvider router={router} />);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("should render Login on page load", () => {
    const title = screen.getByText(/User Login/i);
    expect(title).toBeInTheDocument();
  });

  it("should call login service with correct details on submit", async () => {
    loginService.mockReturnValue({
      status: 200,
    });

    const email = screen.getByPlaceholderText("Email");
    fireEvent.input(email, { target: { value: "TestEmail" } });
    const password = screen.getByPlaceholderText("Password");
    fireEvent.input(password, { target: { value: "TestPassword" } });

    await waitFor(async () => {
      const submitBtn = screen.getByText("Login");
      await userEvent.click(submitBtn);
    });

    expect(loginService).toHaveBeenCalledWith({
      email: "TestEmail",
      password: "TestPassword",
    });
  });

  it("should show the success modal when res is 200", async () => {
    loginService.mockReturnValue({
      status: 200,
      data: {
        email: "TestEmail",
        accessToken: "TestToken",
        id: "TestId",
      },
    });

    await waitFor(async () => {
      const submitBtn = screen.getByText("Login");
      await userEvent.click(submitBtn);
    });

    const successModal = screen.getByText("Logged in with TestEmail");
    expect(successModal).toBeInTheDocument();
  });

  it("should show the error modal otherwise", async () => {
    loginService.mockReturnValue({
      status: 400,
      response: {
        data: {
          error: "TestError",
        },
      },
    });

    await waitFor(async () => {
      const submitBtn = screen.getByText("Login");
      await userEvent.click(submitBtn);
    });

    const errorModal = screen.getByText("TestError");
    expect(errorModal).toBeInTheDocument();
  });
});
