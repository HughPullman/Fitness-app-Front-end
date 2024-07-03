import "./WorkoutCard.scss";

const WorkoutCard = ({ exercise, setInfo, setChosenExercise }) => {
  const handleInfo = () => {
    setInfo(true);
    setChosenExercise(exercise);
  };

  return (
    <div className="workoutCard">
      <h3>{exercise.name}</h3>
      <p>{exercise.difficulty}</p>
      <p>{exercise.equipment}</p>
      <button onClick={() => handleInfo()}>More Info</button>
    </div>
  );
};

export default WorkoutCard;
