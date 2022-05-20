import { useEffect, useState } from "react";

const useStudent = () => {
  const [student, setStudent] = useState(
    JSON.parse(localStorage.getItem("student"))
  );

  console.log("loading ", student);

  useEffect(() => {
    localStorage.setItem("student", JSON.stringify(student));
    console.log("saving ", student);
  }, [student]);

  return [student, setStudent];
};

export default useStudent;
