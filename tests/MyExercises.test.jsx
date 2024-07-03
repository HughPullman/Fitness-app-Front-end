import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, beforeEach, expect, it, afterEach } from "vitest";

import { getExercisesService } from "../src/utils/user.service";
import { deleteExerciseService } from "../src/utils/user.service";
import MyExercises from "../src/pages/MyExercises/MyExercises";

vi.mock("../src/utils/user.service.js");

const renderScreen = () => {
  const routes = [
    {
      path: "/myExercises",
      element: <MyExercises />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/myExercises"],
  });

  render(<RouterProvider router={router} />);
};

describe("My exercises page tests", () => {
  it("Should render title on page load", () => {
    getExercisesService.mockReturnValue({
      data: [],
    });
    renderScreen();

    const title = screen.getByText(/Saved Exercises/i);
    expect(title).toBeInTheDocument();
  });

  it("should call getExercisesService on page load and display exercise", async () => {
    getExercisesService.mockReturnValue({
      data: [
        {
          name: "TestName",
          type: "TestType",
          muscle: "TestMuscle",
          equipment: "TestEquipment",
          difficulty: "TestDifficulty",
          instructions: "TestInstructions",
        },
      ],
    });
    await waitFor(() => {
      renderScreen();
    });

    const name = screen.getByText("TestName");
    const type = screen.getByText("TestType");
    const muscle = screen.getByText("TestMuscle");
    const equipment = screen.getByText("TestEquipment");
    const difficulty = screen.getByText("TestDifficulty");

    expect(name).toBeInTheDocument();
    expect(type).toBeInTheDocument();
    expect(muscle).toBeInTheDocument();
    expect(equipment).toBeInTheDocument();
    expect(difficulty).toBeInTheDocument();
  });

  it("should show info on the info btn click", async () => {
    getExercisesService.mockReturnValue({
      data: [
        {
          name: "TestName",
          type: "TestType",
          muscle: "TestMuscle",
          equipment: "TestEquipment",
          difficulty: "TestDifficulty",
          instructions: "TestInstructions",
        },
      ],
    });
    await waitFor(() => {
      renderScreen();
    });

    await waitFor(async () => {
      const infoBtn = screen.getByText(/More Info/i);
      await userEvent.click(infoBtn);
    });

    const instructions = screen.getByText("TestInstructions");

    expect(instructions).toBeInTheDocument();
  });

  it("should call delete service on remove button click", async () => {
    getExercisesService.mockReturnValue({
      data: [
        {
          name: "TestName",
          type: "TestType",
          muscle: "TestMuscle",
          equipment: "TestEquipment",
          difficulty: "TestDifficulty",
          instructions: "TestInstructions",
        },
      ],
    });
    deleteExerciseService.mockReturnValue({});

    await waitFor(() => {
      renderScreen();
    });

    await waitFor(async () => {
      const removeBtn = screen.getByText(/Remove/i);
      await userEvent.click(removeBtn);
    });

    expect(deleteExerciseService).toHaveBeenCalledWith({
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
});
