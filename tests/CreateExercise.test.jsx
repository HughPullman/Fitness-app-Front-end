import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, beforeEach, expect, it } from "vitest";

import CreateExercise from "../src/pages/CreateExercise/CreateExercise";
import { createExerciseService } from "../src/utils/user.service";

vi.mock("../src/utils/user.service.js");

describe("Create Exercise page tests", () => {
  beforeEach(() => {
    const routes = [
      {
        path: "/createExercise",
        element: <CreateExercise />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/createExercise"],
    });

    render(<RouterProvider router={router} />);
  });

  it("should render Create new Exercise as header", () => {
    const createHead = screen.getByText(/Create new exercise/i);
    expect(createHead).toBeInTheDocument();
  });

  it("should call createExerciseService when the form is submitted", async () => {
    createExerciseService.mockReturnValue({
      status: 201,
    });

    const submitBtn = screen.getByText("Create");
    await userEvent.click(submitBtn);

    expect(createExerciseService).toHaveBeenCalled();
  });

  it("should show success modal on status 201", async () => {
    createExerciseService.mockReturnValue({
      status: 201,
    });

    await waitFor(async () => {
      const submitBtn = screen.getByText("Create");
      await userEvent.click(submitBtn);
    });

    const successModal = screen.getByText("Exercise created successfully");

    expect(successModal).toBeInTheDocument();
  });

  it("should show error modal on other status", async () => {
    createExerciseService.mockReturnValue({
      status: 400,
      response: {
        data: {
          message: "Error Message",
        },
      },
    });

    await waitFor(async () => {
      const submitBtn = screen.getByText("Create");
      await userEvent.click(submitBtn);
    });

    const errorModal = screen.getByText("Error Message");

    expect(errorModal).toBeInTheDocument();
  });

  it("should send the correct information to the service", async () => {
    createExerciseService.mockReturnValue({
      status: 201,
    });

    const name = screen.getByPlaceholderText("Exercise name...");
    const type = screen.getByPlaceholderText("Exercise type...");
    const muscle = screen.getByPlaceholderText("Muscle group...");
    const equipment = screen.getByPlaceholderText("Equipment used...");
    const difficulty = screen.getByPlaceholderText("Difficulty...");
    const instructions = screen.getByPlaceholderText("Instructions...");
    fireEvent.input(name, { target: { value: "TestName" } });
    fireEvent.input(type, { target: { value: "TestType" } });
    fireEvent.input(muscle, { target: { value: "TestMuscle" } });
    fireEvent.input(equipment, { target: { value: "TestEquipment" } });
    fireEvent.input(difficulty, { target: { value: "TestDifficulty" } });
    fireEvent.input(instructions, { target: { value: "TestInstructions" } });

    const submitBtn = screen.getByText("Create");
    await userEvent.click(submitBtn);

    expect(createExerciseService).toHaveBeenCalledWith({
      exercise: {
        name: "TestName",
        type: "TestType",
        muscle: "TestMuscle",
        equipment: "TestEquipment",
        difficulty: "TestDifficulty",
        instructions: "TestInstructions",
      },
      userId: null,
    });
  });
});
