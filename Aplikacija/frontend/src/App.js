import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/navbar/NavigationBar";
import EventsPage from "./pages/EventsPage";
import HomePage from "./pages/HomePage";
import LocationsPage from "./pages/LocationsPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function App() {
  return (
    <>
    <NavigationBar/>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/events" element={<EventsPage />} />
      <Route path="/locations" element={<LocationsPage />} />
    </Routes>
    </>
  );
}

export default App;
