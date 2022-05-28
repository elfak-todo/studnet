import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import StudentContext from "./components/studentManager/StudentManager.js";
import EventsPage from "./pages/EventsPage";
import HomePage from "./pages/HomePage";
import LocationCreationPage from "./pages/LocationCreationPage.js";
import LocationPage from "./pages/LocationPage.js";
import LocationsPage from "./pages/LocationsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function AppRoutes() {
  const { student } = useContext(StudentContext);

  return student ? (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/register" element={<Navigate replace to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/locations" element={<LocationsPage />} />
      <Route path="/location/:locationId" element={<LocationPage />} />
      <Route path="/location/create" element={<LocationCreationPage />} />
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
