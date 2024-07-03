import "./Register.scss";

import { useState } from "react";
import { NavLink } from "react-router-dom";
import { registerService } from "../../utils/user.service";
import ErrorModal from "../../components/ErrorModal/ErrorModal";
import SuccessModal from "../../components/SuccessModal/SuccessModal";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerService({ email, password });
      if (res.status === 201) {
        setModal(true);
        setModalMessage(`Successfully created account with email: ${res.data}`);
      } else {
        setErrorModal(true);
        setModalMessage(res.response.data.error);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleClose = () => {
    setModal(false);
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
      <div className="register">
        <h2>Create new account</h2>
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
            Register
          </button>
        </form>
        <div className="loginSection">
          <h2>Back to login</h2>
          <NavLink to="/login">
            <button type="submit">Login page</button>
          </NavLink>
        </div>
      </div>
    </>
  );
};
export default Register;
