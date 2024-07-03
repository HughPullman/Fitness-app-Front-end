import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, beforeEach, expect, it, afterEach } from "vitest";

import { deleteWorkoutService } from "../src/utils/user.service";
import Workout from "../src/pages/Workout/Workout";

vi.mock("../src/utils/user.service.js");

const mockHandleEdit = vi.fn(() => {});
const mockWorkout = {
  name: "TestWorkoutName",
  description: "TestDescription",
  exercises: [
    {
      name: "TestName",
      type: "TestType",
      muscle: "TestMuscle",
      equipment: "TestEquipment",
      difficulty: "TestDifficulty",
      instructions: "TestInstructions",
    },
  ],
};

const renderScreen = () => {
  const routes = [
    {
      path: "/workout",
      element: <Workout handleEdit={mockHandleEdit} myWorkout={mockWorkout} />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/workout"],
  });

  render(<RouterProvider router={router} />);
};

describe("Workout page tests", () => {
  it("should render the workout name as a title", async () => {
    renderScreen();

    const title = screen.getByText("TestWorkoutName");
    expect(title).toBeInTheDocument();
  });

  it("should call deleteWorkoutService with the workout if the button is clicked", async () => {
    deleteWorkoutService.mockReturnValue({
      status: 200,
    });
    renderScreen();

    await waitFor(async () => {
      const deleteBtn = screen.getByText("Delete workout");
      await userEvent.click(deleteBtn);
    });

    expect(deleteWorkoutService).toHaveBeenCalledWith(mockWorkout);
  });

  it("should display error modal when the status is not 200", async () => {
    deleteWorkoutService.mockReturnValue({
      status: 400,
      response: { data: { error: "Test Error" } },
    });
    renderScreen();

    await waitFor(async () => {
      const deleteBtn = screen.getByText("Delete workout");
      await userEvent.click(deleteBtn);
    });

    const modal = screen.getByText("Test Error");
    expect(modal).toBeInTheDocument();
  });

  it("should close the modal on handleClose", async () => {
    deleteWorkoutService.mockReturnValue({
      status: 400,
      response: { data: { error: "Test Error" } },
    });
    renderScreen();

    await waitFor(async () => {
      const deleteBtn = screen.getByText("Delete workout");
      await userEvent.click(deleteBtn);
    });

    await waitFor(async () => {
      const closeBtn = screen.getByRole("close");
      await userEvent.click(closeBtn);
    });

    const modal = screen.queryAllByText("Test Error");
    expect(modal).toEqual([]);
  });

  it("should call handleEdit when the button is clicked", async () => {
    renderScreen();

    await waitFor(async () => {
      const editBtn = screen.getByText("Edit workout");
      await userEvent.click(editBtn);
    });

    expect(mockHandleEdit).toHaveBeenCalled();
  });

  it("should display info when More info is clicked", async () => {
    renderScreen();

    await waitFor(async () => {
      const infoBtn = screen.getByText("More Info");
      await userEvent.click(infoBtn);
    });

    const info = screen.getByText("TestInstructions");

    expect(info).toBeInTheDocument();
  });
});
