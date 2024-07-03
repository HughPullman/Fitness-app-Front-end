import { useState } from "react";
import { findExercises } from "../../utils/findExercise.service";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./ExerciseSearch.scss";
import { useNavigate } from "react-router-dom";

const ExerciseSearch = ({ setExerciseRes }) => {
  const [selectedType, setSelectedType] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [selectedMuscle, setSelectedMuscle] = useState("");
  const [selectedDifficulty, setSelectedDifficulty] = useState("");

  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    const data = await findExercises({
      searchValue,
      selectedType,
      selectedMuscle,
      selectedDifficulty,
    });
    if (data.status === 200) {
      setExerciseRes(data.data);
      navigate("/exercises");
    }
  };

  return (
    <div className="exerciseSearch">
      <h3>Search for an exercise</h3>
      <SearchBar
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleSearch={handleSearch}
        selectedMuscle={selectedMuscle}
        setSelectedMuscle={setSelectedMuscle}
        selectedDifficulty={selectedDifficulty}
        setSelectedDifficulty={setSelectedDifficulty}
      />
    </div>
  );
};
export default ExerciseSearch;
