import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, beforeEach, expect, it } from "vitest";

import { getExercisesService } from "../src/utils/user.service";
import { editWorkoutService } from "../src/utils/user.service";
import { createWorkoutService } from "../src/utils/user.service";
import CreateWorkout from "../src/pages/CreateWorkout/CreateWorkout";

vi.mock("../src/utils/user.service.js");

const mockSetEditWorkout = vi.fn(() => {});

const mockWorkout = {
  name: "TestName",
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

const renderScreen = (editWorkout) => {
  const routes = [
    {
      path: "/createWorkout",
      element: (
        <CreateWorkout
          editWorkout={editWorkout}
          setEditWorkout={mockSetEditWorkout}
        />
      ),
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/createWorkout"],
  });

  render(<RouterProvider router={router} />);
};

describe("Create workout tests", () => {
  it("should render Create Workout if editWorkout is false", async () => {
    getExercisesService.mockReturnValue({
      data: [],
    });

    renderScreen(false);
    const header = screen.getByText(/Create Workout/i);

    expect(header).toBeInTheDocument();
  });

  it("should render Edit Workout if editWorkout is true", async () => {
    getExercisesService.mockReturnValue({
      data: [],
    });

    renderScreen(mockWorkout);
    const header = screen.getByText(/Edit Workout/i);

    expect(header).toBeInTheDocument();
  });

  it("should call getExercise service on page load", async () => {
    getExercisesService.mockReturnValue({
      data: [],
    });

    renderScreen(false);

    expect(getExercisesService).toHaveBeenCalled();
  });

  it("should call editWorkoutService when editing workout is submitted", async () => {
    getExercisesService.mockReturnValue({
      data: [],
    });
    editWorkoutService.mockReturnValue({
      status: 201,
    });

    renderScreen(mockWorkout);

    const submitBtn = screen.getByRole("submit");
    await userEvent.click(submitBtn);

    expect(editWorkoutService).toHaveBeenCalledWith(
      mockWorkout,
      mockWorkout.name
    );
  });

  it("should call createWorkout Service when creating a workout", async () => {
    getExercisesService.mockReturnValue({
      data: [],
    });
    createWorkoutService.mockReturnValue({
      status: 201,
    });

    renderScreen(false);

    const submitBtn = screen.getByRole("submit");
    await userEvent.click(submitBtn);

    expect(createWorkoutService).toHaveBeenCalled();
  });

  it("should show successModal on successful edit", async () => {
    getExercisesService.mockReturnValue({
      data: [],
    });
    editWorkoutService.mockReturnValue({
      status: 201,
    });

    renderScreen(mockWorkout);

    await waitFor(async () => {
      const submitBtn = screen.getByRole("submit");
      await userEvent.click(submitBtn);
    });

    const modal = screen.getByText(/Workout successfully edited/i);

    expect(modal).toBeInTheDocument();
  });

  it("should show errorModal on error edit", async () => {
    getExercisesService.mockReturnValue({
      data: [],
    });
    editWorkoutService.mockReturnValue({
      status: 400,
      response: {
        data: {
          error: "TestError",
        },
      },
    });

    renderScreen(mockWorkout);

    await waitFor(async () => {
      const submitBtn = screen.getByRole("submit");
      await userEvent.click(submitBtn);
    });

    const modal = screen.getByText("TestError");

    expect(modal).toBeInTheDocument();
  });

  it("should show successModal on successful creation of workout", async () => {
    getExercisesService.mockReturnValue({
      data: [],
    });
    createWorkoutService.mockReturnValue({
      status: 201,
    });

    renderScreen(false);

    await waitFor(async () => {
      const submitBtn = screen.getByRole("submit");
      await userEvent.click(submitBtn);
    });

    const modal = screen.getByText("Workout successfully created");

    expect(modal).toBeInTheDocument();
  });

  it("should show errorModal on error creation of workout", async () => {
    getExercisesService.mockReturnValue({
      data: [],
    });
    createWorkoutService.mockReturnValue({
      status: 400,
      response: {
        data: {
          error: "TestError",
        },
      },
    });

    renderScreen(false);

    await waitFor(async () => {
      const submitBtn = screen.getByRole("submit");
      await userEvent.click(submitBtn);
    });

    const modal = screen.getByText("TestError");

    expect(modal).toBeInTheDocument();
  });

  it("should close successModal on close btn", async () => {
    getExercisesService.mockReturnValue({
      data: [],
    });
    createWorkoutService.mockReturnValue({
      status: 201,
    });

    renderScreen(false);

    await waitFor(async () => {
      const submitBtn = screen.getByRole("submit");
      await userEvent.click(submitBtn);
    });

    await waitFor(async () => {
      const closeBtn = screen.getByRole("close");
      await userEvent.click(closeBtn);
    });

    const modal = screen.queryAllByText("Workout successfully created");

    expect(modal).toEqual([]);
  });

  it("should close errorModal on close btn", async () => {
    getExercisesService.mockReturnValue({
      data: [],
    });
    createWorkoutService.mockReturnValue({
      status: 400,
      response: {
        data: {
          error: "TestError",
        },
      },
    });

    renderScreen(false);

    await waitFor(async () => {
      const submitBtn = screen.getByRole("submit");
      await userEvent.click(submitBtn);
    });

    await waitFor(async () => {
      const closeBtn = screen.getByRole("close");
      await userEvent.click(closeBtn);
    });

    const modal = screen.queryAllByText("TestError");

    expect(modal).toEqual([]);
  });

  it("should show info when moreInfo btn is clicked", async () => {
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

    renderScreen(false);

    await waitFor(async () => {
      const infoBtn = screen.getByText(/More Info/i);
      await userEvent.click(infoBtn);
    });

    const instructions = screen.getByText("TestInstructions");

    expect(instructions).toBeInTheDocument();
  });

  it("should hide info when back is clicked", async () => {
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

    renderScreen(false);

    await waitFor(async () => {
      const infoBtn = screen.getByText(/More Info/i);
      await userEvent.click(infoBtn);
    });

    await waitFor(async () => {
      const backBtn = screen.getByText(/Back/i);
      await userEvent.click(backBtn);
    });

    const instructions = screen.queryAllByText("TestInstructions");

    expect(instructions).toEqual([]);
  });
});
