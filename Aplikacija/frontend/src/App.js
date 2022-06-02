import NavigationBar from "./components/navbar/NavigationBar";
import AppRoutes from "./AppRoutes";
import AxiosConfig from "./AxiosConfig";
import { Suspense } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./scss/theme.scss";
import { StudentManager } from "./components/studentManager/StudentManager";
import LoadingSpinner from "./components/loadingSpinner/LoadingSpinner.js";

function App() {
  return (
    <StudentManager>
      <AxiosConfig />
      <NavigationBar />
      <Suspense fallback={<LoadingSpinner />}>
        <AppRoutes />
      </Suspense>
    </StudentManager>
  );
}

export default App;
