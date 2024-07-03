import axios from "axios";
import { beforeEach, expect } from "vitest";

import { loginService, registerService, createExerciseService, getExercisesService, deleteExerciseService, createWorkoutService, getWorkoutsService, deleteWorkoutService, editWorkoutService } from "../src/utils/user.service";

vi.mock("axios");

const mockUser = { email: "TestEmail", password: "TestPassword" };

const mockExercise = {
    name: "TestName",
    type: "TestType",
    muscle: "TestMuscle",
    equipment: "TestEquipment",
    difficulty: "TestDifficulty",
    instructions: "TestInstructions",
};

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

describe("User service tests", () => {
    beforeEach(() => {
        axios.mockReset();
    });

    it("should make a post request calling the loginService and return data", async () => {
        axios.post.mockResolvedValue({
         data: "TestData"
        });
        
        const loginRes = await loginService(mockUser);
        
        expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/login`, mockUser);
        expect(loginRes).toEqual({data: "TestData"})
    });

    it("should make a post request calling the registerService and return data", async () => {
        axios.post.mockResolvedValue({
         data: "TestData"
        });
        
        const registerRes = await registerService(mockUser);
        
        expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/register`, mockUser);
        expect(registerRes).toEqual({data: "TestData"})
    });

    it("should make a post request calling the createExerciseService and return data", async () => {
        axios.post.mockResolvedValue({
         data: "TestData"
        });

        localStorage.setItem("accessToken", "TestToken");
        localStorage.setItem("user", "TestUser");
        
        const createExerciseRes = await createExerciseService({exercise: mockExercise});
        
        expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/createExercise`, {
            exercise: mockExercise, userId: "TestUser" , headers: {
             "access-token": "TestToken"
            }
        });
        expect(createExerciseRes).toEqual({data: "TestData"})
    });

    it("should make a get request calling getExerciseService and return data", async () => {
        axios.get.mockResolvedValue({
            data: "TestData"
        });

        const getExerciseServiceRes = await getExercisesService();

        expect(axios.get).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/getExercises/TestUser`, {
            headers: {
             "access-token": "TestToken"
            }
        });
        expect(getExerciseServiceRes).toEqual({data: "TestData"})
    });

    it("should make a post request calling deleteExerciseService and return data", async () => {
        axios.post.mockResolvedValue({
         data: "TestData"
        });

        const deleteExerciseRes = await deleteExerciseService({ exercise: mockExercise });

        expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/deleteExercise`, {
            exercise: mockExercise, userId: "TestUser" , headers: {
             "access-token": "TestToken"
            }
        });
        expect(deleteExerciseRes).toEqual({data: "TestData"})
    });

    it("should make a post request calling createWorkoutService and return data", async () => {
         axios.post.mockResolvedValue({
         data: "TestData"
         });
        
        const createWorkoutRes = await createWorkoutService({ workout: mockWorkout });

        expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/createWorkout`, {
            workout: mockWorkout, userId: "TestUser" , headers: {
             "access-token": "TestToken"
            }
        });
        expect(createWorkoutRes).toEqual({data: "TestData"})
    });

    it("should make a get request calling getWorkoutService and return data", async () => {
        axios.get.mockResolvedValue({
            data: "TestData"
        });

        const getWorkoutRes = await getWorkoutsService();

        expect(axios.get).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/getWorkouts/TestUser`, {
            headers: {
             "access-token": "TestToken"
            }
        });
        expect(getWorkoutRes).toEqual({data: "TestData"})
    });

    it("should make a post request when calling deleteWorkoutService", async () => {
        axios.post.mockResolvedValue({
         data: "TestData"
        });
        
        const deleteWorkoutRes = await deleteWorkoutService(mockWorkout);

        expect(axios.post).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/deleteWorkout`, {
            workout: mockWorkout, userId: "TestUser" , headers: {
             "access-token": "TestToken"
            }
        });
        expect(deleteWorkoutRes).toEqual({data: "TestData"})
    });


    it("should make a put request when calling editWorkoutService", async () => {
         axios.put.mockResolvedValue({
         data: "TestData"
         });
        
        const editWorkoutRes = await editWorkoutService(mockWorkout, mockWorkout.name);

        expect(axios.put).toHaveBeenCalledWith(`${import.meta.env.VITE_BACKEND_URL}/editWorkout`, {
            workout: mockWorkout, userId: "TestUser", oldWorkoutName: "TestName" , headers: {
             "access-token": "TestToken"
            }
        });
        expect(editWorkoutRes).toEqual({data: "TestData"})
    });
    
});