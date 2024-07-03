import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, beforeEach, expect, it, afterEach } from "vitest";

import { getWorkoutsService } from "../src/utils/user.service";
import MyWorkouts from "../src/pages/MyWorkouts/MyWorkouts";

vi.mock("../src/utils/user.service.js");

const mockSetWorkout = vi.fn(() => {});

const renderScreen = () => {
  const routes = [
    {
      path: "/myWorkouts",
      element: <MyWorkouts setMyWorkout={mockSetWorkout} />,
    },
  ];

  const router = createMemoryRouter(routes, {
    initialEntries: ["/myWorkouts"],
  });

  render(<RouterProvider router={router} />);
};

describe("My workouts page tests", () => {
  it("should call the workout service on load", async () => {
    getWorkoutsService.mockReturnValue({
      data: [],
    });

    renderScreen();

    expect(getWorkoutsService).toHaveBeenCalled();
  });

  it("should render the workouts returned from the service", async () => {
    getWorkoutsService.mockReturnValue({
      status: 200,
      data: [
        {
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
        },
      ],
    });

    await waitFor(() => {
      renderScreen();
    });

    const workoutName = screen.getByText("TestName");
    expect(workoutName).toBeInTheDocument();
  });

  it("should call setMyWorkout and navigate to workout page on click", async () => {
    getWorkoutsService.mockReturnValue({
      status: 200,
      data: [
        {
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
        },
      ],
    });

    await waitFor(() => {
      renderScreen();
    });

    await waitFor(async () => {
      const workout = screen.getByText("TestName");
      await userEvent.click(workout);
    });

    expect(mockSetWorkout).toHaveBeenCalled();
  });
});
