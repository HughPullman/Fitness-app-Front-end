import { useEffect, useState } from "react";
import WorkoutCard from "../../components/WorkoutCard/WorkoutCard";
import ExerciseCard from "../../components/ExerciseCard/ExerciseCard";
import "./Workout.scss";
import { useNavigate } from "react-router-dom";
import { deleteWorkoutService } from "../../utils/user.service";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import SuccessModal from "../../components/SuccessModal/SuccessModal";

const Workout = ({ myWorkout, handleEdit }) => {
  const [workout, setWorkout] = useState([]);
  const [info, setInfo] = useState(false);
  const [chosenExercise, setChosenExercise] = useState({});
  const [modal, setModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  const handleWorkout = () => {
    const exercises = myWorkout.exercises.map((e) => (
      <WorkoutCard
        key={e.name}
        exercise={e}
        setInfo={setInfo}
        setChosenExercise={setChosenExercise}
      />
    ));
    setWorkout(exercises);
  };

  const handleDelete = async () => {
    const res = await deleteWorkoutService(myWorkout);
    if (res.status === 200) {
      setModal(true);
      setModalMessage("Workout deleted");
    } else {
      setErrorModal(true);
      setModalMessage(res.response.data.error);
    }
  };

  useEffect(() => {
    handleWorkout();
  }, []);

  const handleClose = () => {
    if (modal) {
      setModal(false);
      navigate("/myWorkouts");
    }
    setErrorModal(false);
  };

  return (
    <div className="workout">
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
      <div className="title">
        <h3>{myWorkout.name}</h3>
        <h5>{myWorkout.description}</h5>
        <div className="btns">
          <button onClick={() => handleDelete()}>Delete workout</button>
          <button onClick={() => handleEdit()}>Edit workout</button>
          <button onClick={() => navigate("/myWorkouts")}>
            Back to workouts
          </button>
        </div>
      </div>
      <div className="exercises">
        {!info ? (
          workout
        ) : (
          <ExerciseCard chosenExercise={chosenExercise} setInfo={setInfo} />
        )}
      </div>
    </div>
  );
};
export default Workout;
