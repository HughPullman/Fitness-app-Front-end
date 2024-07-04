import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, beforeEach, expect, it, afterEach } from "vitest";

import { registerService } from "../src/utils/user.service";
import Register from "../src/pages/Register/Register";

vi.mock("../src/utils/user.service.js");

describe("Register page tests", () => {
  beforeEach(() => {
    const routes = [
      {
        path: "/register",
        element: <Register />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/register"],
    });

    render(<RouterProvider router={router} />);
  });

  it("should render title on page load", () => {
    const title = screen.getByText("Create new account");
    expect(title).toBeInTheDocument();
  });

  it("should call registerService with correct details when submitted", async () => {
    registerService.mockReturnValue({
      status: 201,
      data: "TestData",
    });

    const email = screen.getByPlaceholderText("Email");
    fireEvent.input(email, { target: { value: "TestEmail" } });
    const password = screen.getByPlaceholderText("Password");
    fireEvent.input(password, { target: { value: "TestPassword" } });

    await waitFor(async () => {
      const submitBtn = screen.getByText("Register");
      await userEvent.click(submitBtn);
    });

    expect(registerService).toHaveBeenCalledWith({
      email: "TestEmail",
      password: "TestPassword",
    });
  });

  it("should show the errorModal when returning an error", async () => {
    registerService.mockReturnValue({
      status: 400,
      response: {
        data: {
          error: "TestError",
        },
      },
    });

    await waitFor(async () => {
      const submitBtn = screen.getByText("Register");
      await userEvent.click(submitBtn);
    });

    const errorModal = screen.getByText("TestError");
    expect(errorModal).toBeInTheDocument();
  });

  it("should close the modal on handleClose call", async () => {
    registerService.mockReturnValue({
      status: 400,
      response: {
        data: {
          error: "TestError",
        },
      },
    });

    await waitFor(async () => {
      const submitBtn = screen.getByText("Register");
      await userEvent.click(submitBtn);
    });

    await waitFor(async () => {
      const closeBtn = screen.getByRole("close");
      await userEvent.click(closeBtn);
    });

    const modal = screen.queryAllByText("TestError");
    expect(modal).toEqual([]);
  });
});
