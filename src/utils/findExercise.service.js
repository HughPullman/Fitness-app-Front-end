import axios from "axios"

export const findExercises = async ({ searchValue, selectedType, selectedMuscle, selectedDifficulty }) => {
    try {
        const exerciseRes = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/exerciseSearch`,
            { params: {
                searchValue,
                selectedType,
                selectedMuscle,
                selectedDifficulty,
        }});
        return exerciseRes;
    } catch (e) {
        return e;
    }
}