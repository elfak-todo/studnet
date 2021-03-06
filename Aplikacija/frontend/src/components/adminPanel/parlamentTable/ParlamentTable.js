import axios from "axios";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Spinner, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import EditParlament from "../editParlament/EditParlament";

function ParlamentTable({
  parlaments,
  setParlaments,
  showAddPar,
  setShowAddPar,
}) {
  const { t } = useTranslation(["admin", "event", "misc"]);

  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(0);
  const [hasMore, setHasMore] = useState(false);

  const [showEdit, setShowEdit] = useState(false);
  const [parId, setParId] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(`Parlament/List/${pageNum}`).then((res) => {
      if (pageNum === 0) setParlaments(res.data.length === 0 ? null : res.data);
      else {
        setParlaments((state) => {
          if (state) return [...state, ...res.data];
          else return res.data;
        });
      }
      setHasMore(res.data.length > 0);
      setLoading(false);
    });
  }, [pageNum, setParlaments]);

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
              "parlamentName",
              "facultyName",
              "memberCount",
              "eventCount",
            ].map((col) => (
              <th key={col}> {t(col)} </th>
            ))}
          </tr>
        </thead>
        <tbody className="text-center">
          {parlaments?.map((p, i) => (
            <tr
              key={p.id}
              onClick={() => {
                setShowEdit(true);
                setParId(p.id);
              }}
              className="student-row"
            >
              <td> {i + 1} </td>
              <td>{p.name}</td>
              <td>{p.facultyName}</td>
              <td>{p.memberCount}</td>
              <td>{p.eventCount}</td>
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

        {parlaments === null ? (
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
      <EditParlament
        parId={parId}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
        setParlaments={setParlaments}
      />
    </>
  );
}

export default ParlamentTable;
