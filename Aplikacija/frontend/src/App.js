import NavigationBar from "./components/navbar/NavigationBar";
import AppRoutes from "./AppRoutes";
import AxiosConfig from "./AxiosConfig";

import { StudentManager } from "./components/studentManager/StudentManager";

function App() {
  return (
    <StudentManager>
      <AxiosConfig />
      <NavigationBar />
      <AppRoutes />
    </StudentManager>
  );
}

export default App;
