import "./Login.scss";

import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { loginService } from "../../utils/user.service";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import SuccessModal from "../../components/SuccessModal/SuccessModal";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginService({ email, password });
      if (res.status === 200) {
        setModal(true);
        setModalMessage(`Logged in with ${res.data.email}`);
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("user", res.data.id);
        localStorage.setItem("userEmail", res.data.email);
        setEmail("");
        setPassword("");
      } else {
        setErrorModal(true);
        setModalMessage(res.response.data.error);
      }
    } catch (e) {
      setErrorModal(true);
      setModalMessage(e);
    }
  };

  const handleClose = () => {
    if (modal) {
      setModal(false);
      navigate("/");
    }
    setErrorModal(false);
  };

  return (
    <>
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
      {localStorage.getItem("userEmail") ? (
        <div className="login">
          <h3>You are logged in with {localStorage.getItem("userEmail")}</h3>
        </div>
      ) : (
        <div className="login">
          <h2>User Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <button type="submit" role="login">
              Login
            </button>
          </form>
          <div className="registerSection">
            <h2>Don't have an account?</h2>
            <NavLink to="/register">
              <button>Sign Up</button>
            </NavLink>
          </div>
        </div>
      )}
    </>
  );
};
export default Login;
