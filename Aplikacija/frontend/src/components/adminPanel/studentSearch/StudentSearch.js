import axios from "axios";
import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { Form, FormControl, Button, Alert } from "react-bootstrap";

import SelectUniversity from "../../selectUniveristy/SelectUniveristy";
import SelectFaculty from "../../selectFaculty/SelectFaculty";
import "./StudentSearch.style.css";

function StudentSearch({
  setStudents,
  pageNum,
  setPageNum,
  setHasMore,
  setFetching,
  searchDisabled,
}) {
  const { t } = useTranslation(["misc"]);

  const [refresh, setRefresh] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const [showSearchLabel, setShowSearchLabel] = useState(false);
  const [queries, setQueries] = useState("");

  const [selectedUni, setSelectedUni] = useState("0");
  const [selectedFac, setSelectedFac] = useState("0");
  const [uniInvalid, setUniInvalid] = useState(false);
  const [facInvalid, setFacInvalid] = useState(false);

  const inputRef = useRef();

  useEffect(() => {
    if (refresh) {
      setRefresh(false);
      setStudents(null);
      setPageNum(0);
      setQueries("");
    }
    setFetching(true);
    axios
      .get(`Student/List/${pageNum}?adminMode=true${queries}`)
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
        setFetching(false);
      });
  }, [
    pageNum,
    queries,
    refresh,
    setFetching,
    setPageNum,
    setStudents,
    setHasMore,
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    const input = inputRef.current.value;

    inputRef.current.value = "";

    let query = "";

    if (input && input !== "") {
      query += `&q=${input}`;
    }

    if (selectedUni !== "0") {
      query += `&uniId=${selectedUni}`;
    }
    if (selectedFac !== "0") {
      query += `&parId=${selectedFac}`;
    }

    setQueries(query);
    setPageNum(0);
    setSearchInput(input);

    if (input !== "") setShowSearchLabel(true);
  };

  const closeSearchLabel = () => {
    setShowSearchLabel(false);
    setShowSearchLabel(false);
    setRefresh(true);
    setSelectedUni("0");
    setSelectedFac("0");
  };

  return (
    <div className="mt-2 mb-2 student-search">
      <div className="student-filter-div">
        <SelectUniversity
          selectedUni={selectedUni}
          setSelectedUni={setSelectedUni}
          invalid={uniInvalid}
          setInvalid={setUniInvalid}
          selectDisabled={searchDisabled}
        />
        <SelectFaculty
          selectedUni={selectedUni}
          selectedFac={selectedFac}
          setSelectedFac={setSelectedFac}
          invalid={facInvalid}
          setInvalid={setFacInvalid}
          selectDisabled={searchDisabled}
        />
      </div>
      <Form className="d-flex" noValidate onSubmit={handleSearch}>
        <FormControl
          type="search"
          placeholder={t("searchPlaceholder")}
          aria-label="Search"
          disabled={searchDisabled}
          ref={inputRef}
        />
        <Button type="submit" className="ms-3" disabled={searchDisabled}>
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
