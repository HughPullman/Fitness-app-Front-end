import { useEffect, useState } from "react";
import "./Exercises.scss";
import ExerciseCard from "../../components/ExerciseCard/ExerciseCard";
import { createExerciseService } from "../../utils/user.service";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import SuccessModal from "../../components/SuccessModal/SuccessModal";

const Exercises = ({ exerciseRes }) => {
  const [exercises, setExercises] = useState([]);
  const [chosenExercise, setChosenExercise] = useState({});
  const [info, setInfo] = useState(false);
  const [modal, setModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleInfo = (exercise) => {
    setChosenExercise(exercise);
    setInfo(true);
  };

  const handleSave = async (exercise) => {
    const res = await createExerciseService({ exercise });
    if (res.status === 201) {
      setModal(true);
      setModalMessage("Saved Successfully");
    } else {
      setErrorModal(true);
      setModalMessage(res.response.data.error);
    }
  };

  const handleClose = () => {
    if (modal) {
      setModal(false);
    }
    setErrorModal(false);
  };

  useEffect(() => {
    const chosenExercises = exerciseRes.map((exercise) => (
      <tr key={exercise.name}>
        <td key={exercise.name + "1"}>{exercise.name}</td>
        <td key={exercise.name + "2"}>{exercise.type}</td>
        <td key={exercise.name + "3"}>{exercise.muscle}</td>
        <td key={exercise.name + "4"}>{exercise.equipment}</td>
        <td key={exercise.name + "5"}>{exercise.difficulty}</td>
        <td key={exercise.name + "6"}>
          <button onClick={() => handleInfo(exercise)}>More Info</button>
        </td>
        {localStorage.getItem("user") ? (
          <td>
            <button onClick={() => handleSave(exercise)}>Save Exercise</button>
          </td>
        ) : (
          <td></td>
        )}
      </tr>
    ));
    setExercises(chosenExercises);
  }, exerciseRes);

  return (
    <div className="exercises">
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
      <h2>Exercises</h2>
      {!info ? (
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
      ) : (
        <ExerciseCard chosenExercise={chosenExercise} setInfo={setInfo} />
      )}
    </div>
  );
};
export default Exercises;
