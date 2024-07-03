import { beforeEach, describe, expect } from "vitest";
import axios from "axios";
import { findExercises } from "../src/utils/findExercise.service";

vi.mock('axios');

    const mockValue = "TestValue";
    const mockType = "TestType";
    const mockMuscle = "TestMuscle";
    const mockDifficulty = "TestDifficulty";

describe("Find exercise tests", () => {
      beforeEach(() => {
        axios.mockReset();
      });
    
    it("should make a get request and return data", async () => {
        axios.get.mockResolvedValue({
            data: "TestData"
        });

        const findExercisesRes = await findExercises({searchValue: mockValue, selectedType: mockType,selectedMuscle: mockMuscle,selectedDifficulty: mockDifficulty});

        expect(axios.get).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/exerciseSearch`,
            { params: {
                searchValue: mockValue,
                selectedType: mockType,
                selectedMuscle: mockMuscle,
                selectedDifficulty: mockDifficulty,
            }
            }
        );
        expect(findExercisesRes).toEqual({ data: "TestData" });
    });

    it("should return and error when the request fails", async () => {
        axios.get.mockResolvedValue(
            { data: new Error("Network Error") }
        );

        const findExercisesRes = await findExercises({searchValue: mockValue, selectedType: mockType,selectedMuscle: mockMuscle,selectedDifficulty: mockDifficulty});

        expect(axios.get).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/exerciseSearch`,
        { params: {
            searchValue: mockValue,
            selectedType: mockType,
            selectedMuscle: mockMuscle,
            selectedDifficulty: mockDifficulty,
        }
        }
        );
        expect(findExercisesRes).toEqual({ data: new Error("Network Error") });
        
    });
});