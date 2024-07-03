import { createExerciseService } from "../../utils/user.service";
import "./CreateExercise.scss";
import { useState } from "react";
import SuccessModal from "../../components/SuccessModal/SuccessModal";
import ErrorModal from "../../components/ErrorModal/ErrorModal";

const CreateExercise = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [muscle, setMuscle] = useState("");
  const [equipment, setEquipment] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [instructions, setInstructions] = useState("");
  const [modal, setModal] = useState(false);
  const [errorModal, setErrorModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const exercise = {
      name: name,
      type: type,
      muscle: muscle,
      equipment: equipment,
      difficulty: difficulty,
      instructions: instructions,
    };
    const userId = localStorage.getItem("user");
    try {
      const res = await createExerciseService({ exercise, userId });
      if (res.status === 201) {
        setModal(true);
        setModalMessage("Exercise created successfully");
      } else {
        setErrorModal(true);
        setModalMessage(res.response.data.message);
      }
    } catch (e) {
      setErrorModal(true);
      setModalMessage(e);
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
      <div className="createExercise">
        <h3>Create new exercise</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Exercise name..."
            aria-label="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Exercise type..."
            aria-label="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
          <input
            type="text"
            placeholder="Muscle group..."
            aria-label="muscle"
            value={muscle}
            onChange={(e) => setMuscle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Equipment used..."
            aria-label="equipment"
            value={equipment}
            onChange={(e) => setEquipment(e.target.value)}
          />
          <input
            type="text"
            placeholder="Difficulty..."
            aria-label="difficulty"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          />
          <input
            type="text"
            placeholder="Instructions..."
            aria-label="instructions"
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  );
};
export default CreateExercise;
