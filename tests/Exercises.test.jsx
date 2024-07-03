import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, beforeEach, expect, it } from "vitest";

import { createExerciseService } from "../src/utils/user.service";
import Exercises from "../src/pages/Exercises/Exercises";

vi.mock("../src/utils/user.service.js");

const renderScreen = (exerciseRes) => {
  const routes = [
    {
      path: "/exercises",
      element: <Exercises exerciseRes={exerciseRes} />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/exercises"],
  });

  render(<RouterProvider router={router} />);
};

describe("Exercises page tests", () => {
  it("should render Exercises title on page load", () => {
    renderScreen();
    const title = screen.getByText(/Exercises/i);
    expect(title).toBeInTheDocument();
  });

  it("should render the exercise results on load", () => {
    renderScreen([
      {
        name: "TestName",
        type: "TestType",
        muscle: "TestMuscle",
        equipment: "TestEquipment",
        difficulty: "TestDifficulty",
        instructions: "TestInstructions",
      },
    ]);

    const name = screen.getByText("TestName");

    expect(name).toBeInTheDocument();
  });

  it("should call createExerciseService with the exercise when save is clicked", async () => {
    createExerciseService.mockReturnValue({
      status: 201,
    });

    renderScreen([
      {
        name: "TestName",
        type: "TestType",
        muscle: "TestMuscle",
        equipment: "TestEquipment",
        difficulty: "TestDifficulty",
        instructions: "TestInstructions",
      },
    ]);

    await waitFor(async () => {
      const saveBtn = screen.getByText("Save Exercise");
      await userEvent.click(saveBtn);
    });

    expect(createExerciseService).toHaveBeenCalledWith({
      exercise: {
        name: "TestName",
        type: "TestType",
        muscle: "TestMuscle",
        equipment: "TestEquipment",
        difficulty: "TestDifficulty",
        instructions: "TestInstructions",
      },
    });
  });
  it("should show successModal on successful creation ", async () => {
    createExerciseService.mockReturnValue({
      status: 201,
    });

    renderScreen([
      {
        name: "TestName",
        type: "TestType",
        muscle: "TestMuscle",
        equipment: "TestEquipment",
        difficulty: "TestDifficulty",
        instructions: "TestInstructions",
      },
    ]);

    await waitFor(async () => {
      const saveBtn = screen.getByText("Save Exercise");
      await userEvent.click(saveBtn);
    });

    const successModal = screen.getByText("Saved Successfully");

    expect(successModal).toBeInTheDocument();
  });

  it("should show the error modal when failed creation", async () => {
    createExerciseService.mockReturnValue({
      status: 200,
      response: {
        data: {
          error: "Error Test",
        },
      },
    });

    renderScreen([
      {
        name: "TestName",
        type: "TestType",
        muscle: "TestMuscle",
        equipment: "TestEquipment",
        difficulty: "TestDifficulty",
        instructions: "TestInstructions",
      },
    ]);

    await waitFor(async () => {
      const saveBtn = screen.getByText("Save Exercise");
      await userEvent.click(saveBtn);
    });

    const errorModal = screen.getByText("Error Test");

    expect(errorModal).toBeInTheDocument();
  });

  it("should close the modal on close btn", async () => {
    createExerciseService.mockReturnValue({
      status: 201,
    });

    renderScreen([
      {
        name: "TestName",
        type: "TestType",
        muscle: "TestMuscle",
        equipment: "TestEquipment",
        difficulty: "TestDifficulty",
        instructions: "TestInstructions",
      },
    ]);

    await waitFor(async () => {
      const saveBtn = screen.getByText("Save Exercise");
      await userEvent.click(saveBtn);
    });

    await waitFor(async () => {
      const closeBtn = screen.getByRole("close");
      await userEvent.click(closeBtn);
    });

    const successModal = screen.queryAllByText("Saved Successfully");

    expect(successModal).toEqual([]);
  });
});
