import { useEffect, useState } from "react";
import "./CreateWorkout.scss";
import ExerciseCard from "../../components/ExerciseCard/ExerciseCard";
import {
  createWorkoutService,
  editWorkoutService,
  getExercisesService,
} from "../../utils/user.service";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import SuccessModal from "../../components/SuccessModal/SuccessModal";

const CreateWorkout = ({ editWorkout, setEditWorkout }) => {
  const [workoutName, setWorkoutName] = useState("");
  const [workoutDesc, setWorkoutDesc] = useState("");
  const [workoutExercises, setWorkoutExercises] = useState([]);
  const [exercises, setExercises] = useState();
  const [info, setInfo] = useState(false);
  const [chosenExercise, setChosenExercise] = useState({});
  const [modal, setModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [oldName, setOldName] = useState("");

  const addExercise = (exercise) => {
    setWorkoutExercises((workoutExercises) => [...workoutExercises, exercise]);
  };

  const removeExercise = (exercise) => {
    const newExercises = workoutExercises.filter(
      (e) => e.name !== exercise.name
    );
    setWorkoutExercises(newExercises);
  };

  const handleInfo = (exercise) => {
    setChosenExercise(exercise);
    setInfo(true);
  };

  const loadExercises = async () => {
    const data = await getExercisesService();
    const savedExercises = data.data.map((exercise) => (
      <tr key={exercise.name}>
        <td key={exercise.name + "1"}>{exercise.name}</td>
        <td key={exercise.name + "2"}>{exercise.type}</td>
        <td key={exercise.name + "3"}>{exercise.muscle}</td>
        <td key={exercise.name + "4"}>{exercise.equipment}</td>
        <td key={exercise.name + "5"}>{exercise.difficulty}</td>
        <td key={exercise.name + "6"}>
          <button onClick={() => handleInfo(exercise)}>More Info</button>
        </td>
        <td key={exercise.name + "7"}>
          <button onClick={() => addExercise(exercise)}>Add Exercise</button>
        </td>
      </tr>
    ));
    setExercises(savedExercises);
  };

  const handleClose = () => {
    if (modal) {
      setModal(false);
    }
    setErrorModal(false);
  };

  useEffect(() => {
    loadExercises();
    if (editWorkout) {
      setEditMode(true);
      setWorkoutName(editWorkout.name);
      setOldName(editWorkout.name);
      setWorkoutDesc(editWorkout.description);
      setWorkoutExercises(editWorkout.exercises);
      setEditWorkout(null);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const workout = {
      name: workoutName,
      description: workoutDesc,
      exercises: workoutExercises,
    };
    if (editMode) {
      const res = await editWorkoutService(workout, oldName);
      if (res.status === 201) {
        setModal(true);
        setModalMessage("Workout successfully edited");
      } else {
        setErrorModal(true);
        setModalMessage(res.response.data.error);
      }
    } else {
      const res = await createWorkoutService({ workout });
      if (res.status === 201) {
        setModal(true);
        setModalMessage("Workout successfully created");
      } else {
        setErrorModal(true);
        setModalMessage(res.response.data.error);
      }
    }
  };

  return (
    <div className="createWorkout">
      <SuccessModal
        message={modalMessage}
        show={modal}
        close={handleClose}
      ></SuccessModal>
      <ErrorModal
        error={modalMessage}
        show={errorModal}
        handleClose={handleClose}
      />
      {!info ? (
        <>
          <div className="leftCreateWorkout">
            {editMode ? <h3>Edit Workout</h3> : <h3>Create Workout</h3>}
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                id="workoutName"
                name="workoutName"
                value={workoutName}
                placeholder="Workout name..."
                onChange={(e) => {
                  setWorkoutName(e.target.value);
                }}
              />
              <input
                type="text"
                id="workoutDesc"
                name="workoutDesc"
                value={workoutDesc}
                placeholder="Workout description..."
                onChange={(e) => {
                  setWorkoutDesc(e.target.value);
                }}
              />
              <div className="chosenExercises">
                <h4>Exercises:</h4>
                {workoutExercises.map((exercise) => (
                  <p key={exercise.name}>
                    {exercise.name}
                    <button onClick={() => removeExercise(exercise)}>
                      Remove
                    </button>
                  </p>
                ))}
              </div>
              {editMode ? (
                <button type="submit" role="submit">
                  Edit
                </button>
              ) : (
                <button type="submit" role="submit">
                  Create
                </button>
              )}
            </form>
          </div>
          <div className="rightCreateWorkout">
            <h3>Saved Exercises</h3>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Muscle Group</th>
                  <th>Equipment</th>
                  <th>Difficulty</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{exercises}</tbody>
            </table>
          </div>
        </>
      ) : (
        <ExerciseCard chosenExercise={chosenExercise} setInfo={setInfo} />
      )}
    </div>
  );
};
export default CreateWorkout;
