import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, beforeEach, expect, it } from "vitest";
import Home from "../src/pages/Home/Home";

describe("Home tests", () => {
  beforeEach(() => {
    const routes = [
      {
        path: "/home",
        element: <Home />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/home"],
    });

    render(<RouterProvider router={router} />);
  });

  it("should render the four cards on load", () => {
    const myWorkoutsCard = screen.getByText(/My Workouts/i);
    const myFindExercisesCard = screen.getByText(/Find Exercises/i);
    const myNewExerciseCard = screen.getByText(/Create new Exercise/i);
    const myNewWorkoutCard = screen.getByText(/Create new Workout/i);

    expect(myWorkoutsCard).toBeInTheDocument();
    expect(myFindExercisesCard).toBeInTheDocument();
    expect(myNewExerciseCard).toBeInTheDocument();
    expect(myNewWorkoutCard).toBeInTheDocument();
  });
});
