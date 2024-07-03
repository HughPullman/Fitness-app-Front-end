import "./ExerciseCard.scss";

const ExerciseCard = ({ chosenExercise, setInfo }) => {
  return (
    <div className="exerciseCard">
      <div className="leftExerciseCard">
        <h3>{chosenExercise.name}</h3>
        <p>Type: {chosenExercise.type.replace("_", " ")}</p>
        <p>Muscle: {chosenExercise.muscle.replace("_", " ")}</p>
        <p>Equipment: {chosenExercise.equipment.replace("_", " ")}</p>
        <p>Difficulty: {chosenExercise.difficulty}</p>
      </div>
      <div className="rightExerciseCard">
        <h4>Instructions:</h4>
        <p>{chosenExercise.instructions}</p>
        <button onClick={() => setInfo(false)}>Back</button>
      </div>
    </div>
  );
};
export default ExerciseCard;
