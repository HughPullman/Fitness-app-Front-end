import HomeCard from "../../components/HomeCard/HomeCard";
import MyWorkouts from "../MyWorkouts/MyWorkouts";
import "./Home.scss";

const Home = () => {
  return (
    <div className="home">
      <div className="cards">
        <HomeCard
          name={"My Workouts"}
          description={"Check out your saved workouts"}
          image={"MyWorkouts"}
          link={"/myWorkouts"}
        />
        <HomeCard
          name={"Find Exercises"}
          description={"Discover new exercises"}
          image={"FindExercises"}
          link={"/exerciseSearch"}
        />
        <HomeCard
          name={"Create new Exercises"}
          description={"Create your own exercise to add to your workout"}
          image={"CreateExercise"}
          link={"/createExercise"}
        />
        <HomeCard
          name={"Create new Workout"}
          description={"Create a new workout routine"}
          image={"CreateNewWorkout"}
          link={"/createWorkout"}
        />
      </div>
    </div>
  );
};
export default Home;
