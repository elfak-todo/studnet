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
import ParlamentMemberPage from "./pages/ParlamentMemberPage.js";
import UniAdminPage from "./pages/UniAdminPage.js";
import RegisterPage from "./pages/RegisterPage";
import StudentPage from "./pages/StudentPage.js";
import LocationEditPage from "./pages/LocationEditPage.js";
import ResourceNotFound from "./components/resourceNotFound/ResourceNotFound.js";

function AppRoutes() {
  const { student } = useContext(StudentContext);

  return student ? (
    <Routes>
      <Route path="/" element={<Navigate replace to="/home" />} />
      <Route path="/register" element={<Navigate replace to="/home" />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/event/:eventId" element={<EventPage />} />
      <Route path="/locations" element={<LocationsPage />} />
      <Route path="/location/:locationId" element={<LocationPage />} />
      <Route path="/location/create" element={<LocationCreationPage />} />
      <Route path="/location/edit/:locationId" element={<LocationEditPage />} />
      <Route path="/student/:studentId" element={<StudentPage />} />
      <Route path="/parlament" element={<ParlamentMemberPage />} />
      <Route path="/university" element={<UniAdminPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<ResourceNotFound />} />
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
