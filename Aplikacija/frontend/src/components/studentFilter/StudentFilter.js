import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Alert, Spinner } from "react-bootstrap";

import SelectUniversity from "../selectUniveristy/SelectUniveristy.js";
import SelectFaculty from "../selectFaculty/SelectFaculty.js";

import "./StudentFilter.style.css";

function StudentFilter({
  setStudents,
  setRefresh,
  showFilterLabel,
  setShowFilterLabel,
}) {
  const { t } = useTranslation(["misc"]);

  const [loading, setLoading] = useState(false);

  const [uniName, setUniName] = useState("university");
  const [facName, setFacName] = useState("faculty");

  const [selectedUni, setSelectedUni] = useState("0");
  const [selectedFac, setSelectedFac] = useState("0");
  const [uniInvalid, setUniInvalid] = useState(false);
  const [facInvalid, setFacInvalid] = useState(false);

  const handleFilter = () => {
    if (selectedUni === undefined || selectedUni === "0") {
      setUniInvalid(true);
      return;
    }
    if (selectedFac === undefined || selectedFac === "0") {
      setFacInvalid(true);
      return;
    }
    setLoading(true);
    axios
      .get(`Student/GetStudents/${selectedUni}/${selectedFac}/${0}`)
      .then((res) => {
        setStudents(res.data.selectedStudents);
        setFacName(res.data.parlament.facultyName);
        setUniName(res.data.university.name);
        setShowFilterLabel(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
      });
  };

  const closeFilter = () => {
    setShowFilterLabel(false);
    setSelectedUni("0");
    setSelectedFac("0");
    setRefresh(true);
  };

  return (
    <div className="p-3">
      <SelectUniversity
        selectedUni={selectedUni}
        setSelectedUni={setSelectedUni}
        invalid={uniInvalid}
        setInvalid={setUniInvalid}
      />
      <SelectFaculty
        selectedUni={selectedUni}
        selectedFac={selectedFac}
        setSelectedFac={setSelectedFac}
        invalid={facInvalid}
        setInvalid={setFacInvalid}
      />
      <div className="d-flex justify-content-end">
        <Button onClick={handleFilter}>
          {loading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          {t("filterBtn")}
        </Button>
      </div>
      <div>
        <hr />
        <Alert
          show={showFilterLabel}
          variant="primary"
          dismissible
          transition
          className="m-2"
          onClose={closeFilter}
        >
          {`${t("filteredBy")} ${uniName}, ${facName}`}
        </Alert>
      </div>
    </div>
  );
}

export default StudentFilter;
