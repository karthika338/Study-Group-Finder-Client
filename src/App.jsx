import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserProvider from "./context/UserContext";

import Signin from "./pages/Signin";
import Home from "./pages/Home";
import TimeSlot from "./pages/TimeSlot";
import Location from "./pages/Location";
import Groups from "./pages/Groups";
import CreateGroup from "./pages/CreateGroup";


function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/home" element={<Home />} />
          <Route path="/time" element={<TimeSlot />} />
          <Route path="/location" element={<Location />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/create" element={<CreateGroup />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
