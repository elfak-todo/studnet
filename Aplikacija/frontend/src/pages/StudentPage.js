import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import ResourceNotFound from "../components/resourceNotFound/ResourceNotFound.js";

function StudentPage() {
  const { t } = useTranslation(["students"]);
  const studentId = useParams().studentId;

  const [student, setStudent] = useState(undefined);

  useEffect(() => {
    axios
      .get(`Student/${studentId}`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setStudent(null);
        }
      });
  }, [studentId]);

  return student !== null ? (
    <h1>{student?.id}</h1>
  ) : (
    <ResourceNotFound text={t("studentNotFound")} />
  );
}

export default StudentPage;
