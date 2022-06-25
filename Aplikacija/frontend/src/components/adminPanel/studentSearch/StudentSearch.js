import axios from "axios";
import { useTranslation } from "react-i18next";
import { useContext, useEffect, useRef, useState } from "react";
import { Form, FormControl, Button, Alert } from "react-bootstrap";

import SelectUniversity from "../../selectUniveristy/SelectUniveristy";
import SelectFaculty from "../../selectFaculty/SelectFaculty";
import StudentContext from "../../studentManager/StudentManager";

import "./StudentSearch.style.css";

function StudentSearch({
  setStudents,
  pageNum,
  setPageNum,
  setHasMore,
  setFetching,
  searchDisabled,
}) {
  const { t } = useTranslation(["misc", "admin"]);

  const { student } = useContext(StudentContext);

  const [refresh, setRefresh] = useState(false);
  const [searchInput, setSearchInput] = useState();
  const [showSearchLabel, setShowSearchLabel] = useState(false);
  const [queries, setQueries] = useState("");

  const [selectedUni, setSelectedUni] = useState("0");
  const [selectedFac, setSelectedFac] = useState("0");
  const [uniInvalid, setUniInvalid] = useState(false);
  const [facInvalid, setFacInvalid] = useState(false);

  const inputRef = useRef();
  const parMemberRef = useRef();
  const uniAdminRef = useRef();
  const adminRef = useRef();

  useEffect(() => {
    const url =
      student.role === 1
        ? `Student/List/${pageNum}?adminMode=false${queries}`
        : `Student/List/${pageNum}?adminMode=true${queries}`;

    if (refresh) {
      setRefresh(false);
      setStudents(null);
      setPageNum(0);
      setQueries("");
    }

    setFetching(true);
    axios
      .get(url)
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
    student.role,
  ]);

  const handleSearch = (e) => {
    e.preventDefault();
    const input = inputRef.current.value;
    const parMember = parMemberRef.current.checked;
    const uniAdmin = student.role === 3 ? uniAdminRef.current.checked : false;
    const admin = student.role === 3 ? adminRef.current.checked : false;

    inputRef.current.value = "";

    let query = "";

    if (input && input !== "") {
      query += `&q=${input}`;
    }

    if (selectedUni !== "0" && student.role === 3) {
      query += `&uniId=${selectedUni}`;
    }
    if (selectedFac !== "0" && student.role === 3) {
      query += `&parId=${selectedFac}`;
    }

    if (parMember) {
      if (student.role === 1) {
        query += `&isPMember=${parMember}`;
      } else {
        query += "&role=1";
      }
    }

    if (uniAdmin) {
      query += "&role=2";
    }

    if (admin) {
      query += "&role=3";
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
    parMemberRef.current.checked = false;
    if (student.role === 3) {
      uniAdminRef.current.checked = false;
      adminRef.current.checked = false;
    }
  };

  return (
    <div className="mt-2 mb-2 student-search">
      {student.role === 3 && (
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
      )}
      <Form className="d-flex" noValidate onSubmit={handleSearch}>
        <div style={{ width: "100%" }}>
          <div>
            <Form.Check
              disabled={searchDisabled}
              className="mb-2"
              type="switch"
              label={t("admin:parlamentMember")}
              ref={parMemberRef}
              onChange={() => {
                if (student.role > 1) {
                  uniAdminRef.current.checked = false;
                  adminRef.current.checked = false;
                }
              }}
            ></Form.Check>
            {student.role === 3 && (
              <>
                <Form.Check
                  disabled={searchDisabled}
                  className="mb-2"
                  type="switch"
                  label={t("admin:uniAdmin")}
                  ref={uniAdminRef}
                  onChange={() => {
                    parMemberRef.current.checked = false;
                    adminRef.current.checked = false;
                  }}
                ></Form.Check>
                <Form.Check
                  disabled={searchDisabled}
                  className="mb-2"
                  type="switch"
                  label={t("admin:admin")}
                  ref={adminRef}
                  onChange={() => {
                    parMemberRef.current.checked = false;
                    uniAdminRef.current.checked = false;
                  }}
                ></Form.Check>
              </>
            )}
          </div>
          <div
            className="d-flex justify-content-center"
            style={{ width: "100%" }}
          >
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
          </div>
        </div>
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
