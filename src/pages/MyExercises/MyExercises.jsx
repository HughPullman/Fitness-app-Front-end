import { useEffect, useState } from "react";
import "./MyExercises.scss";
import {
  deleteExerciseService,
  getExercisesService,
} from "../../utils/user.service";
import ExerciseCard from "../../components/ExerciseCard/ExerciseCard";

const MyExercises = () => {
  const [exercises, setExercises] = useState();
  const [chosenExercise, setChosenExercise] = useState({});
  const [info, setInfo] = useState(false);

  const loadExercises = async () => {
    const data = await getExercisesService();
    const myExercises = data.data.map((exercise) => (
      <tr key={exercise.name}>
        <td key={exercise.name + "1"}>{exercise.name}</td>
        <td key={exercise.name + "2"}>{exercise.type.replace("_", " ")}</td>
        <td key={exercise.name + "3"}>{exercise.muscle.replace("_", " ")}</td>
        <td key={exercise.name + "4"}>
          {exercise.equipment.replace("_", " ")}
        </td>
        <td key={exercise.name + "5"}>{exercise.difficulty}</td>
        <td key={exercise.name + "6"}>
          <button onClick={() => handleInfo(exercise)}>More Info</button>
        </td>
        <td key={exercise.name + "7"}>
          <button onClick={() => handleDelete(exercise)}>
            <img src="/img/bin.png" alt="" />
            Remove
          </button>
        </td>
      </tr>
    ));
    setExercises(myExercises);
  };

  const handleInfo = (exercise) => {
    setChosenExercise(exercise);
    setInfo(true);
  };

  const handleDelete = async (exercise) => {
    const res = await deleteExerciseService({ exercise });
    loadExercises();
  };

  useEffect(() => {
    loadExercises();
  }, []);

  return (
    <div className="myExercises">
      <h3>Saved Exercises</h3>
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
export default MyExercises;
