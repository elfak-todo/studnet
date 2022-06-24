import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { Form, FormControl, Button, Alert, Spinner } from "react-bootstrap";

import SelectUniversity from "../../selectUniveristy/SelectUniveristy";
import SelectFaculty from "../../selectFaculty/SelectFaculty";
import "./StudentSearch.style.css";

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

    if (input === "") return;
    inputRef.current.value = "";

    //TODO
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
