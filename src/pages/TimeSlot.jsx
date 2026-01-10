import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./timeSlot.css";

const TimeSlot = () => {
  const { userData, setUserData } = useContext(UserContext);
  const navigate = useNavigate();

  const [timeslot, setTimeslot] = useState([
    "5:30 AM - 6:30 AM",
    "6:00 AM - 7:00 AM",
    "11:00 AM - 12:00 PM",
    "2:00 PM - 3:00 PM",
    "6:00 PM - 7:00 PM",
  ]);

  const [selected, setSelected] = useState("");
  const [newTime, setNewTime] = useState("");

  const selectTime = (time) => {
    setSelected(time);
  };

  const addTimeSlot = () => {
    if (newTime.trim() !== "") {
      setTimeslot([...timeslot, newTime]);
      setNewTime("");
    }
  };

  const handleNext = () => {
    if (!selected) {
      alert("Please select a time slot");
      return;
    }
    setUserData({ ...userData, time: selected });
    navigate("/location");
  };

  return (
    <div className="time-container">
      {/* Title */}
      <div className="time-header">
        <h2>Choose Your Study Time</h2>
        <p>Select a comfortable time slot or add your own</p>
      </div>

      {/* Time Cards */}
      <div className="time-card">
        {timeslot.map((time, index) => (
          <div
            key={index}
            className={`time-box ${selected === time ? "active" : ""}`}
            onClick={() => selectTime(time)}
          >
            {time}
          </div>
        ))}
      </div>

      {/* Add Time Slot */}
      <div className="add-time-card">
        <input
          type="text"
          placeholder="Add custom time slot"
          value={newTime}
          onChange={(e) => setNewTime(e.target.value)}
        />
        <button onClick={addTimeSlot}>Add</button>
      </div>

      {/* Next Button */}
      <button className="next-btn" onClick={handleNext}>
        Continue →
      </button>
    </div>
  );
};

export default TimeSlot;
