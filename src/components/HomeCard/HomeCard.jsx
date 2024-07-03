import { NavLink } from "react-router-dom";
import "./HomeCard.scss";

const HomeCard = ({ name, description, image, link }) => {
  return (
    <NavLink to={link} className="link">
      <div className="homeCard">
        <img src={`/img/${image}.jpg`} alt="" />
        <div className="text">
          <h3>{name}</h3>
          <p>{description}</p>
        </div>
      </div>
    </NavLink>
  );
};
export default HomeCard;
