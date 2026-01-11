import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import "./createGroup.css";

const CreateGroup = () => {
  const navigate = useNavigate();
  const [subject, setSubject] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");

  const handleCreate = async () => {
    try {
      await api.post("/groups/create", {
        subject,
        time,
        location,
      });
      alert("Group created 🎉");
      navigate("/groups");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="create-group-container">
      <input onChange={(e) => setSubject(e.target.value)} placeholder="Subject" />
      <input onChange={(e) => setTime(e.target.value)} placeholder="Time" />
      <input onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

export default CreateGroup;