import React, { useEffect, useState, useRef } from "react";

const StudentContext = React.createContext();

export const StudentManager = ({ children }) => {
  const [student, setStudent] = useState(
    JSON.parse(localStorage.getItem("student"))
  );

  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) {
      didMount.current = false;
      return;
    }
    localStorage.setItem("student", JSON.stringify(student));
  }, [student]);

  return (
    <StudentContext.Provider value={{ student, setStudent }}>
      {children}
    </StudentContext.Provider>
  );
};

export default StudentContext;
