import "./App.css";

import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import ExerciseSearch from "./pages/ExerciseSearch/ExerciseSearch";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MyWorkouts from "./pages/MyWorkouts/MyWorkouts";
import Workout from "./pages/Workout/Workout";
import Exercises from "./pages/Exercises/Exercises";
import { useEffect, useState } from "react";
import CreateExercise from "./pages/CreateExercise/CreateExercise";
import MyExercises from "./pages/MyExercises/MyExercises";
import CreateWorkout from "./pages/CreateWorkout/CreateWorkout";

function App() {
  const [exerciseRes, setExerciseRes] = useState([]);
  const [myWorkout, setMyWorkout] = useState([]);
  const [editWorkout, setEditWorkout] = useState(null);

  const navigate = useNavigate();

  const handleEdit = () => {
    setEditWorkout(myWorkout);
    navigate("/createWorkout");
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/exerciseSearch");
    }
  }, []);

  return (
    <>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/exerciseSearch"
            element={<ExerciseSearch setExerciseRes={setExerciseRes} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/myWorkouts"
            element={<MyWorkouts setMyWorkout={setMyWorkout} />}
          />
          <Route
            path="/workout"
            element={<Workout myWorkout={myWorkout} handleEdit={handleEdit} />}
          />
          <Route
            path="/exercises"
            element={<Exercises exerciseRes={exerciseRes} />}
          />
          <Route path="/createExercise" element={<CreateExercise />} />
          <Route path="/myExercises" element={<MyExercises />} />
          <Route
            path="/createWorkout"
            element={
              <CreateWorkout
                editWorkout={editWorkout}
                setEditWorkout={setEditWorkout}
              />
            }
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
