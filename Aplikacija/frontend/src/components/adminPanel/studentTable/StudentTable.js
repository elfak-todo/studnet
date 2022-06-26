import axios from "axios";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Spinner, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faUserGraduate,
  faClipboard,
  faLocationDot,
  faCalendarCheck,
} from "@fortawesome/free-solid-svg-icons";

import { useContext, useEffect, useState } from "react";
import CountUp from "../../countUp/CountUp";
import StudentContext from "../../studentManager/StudentManager";

import "./StudentTable.style.css";

function StudentTable({ students, hasMore, setPageNum, fetching }) {
  const { t } = useTranslation(["register", "misc", "event", "admin"]);

  const navigate = useNavigate();
  const { student } = useContext(StudentContext);

  const [counters, setCounters] = useState([]);

  const theadAdmin = [
    "",
    "name",
    "username",
    "email",
    "university",
    "faculty",
    "role",
    "gender",
    "onExchange",
    "banned",
  ];
  const theadParlament = [
    "",
    "name",
    "username",
    "role",
    "gender",
    "onExchange",
  ];
  const theadToMap =
    student.role === 3
      ? theadAdmin
      : student.role === 1
      ? theadParlament
      : null;

  useEffect(() => {
    if (student.role < 3) return;
    axios.get("Student/InterestingData").then((res) => {
      setCounters(res.data);
    });
  }, [student.role]);

  const getRole = (role) => {
    switch (role) {
      case 0:
        return "Student";
      case 1:
        return t("misc:parlamentMember");
      case 2:
        return t("misc:universityAdmin");
      case 3:
        return t("misc:admin");
      default:
        break;
    }
  };

  const loadMore = () => {
    if (fetching) return;
    if (!hasMore) return;
    setPageNum((prev) => prev + 1);
  };

  return (
    <>
      {student.role === 3 && (
        <div className="d-flex justify-content-center">
          <div className="student-counter">
            <FontAwesomeIcon
              icon={faUserGraduate}
              className="student-icon-counter"
            />
            <p className="m-0">{t("misc:students")}</p>
            <CountUp end={counters.studentCounter} />
          </div>
          <div className="student-counter">
            <FontAwesomeIcon
              icon={faClipboard}
              className="student-icon-counter"
            />
            <p className="m-0">{t("misc:posts")}</p>
            <CountUp end={counters.postCounter} />
          </div>
          <div className="student-counter">
            <FontAwesomeIcon
              icon={faCalendarCheck}
              className="student-icon-counter"
            />
            <p className="m-0">{t("misc:events")}</p>
            <CountUp end={counters.eventCounter} />
          </div>
          <div className="student-counter">
            <FontAwesomeIcon
              icon={faLocationDot}
              className="student-icon-counter"
            />
            <p className="m-0">{t("misc:locations")}</p>
            <CountUp end={counters.locationsCounter} />
          </div>
        </div>
      )}
      <Table striped hover responsive className="shadow mt-2">
        <thead className="student-thead text-center">
          <tr>
            {theadToMap.map((col) => (
              <th key={col}> {t(`register:${col}`)} </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {students?.map((s, i) => (
            <tr
              key={s.id}
              onClick={() => navigate("/student/" + s.id)}
              className="student-row"
              style={{ backgroundColor: s.isBanned && "#ffcccc" }}
            >
              <td> {i + 1} </td>
              <td>{s.firstName + " " + s.lastName}</td>
              <td>{s.username}</td>
              {student.role === 3 && (
                <>
                  <td>{s.email}</td>
                  <td>{s.universityName}</td>
                  <td>{s.facultyName}</td>
                </>
              )}
              <td>{getRole(s.role)}</td>
              <td>{s.gender === "m" ? t("misc:male") : t("misc:female")} </td>
              <td>{s.isExchange ? t("admin:yes") : t("admin:no")}</td>
              {student.role === 3 && (
                <td>{s.isBanned ? t("admin:yes") : t("admin:no")}</td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        {fetching && (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}

        {students === null ? (
          <p className="load-more">{t("event:nothingToShow")}</p>
        ) : hasMore ? (
          <p className="load-more" onClick={loadMore}>
            {t("event:loadMore")} <FontAwesomeIcon icon={faAngleDown} />
          </p>
        ) : (
          <p className="load-more">{t("misc:noMoreThingsToLoad")}</p>
        )}
      </div>
    </>
  );
}

export default StudentTable;
