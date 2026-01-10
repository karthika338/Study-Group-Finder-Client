import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./createGroup.css";

const CreateGroup = () => {
  const { setGroups } = useContext(UserContext);
  const navigate = useNavigate();

  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const handleCreate = () => {
    if (!subject || !time || !location) {
      alert("Please fill all fields");
      return;
    }

    const newGroup = {
      id: Date.now(),
      subject,
      time,
      location,
      slots: 5,
    };

    setGroups(prev => [...prev, newGroup]);
    alert("Group created successfully!");
    navigate("/groups");
  };

  return (
    <div className="create-group-container">
      <div className="overlay">
        <div className="create-card">
          <h1 className="page-title">📚 Study Group Hub</h1>
          <p className="subtitle">Create your own learning circle</p>

          <input
            placeholder="📘 Subject Name"
            value={subject}
            onChange={e => setSubject(e.target.value)}
          />

          <input
            placeholder="⏰ Time Slot"
            value={time}
            onChange={e => setTime(e.target.value)}
          />

          <input
            placeholder="📍 Location"
            value={location}
            onChange={e => setLocation(e.target.value)}
          />

          <button onClick={handleCreate}>Create Group</button>
        </div>
      </div>
    </div>
  );
};

export default CreateGroup;
