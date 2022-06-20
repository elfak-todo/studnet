import { useContext, useEffect } from "react";
import axios from "axios";

import { SERVER_ADDRESS } from "./config";
import StudentContext from "./components/studentManager/StudentManager.js";

function AxiosConfig() {
  const { student, setStudent } = useContext(StudentContext);

  useEffect(() => {
    axios.defaults.baseURL = SERVER_ADDRESS;

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        if (error.response.status === 401) {
          //TODO eventualno ovde može da se prikaže obaveštenje da je token istekao
          setStudent(null);
        }
        return Promise.reject(error);
      }
    );
  }, [setStudent]);

  useEffect(() => {
    axios.defaults.headers["Authorization"] = student
      ? "Bearer " + student.accessToken
      : null;
  }, [student]);

  return null;
}

export default AxiosConfig;
