import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";

import ResourceNotFound from "../components/resourceNotFound/ResourceNotFound.js";
import ProfileSection from "../components/profile/profileSection/ProfileSection.js";

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

    //TEST
    axios.get(`Student/${studentId}/Events/0`).then((res) => {
      console.log("Events", res.data);
    });
    axios.get(`Student/${studentId}/Posts/0`).then((res) => {
      console.log("Posts", res.data);
    });
    axios.get(`Student/${studentId}/Locations/0`).then((res) => {
      console.log("Locations", res.data);
    });
    //TEST END
  }, [studentId]);

  return student !== null ? (
    <ProfileSection student={student} />
  ) : (
    <ResourceNotFound text={t("studentNotFound")} />
  );
}

export default StudentPage;
