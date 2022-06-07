import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import StudentContext from "./components/studentManager/StudentManager.js";
import AdminPage from "./pages/AdminPage.js";
import EventPage from "./pages/EventPage.js";
import EventsPage from "./pages/EventsPage";
import HomePage from "./pages/HomePage";
import LocationCreationPage from "./pages/LocationCreationPage.js";
import LocationPage from "./pages/LocationPage.js";
import LocationsPage from "./pages/LocationsPage";
import LoginPage from "./pages/LoginPage";
import ParlamentPage from "./pages/ParlamentPage.js";
import RegisterPage from "./pages/RegisterPage";
import StudentPage from "./pages/StudentPage.js";
import ModPage from "./pages/ModPage.js";

function AppRoutes() {
  const { student } = useContext(StudentContext);

  return student ? (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/register" element={<Navigate replace to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/event" element={<EventPage />} />
      <Route path="/locations" element={<LocationsPage />} />
      <Route path="/location/:locationId" element={<LocationPage />} />
      <Route path="/location/create" element={<LocationCreationPage />} />
      <Route path="/student/:studentId" element={<StudentPage />} />
      <Route path="/parlament/:parlamentId" element={<ParlamentPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/mod" element={<ModPage/>} />
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="*" element={<Navigate replace to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
