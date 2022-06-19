import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import * as XLSX from "xlsx";

import { parseDate } from "../../../helpers/DateParser.js";
import "./ReservationTable.style.css";

function ReservationTable({ event }) {
  const { t, i18n } = useTranslation(["event"]);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [students, setStudents] = useState(null);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`Reservation/Event/${event.id}/${pageNum}`)
      .then((res) => {
        if (pageNum === 0) setStudents(res.data.length === 0 ? null : res.data);
        else {
          setStudents((state) => {
            if (state) return [...state, ...res.data];
            else return res.data;
          });
        }
        setHasMore(res.data.length > 0);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [event, pageNum]);

  const handleExport = () => {
    setFetching(true);
    axios
      .get(`Reservation/EventReservations/${event.id}`)
      .then((res) => {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(res.data);
        XLSX.utils.book_append_sheet(wb, ws, "Reservations");
        XLSX.writeFile(wb, "Reservations.xlsx");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setFetching(false);
      });
  };

  const loadMore = () => {
    if (loading) return;
    if (!hasMore) return;
    setPageNum((prev) => prev + 1);
  };

  return (
    <>
      <div>
        <Button
          variant="outline-primary"
          onClick={handleExport}
          className="p-2 m-2"
        >
          {fetching && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          <FontAwesomeIcon icon={faDownload} /> {t("download")}
        </Button>
      </div>
      <Table striped hover responsive>
        <thead className="student-thead">
          <tr>
            {[
              "",
              "name",
              "username",
              "faculty",
              "ticketsNum",
              "timeOfReservation",
            ].map((col) => (
              <th key={col}> {t(col)} </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {students?.map((s, i) => (
            <tr key={i}>
              <td> {i + 1} </td>
              <td>{s.author.firstName + " " + s.author.lastName}</td>
              <td> {s.author.username} </td>
              <td>{s.author.facultyName}</td>
              <td>{s.reservation.numberOfTickets}</td>
              <td>{parseDate(s.reservation.reservationTime, i18n.language)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        {loading && (
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
            style={{ color: "#4e54c8" }}
          />
        )}
        {students !== null ? (
          <p className="load-more" onClick={loadMore}>
            {t("loadMore")} <FontAwesomeIcon icon={faAngleDown} />
          </p>
        ) : (
          <p className="load-more">{t("nothingToShow")}</p>
        )}
      </div>
    </>
  );
}

export default ReservationTable;
