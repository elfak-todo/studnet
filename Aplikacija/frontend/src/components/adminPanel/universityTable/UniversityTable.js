import axios from "axios";
import { useTranslation } from "react-i18next";
import { Spinner, Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

function UniversityTable() {
  const { t } = useTranslation(["admin", "event", "misc"]);

  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const [universites, setUniversities] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios.get(`University/List/${pageNum}`).then((res) => {
      if (pageNum === 0)
        setUniversities(res.data.length === 0 ? null : res.data);
      else {
        setUniversities((state) => {
          if (state) return [...state, ...res.data];
          else return res.data;
        });
      }
      setHasMore(res.data.length > 0);
      setLoading(false);
    });
  }, [pageNum]);

  const loadMore = () => {
    if (loading) return;
    if (!hasMore) return;
    setPageNum((prev) => prev + 1);
  };

  return (
    <>
      <Table striped hover responsive className="shadow">
        <thead className="student-thead text-center">
          <tr>
            {[
              "",
              "name",
              "regFaculties",
              "regStudents",
              "postCount",
              "locationCount",
              "eventCount",
            ].map((col) => (
              <th key={col}> {t(col)} </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {universites?.map((u, i) => (
            <tr key={u.id}>
              <td> {i + 1} </td>
              <td>{u.name}</td>
              <td>{u.parlamentCount}</td>
              <td>{u.userCount}</td>
              <td>{u.postCount}</td>
              <td>{u.locationCount}</td>
              <td>{u.eventCount}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        {loading && (
          <Spinner
            as="span"
            animation="border"
            size="md"
            variant="primary"
            role="status"
            aria-hidden="true"
          />
        )}

        {universites === null ? (
          <p className="load-more">{t("event:nothingToShow")}</p>
        ) : hasMore ? (
          <p className="load-more" onClick={loadMore}>
            {t("event:loadMore")} <FontAwesomeIcon icon={faAngleDown} />
          </p>
        ) : (
          !loading && (
            <p className="load-more">{t("misc:noMoreThingsToLoad")}</p>
          )
        )}
      </div>
    </>
  );
}

export default UniversityTable;
