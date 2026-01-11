import { useEffect, useState } from "react";
import api from "../api/axios";
import "./groups.css";

const Groups = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    api.get("/groups/getgroup").then((res) => {
      setGroups(res.data);
    });
  }, []);

  const joinGroup = async (id) => {
    await api.put(`/groups/join/${id}`);
    setGroups((prev) =>
      prev.map((g) =>
        g._id === id ? { ...g, slots: g.slots - 1 } : g
      )
    );
  };

  return (
    <div className="groups-container">
      {groups.map((g) => (
        <div key={g._id} className="group-card">
          <h3>{g.subject}</h3>
          <p>{g.time}</p>
          <p>{g.location}</p>
          <p>Slots: {g.slots}</p>
          <button disabled={g.slots === 0} onClick={() => joinGroup(g._id)}>
            Join
          </button>
        </div>
      ))}
    </div>
  );
};

export default Groups;