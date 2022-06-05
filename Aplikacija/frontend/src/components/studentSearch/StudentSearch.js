import axios from "axios";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { Form, FormControl, Button, Alert, Spinner } from "react-bootstrap";

import "./StudentSearch.style.css";

function StudentSearch({
  setStudents,
  setRefresh,
  showSearchLabel,
  setShowSearchLabel,
}) {
  const { t } = useTranslation(["misc"]);

  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState();

  const inputRef = useRef();

  const handleSearch = (e) => {
    e.preventDefault();
    const input = inputRef.current.value;

    if (input === "") return;
    inputRef.current.value = "";

    setSearchInput(input);
    setLoading(true);
    axios
      .get(`Student/GetStudentByName/0/${input}`)
      .then((res) => {
        setStudents(res.data);
        setShowSearchLabel(true);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err.response.data);
        setLoading(false);
      });
  };

  const closeSearchLabel = () => {
    setShowSearchLabel(false);
    setRefresh(true);
  };

  return (
    <div className="p-3">
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
          className="m-2"
          onClose={closeSearchLabel}
        >
          {`${t("searchRes")} ${searchInput}`}
        </Alert>
      </div>
    </div>
  );
}

export default StudentSearch;
