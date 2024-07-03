import { useNavigate } from "react-router-dom";
import "./MyWorkoutsCard.scss";

const MyWorkoutsCard = ({ name, description, exercises, setMyWorkout }) => {
  const navigate = useNavigate();

  const handleWorkout = () => {
    setMyWorkout({
      name,
      description,
      exercises,
    });
    navigate("/workout");
  };

  return (
    <div className="myWorkoutsCard" onClick={handleWorkout}>
      <img src="/img/logo.png" alt="" />
      <div className="textWorkoutCard">
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};
export default MyWorkoutsCard;
