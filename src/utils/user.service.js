import axios from "axios";

export const loginService = async ({ email, password }) => {
    try {
        const loginRes = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/login`, {
            email,
            password
        });
        return loginRes;
    } catch (e) {
        return e;
  }
};

export const registerService = async ({ email, password }) => {
    try {
        const registerRes = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/register`, {
            email,
            password
        });
        return registerRes;
    } catch (e) {
        return e;
    }
}

export const createExerciseService = async ({ exercise}) => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("user");

    try {
        const createExerciseRes = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/createExercise`, {
            exercise,
            userId,
            headers: {
                "access-token": accessToken,
            }
        });

        return createExerciseRes;
    } catch (e) {
        return e;
    }
}

export const getExercisesService = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("user");

    try {
        const getExercisesRes = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/getExercises/${userId}`, {
            headers: {
                "access-token": accessToken,
            }
        });
        return getExercisesRes;
    } catch (e) {
        return e;
    }
}

export const deleteExerciseService = async ({exercise}) => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("user");

    try {
        const deleteExerciseRes = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/deleteExercise`, {
            exercise: exercise,
            userId,
            headers: {
                "access-token": accessToken,
            }
        });

        return deleteExerciseRes;
    } catch (e) {
        return e;
    }
}

export const createWorkoutService = async ({ workout }) => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("user");

    try {
        const createWorkoutRes = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/createWorkout`, {
            workout,
            userId,
            headers: {
                "access-token": accessToken,
            }
        });

        return createWorkoutRes;
    } catch (e) {
        return e;
    }
};

export const getWorkoutsService = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("user");

    try {
        const getWorkoutRes = await axios.get(`${import.meta.env.VITE_APP_BACKEND_URL}/getWorkouts/${userId}`, {
            headers: {
                "access-token": accessToken,
            }
        });
        return getWorkoutRes;
    } catch (e) {
        return e;
    }
}

export const deleteWorkoutService = async (workout) => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("user");


    try {
        const deleteWorkoutRes = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/deleteWorkout`, {
            workout,
            userId,
            headers: {
                "access-token": accessToken,
            }
        });
        return deleteWorkoutRes;
    } catch (e) {
        return e;
    }
}

export const editWorkoutService = async (workout, oldWorkoutName) => {
    const accessToken = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("user");

    try {
        const editWorkoutRes = await axios.put(`${import.meta.env.VITE_APP_BACKEND_URL}/editWorkout`, {
            workout,
            userId,
            oldWorkoutName,
            headers: {
                "access-token": accessToken,
            }
        });
        return editWorkoutRes;
    } catch (e) {
        return e;
    }
}