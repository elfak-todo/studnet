import axios from "axios";
import { useTranslation } from "react-i18next";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
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

  const studentRef = useRef();
  const parMemberRef = useRef();
  const uniAdminRef = useRef();
  const adminRef = useRef();

  useEffect(() => {
    const url = `Student/List/${pageNum}?${queries}`;

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

  const handleSearch = useCallback(() => {
    const input = inputRef.current.value;
    const stud = studentRef.current.checked;
    const parMember = parMemberRef.current.checked;
    const uniAdmin = student.role > 1 ? uniAdminRef.current.checked : false;
    const admin = student.role > 1 ? adminRef.current.checked : false;

    inputRef.current.value = "";

    let query = "";

    if (input && input !== "") {
      query += `&q=${input}`;
    }

    if (selectedUni !== "0" && student.role === 3) {
      query += `&uniId=${selectedUni}`;
    }

    if (selectedFac !== "0" && student.role > 1) {
      query += `&parId=${selectedFac}`;
    }

    if (stud) {
      query += "&role=0";
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
  }, [selectedFac, selectedUni, setPageNum, student.role]);

  useEffect(() => {
    handleSearch();
  }, [selectedFac, selectedUni, handleSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const closeSearchLabel = () => {
    setShowSearchLabel(false);
    setShowSearchLabel(false);
    setRefresh(true);
    setSelectedUni("0");
    setSelectedFac("0");
    studentRef.current.checked = false;
    if (student.role > 1) {
      uniAdminRef.current.checked = false;
      adminRef.current.checked = false;
    }
    parMemberRef.current.checked = false;
  };

  return (
    <div className="mt-2 mb-2 student-search">
      {student.role > 1 && (
        <div className="student-filter-div">
          {student.role === 3 && (
            <SelectUniversity
              selectedUni={selectedUni}
              setSelectedUni={setSelectedUni}
              invalid={uniInvalid}
              setInvalid={setUniInvalid}
              selectDisabled={searchDisabled}
            />
          )}
          <SelectFaculty
            selectedUni={
              student.role === 2 ? student.universityId : selectedUni
            }
            selectedFac={selectedFac}
            setSelectedFac={setSelectedFac}
            invalid={facInvalid}
            setInvalid={setFacInvalid}
            selectDisabled={searchDisabled}
          />
        </div>
      )}
      <Form className="d-flex" noValidate onSubmit={handleSubmit}>
        <div style={{ width: "100%" }}>
          <div>
            <Form.Check className="mb-2">
              <Form.Check.Input
                disabled={searchDisabled}
                type="checkbox"
                ref={studentRef}
                id="ss-student"
                onChange={() => {
                  parMemberRef.current.checked = false;
                  if (student.role > 1) {
                    uniAdminRef.current.checked = false;
                    adminRef.current.checked = false;
                  }
                  handleSearch();
                }}
              />
              <Form.Check.Label htmlFor="ss-student">Student</Form.Check.Label>
            </Form.Check>
            <Form.Check className="mb-2">
              <Form.Check.Input
                disabled={searchDisabled}
                type="checkbox"
                ref={parMemberRef}
                id="ss-parlament-member"
                onChange={() => {
                  if (student.role > 1) {
                    uniAdminRef.current.checked = false;
                    adminRef.current.checked = false;
                  }
                  studentRef.current.checked = false;
                  handleSearch();
                }}
              />
              <Form.Check.Label htmlFor="ss-parlament-member">
                {t("admin:parlamentMember")}
              </Form.Check.Label>
            </Form.Check>
            {student.role > 1 && (
              <>
                <Form.Check className="mb-2">
                  <Form.Check.Input
                    disabled={searchDisabled}
                    type="checkbox"
                    ref={uniAdminRef}
                    id="ss-uni-admin"
                    onChange={() => {
                      parMemberRef.current.checked = false;
                      adminRef.current.checked = false;
                      studentRef.current.checked = false;
                      handleSearch();
                    }}
                  />
                  <Form.Check.Label htmlFor="ss-uni-admin">
                    {t("admin:uniAdmin")}
                  </Form.Check.Label>
                </Form.Check>
                <Form.Check className="mb-2">
                  <Form.Check.Input
                    disabled={searchDisabled}
                    type="checkbox"
                    ref={adminRef}
                    id="ss-admin"
                    onChange={() => {
                      parMemberRef.current.checked = false;
                      uniAdminRef.current.checked = false;
                      studentRef.current.checked = false;
                      handleSearch();
                    }}
                  />
                  <Form.Check.Label htmlFor="ss-admin">
                    {t("admin:admin")}
                  </Form.Check.Label>
                </Form.Check>
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
