import { useEffect, useState } from "react";
import MyWorkoutsCard from "../../components/MyWorkoutsCard/MyWorkoutsCard";
import { getWorkoutsService } from "../../utils/user.service";
import "./MyWorkouts.scss";

const MyWorkouts = ({ setMyWorkout }) => {
  const [workoutsView, setWorkoutsView] = useState([]);

  const handleWorkouts = async () => {
    const res = await getWorkoutsService();
    if (res.status === 200) {
      const myWorkouts = res.data.map((workout) => (
        <MyWorkoutsCard
          key={workout.name}
          name={workout.name}
          description={workout.description}
          exercises={workout.exercises}
          setMyWorkout={setMyWorkout}
        />
      ));
      setWorkoutsView(myWorkouts);
    }
  };

  useEffect(() => {
    handleWorkouts();
  }, []);

  return <div className="myWorkouts">{workoutsView}</div>;
};
export default MyWorkouts;
