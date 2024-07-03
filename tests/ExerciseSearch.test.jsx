import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { describe, beforeEach, expect, it } from "vitest";

import { findExercises } from "../src/utils/findExercise.service";
import ExerciseSearch from "../src/pages/ExerciseSearch/ExerciseSearch";

vi.mock("../src/utils/findExercise.service.js");

const mockSetExerciseRes = vi.fn(() => {});

describe("Exercise search page tests", () => {
  beforeEach(() => {
    const routes = [
      {
        path: "/exerciseSearch",
        element: <ExerciseSearch setExerciseRes={mockSetExerciseRes} />,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/exerciseSearch"],
    });

    render(<RouterProvider router={router} />);
  });

  it("should render title on page load", () => {
    const title = screen.getByText(/Search for an exercise/i);

    expect(title).toBeInTheDocument();
  });

  it("should call findExercises when searching with correct values", async () => {
    findExercises.mockReturnValue({
      status: 200,
      data: {},
    });

    const name = screen.getByPlaceholderText("Search by name...");
    const type = screen.getByRole("type");
    const muscle = screen.getByRole("muscle");
    const equipment = screen.getByRole("difficulty");
    fireEvent.input(name, { target: { value: "TestName" } });
    fireEvent.change(type, { target: { value: "cardio" } });
    fireEvent.change(muscle, { target: { value: "biceps" } });
    fireEvent.change(equipment, { target: { value: "beginner" } });

    await waitFor(async () => {
      const searchBtn = screen.getByRole("search");
      await userEvent.click(searchBtn);
    });

    expect(findExercises).toHaveBeenCalledWith({
      searchValue: "TestName",
      selectedType: "cardio",
      selectedMuscle: "biceps",
      selectedDifficulty: "beginner",
    });
  });
});
