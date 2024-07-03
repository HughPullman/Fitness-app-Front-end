import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, beforeEach, expect, it, afterEach } from "vitest";
import Navbar from "../src/components/Navbar/Navbar";

describe("Navbar tests", () => {
  beforeEach(() => {
    localStorage.setItem("user", "TestUser");
    const routes = [
      {
        path: "/",
        element: <Navbar />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/"],
    });

    render(<RouterProvider router={router} />);
  });

  it("should render Exercises on load", () => {
    const exercises = screen.getByText("Exercises");
    expect(exercises).toBeInTheDocument();
  });

  it("should clear local storage on logout", async () => {
    await waitFor(async () => {
      const logoutBtn = screen.getByText("Logout");
      await userEvent.click(logoutBtn);
    });

    expect(localStorage.getItem("user")).toEqual(null);
  });
});
