import "./SearchBar.scss";

const SearchBar = ({
  selectedType,
  setSelectedType,
  searchValue,
  setSearchValue,
  handleSearch,
  selectedMuscle,
  setSelectedMuscle,
  selectedDifficulty,
  setSelectedDifficulty,
}) => {
  return (
    <div className="searchbar">
      <form onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Search by name..."
          aria-label="Search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <select
          name="typeOptions"
          id="typeOptions"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          role="type"
        >
          <option value="">Select a type...</option>
          <option value="cardio">Cardio</option>
          <option value="olympic_weightlifting">Olympic Weightlifting</option>
          <option value="plyometrics">Plyometrics</option>
          <option value="powerlifting">Powerlifting</option>
          <option value="strength">Strength</option>
          <option value="stretching">Stretching</option>
          <option value="strongman">Strongman</option>
        </select>
        <select
          name="typeOptions"
          id="typeOptions"
          value={selectedMuscle}
          onChange={(e) => setSelectedMuscle(e.target.value)}
          role="muscle"
        >
          <option value="">Select a muscle group...</option>
          <option value="abdominals">Abdominals</option>
          <option value="abductors">Abductors</option>
          <option value="adductors">Adductors</option>
          <option value="biceps">Biceps</option>
          <option value="calves">Calves</option>
          <option value="chest">Chest</option>
          <option value="forearms">Forearms</option>
          <option value="glutes">Glutes</option>
          <option value="hamstrings">Hamstrings</option>
          <option value="lats">Lats</option>
          <option value="lower_back">Lower back</option>
          <option value="middle_back">Middle back</option>
          <option value="neck">Neck</option>
          <option value="quadriceps">Quadriceps</option>
          <option value="traps">Traps</option>
          <option value="triceps">Triceps</option>
        </select>
        <select
          name="typeOptions"
          id="typeOptions"
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          role="difficulty"
        >
          <option value="">Select a difficulty...</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="expert">Expert</option>
        </select>
        <button type="submit" role="search">
          Search
        </button>
      </form>
    </div>
  );
};
export default SearchBar;
