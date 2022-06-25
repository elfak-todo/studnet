import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { Form, FormControl, Button, Alert, Spinner } from "react-bootstrap";

import SelectUniversity from "../../selectUniveristy/SelectUniveristy";
import SelectFaculty from "../../selectFaculty/SelectFaculty";
import "./StudentSearch.style.css";
import axios from "axios";

function StudentSearch({ setStudents }) {
  const { t } = useTranslation(["misc"]);

  const [loading /*setLoading*/] = useState(false);
  const [searchInput /*setSearchInput*/] = useState();
  const [showSearchLabel, setShowSearchLabel] = useState(false);
  const [selectedUni, setSelectedUni] = useState("0");
  const [selectedFac, setSelectedFac] = useState("0");
  const [uniInvalid, setUniInvalid] = useState(false);
  const [facInvalid, setFacInvalid] = useState(false);

  const inputRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    const input = inputRef.current.value;

    inputRef.current.value = "";

    console.log(selectedUni);
    console.log(selectedFac);
    console.log(input);

    //TODO PAGINACIJA
    const page = 0;

    let url = `Student/List/${page}?adminMode=true`;

    if (input && input !== "") {
      url += `&q=${input}`;
    }

    if (selectedUni !== "0") {
      url += `&uniId=${selectedUni}`;
    }
    if (selectedFac !== "0") {
      url += `&parId=${selectedFac}`;
    }

    axios.get(url).then((res) => {
      setStudents(res.data);
    });
  };

  const closeSearchLabel = () => {
    setShowSearchLabel(false);
  };

  return (
    <div className="mt-2 mb-2 student-search">
      <div className="student-filter-div">
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
      </div>
      <Form className="d-flex" noValidate onSubmit={handleSearch}>
        <FormControl
          type="search"
          placeholder={t("searchPlaceholder")}
          aria-label="Search"
          ref={inputRef}
        />
        <Button type="submit" className="ms-3">
          {loading && (
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
          {t("search")}
        </Button>
      </Form>
      <div>
        <hr />
        <Alert
          show={showSearchLabel}
          variant="primary"
          dismissible
          transition
          onClose={closeSearchLabel}
        >
          {`${t("searchRes")} ${searchInput}`}
        </Alert>
      </div>
    </div>
  );
}

export default StudentSearch;
