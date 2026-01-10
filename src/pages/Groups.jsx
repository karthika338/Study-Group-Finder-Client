import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import "./groups.css";

const Groups = () => {
  const { groups, setGroups, userData } = useContext(UserContext);
  const navigate = useNavigate();

  // ✅ SAFE FILTER
  const filteredGroups =
    userData?.time || userData?.location
      ? groups.filter(
          (g) =>
            (!userData.time ||
              g.time
                .toLowerCase()
                .includes(userData.time.toLowerCase())) &&
            (!userData.location ||
              g.location
                .toLowerCase()
                .includes(userData.location.toLowerCase()))
        )
      : groups;

  const joinGroup = (id) => {
    setGroups((prev) =>
      prev.map((g) =>
        g.id === id && g.slots > 0
          ? { ...g, slots: g.slots - 1 }
          : g
      )
    );
    alert("You joined the group 🎉");
  };

  return (
    <div className="groups-container">
      <h2>Available Study Groups</h2>

      {filteredGroups.length === 0 ? (
        <div className="no-groups">
          <p>No groups available 😕</p>
          <button onClick={() => navigate("/create")}>
            Create New Group
          </button>
        </div>
      ) : (
        <div className="group-grid">
          {filteredGroups.map((group) => {
            const total = 6;
            const filled = total - group.slots;

            return (
              <div className="group-card" key={group.id}>
                <h3>{group.subject}</h3>
                <p>⏰ {group.time}</p>
                <p>📍 {group.location}</p>

                <p className="members">
                  👥 Members: {filled}/{total}
                </p>

                <button
                  disabled={group.slots === 0}
                  onClick={() => joinGroup(group.id)}
                >
                  {group.slots === 0
                    ? "Group Full"
                    : "Join Group"}
                </button>
              </div>
            );
          })}
        </div>
      )}

      <div className="group-actions">
        <button onClick={() => navigate("/home")}>
          ⬅ Go Home
        </button>
        <button onClick={() => navigate("/create")}>
          ➕ Create Group
        </button>
      </div>
    </div>
  );
};

export default Groups;
