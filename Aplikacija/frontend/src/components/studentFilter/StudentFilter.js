import axios from "axios";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card, Container, Button } from "react-bootstrap";

import SelectUniversity from "../selectUniveristy/SelectUniveristy.js";
import SelectFaculty from "../selectFaculty/SelectFaculty.js";

import "./StudentFilter.style.css";

function StudentFilter({ students, setStudents }) {
  const { t } = useTranslation(["misc"]);

  const [selectedUni, setSelectedUni] = useState();
  const [selectedFac, setSelectedFac] = useState();
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

    axios
      .get(`Student/GetStudents/${selectedUni}/${selectedFac}/${0}`)
      .then((res) => {
        setStudents(res.data);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  return (
    <Container>
      <Card className="filter-card shadow">
        <Card.Body>
          <Card.Title className="filter-heading">{t("filter")}</Card.Title>
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
          <Button className="float-end" onClick={handleFilter}>
            {t("filterBtn")}
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default StudentFilter;
