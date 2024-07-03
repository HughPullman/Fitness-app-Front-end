import "./Navbar.scss";

import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/exerciseSearch");
  };

  return (
    <div className="navbar">
      <NavLink to="/exerciseSearch" className="link">
        <img src="/img/logo.png" alt="" />
      </NavLink>
      {localStorage.getItem("user") && (
        <>
          <NavLink to="/" className="link">
            <span>Home</span>
          </NavLink>
          <NavLink to="/myExercises" className="link">
            <span>My Exercises</span>
          </NavLink>
          <NavLink to="/myWorkouts" className="link">
            <span>My Workouts</span>
          </NavLink>
        </>
      )}
      <NavLink to="/exerciseSearch" className="link">
        <span>Exercises</span>
      </NavLink>

      {localStorage.getItem("user") ? (
        <span onClick={() => handleLogout()}>Logout</span>
      ) : (
        <NavLink to="/login" className="link">
          <span>Login</span>
        </NavLink>
      )}
    </div>
  );
};
export default Navbar;
