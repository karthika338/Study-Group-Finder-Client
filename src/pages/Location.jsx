import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./location.css";

const Location = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const [locations, setLocations] = useState([
    "Library",
    "Hostel",
    "Canteen",
    "Classroom",
    "Online",
  ]);

  const [selected, setSelected] = useState("");
  const [newLocation, setNewLocation] = useState("");

  const selectLocation = (loc) => {
    setSelected(loc);
  };

  const addLocation = () => {
    if (newLocation.trim() !== "") {
      setLocations([...locations, newLocation]);
      setNewLocation("");
    }
  };

  const handleNext = () => {
    if (!selected) {
      alert("Please select a location");
      return;
    }
    setUserData({ ...userData, location: selected });
    navigate("/groups");
  };

  return (
    <div className="location-container">
      {/* Header */}
      <div className="location-header">
        <h2>Choose Study Location</h2>
        <p>Pick where your study group will meet or add your own</p>
      </div>

      {/* Location Cards */}
      <div className="location-card">
        {locations.map((loc, index) => (
          <div
            key={index}
            className={`location-box ${
              selected === loc ? "active" : ""
            }`}
            onClick={() => selectLocation(loc)}
          >
            {loc}
          </div>
        ))}
      </div>

      {/* Add Location */}
      <div className="add-location-card">
        <input
          type="text"
          placeholder="Add custom location"
          value={newLocation}
          onChange={(e) => setNewLocation(e.target.value)}
        />
        <button onClick={addLocation}>Add</button>
      </div>

      {/* Continue */}
      <button className="next-btn" onClick={handleNext}>
        View Groups →
      </button>
    </div>
  );
};

export default Location;
