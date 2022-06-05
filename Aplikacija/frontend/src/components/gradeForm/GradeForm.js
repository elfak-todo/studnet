import axios from "axios";
import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Fade,
  FormControl,
  Spinner,
} from "react-bootstrap";
import {
  faPen,
  faSave,
  faTrashCan,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Rating } from "react-simple-star-rating";
import { useTranslation } from "react-i18next";

import "./GradeForm.style.css";
import StudentContext from "../studentManager/StudentManager";
import { parseDate } from "../../helpers/DateParser";
import AuthorCard from "../authorCard/AuthorCard";

function GradeForm({ metadata }) {
  const location = metadata.location;
  const setLocation = metadata.setLocation;

  const { student } = useContext(StudentContext);

  const { t, i18n } = useTranslation(["locations, misc"]);

  const [myGrade, setMyGrade] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasGraded, setHasGraded] = useState(false);
  const [alert, setAlert] = useState(null);

  const commentTextRef = useRef();
  const [currentGrade, setCurrentGrade] = useState(0);

  useEffect(() => {
    console.log("USE EFFECT");
    if (location) {
      console.log("USE EFFECT - LOCATION TRUE");
      axios.get(`Grade/MyGrade/${location.id}`).then((res) => {
        if (res.data && res.data !== "") {
          setMyGrade(res.data);
          setCurrentGrade(res.data.value);
          setHasGraded(true);
          setEditMode(false);
        } else {
          setEditMode(true);
          setCurrentGrade(0);
          setMyGrade({ gradedLocationId: location.id });
          setHasGraded(false);
        }
      });
    }
  }, [location]);

  const onEditClicked = (e) => {
    console.log("ON EDIT CLICKED");
    if (loading) {
      return;
    }

    if (editMode) {
      if (
        commentTextRef.current.value &&
        commentTextRef.current.value !== "" &&
        currentGrade
      ) {
        setMyGrade((g) => {
          g.commentText = commentTextRef.current.value;
          g.value = currentGrade;
          return g;
        });
        putGrade();
      } else {
        setAlert({
          text: t("misc:fieldsMissing"),
          variant: "danger",
        });
      }
    } else {
      setEditMode(true);
    }
  };

  const putGrade = () => {
    console.log("PUT GRADE");
    setLoading(true);
    axios
      .put("Grade", myGrade)
      .then((res) => {
        setMyGrade(res.data.myGrade);
        setHasGraded(true);
        setEditMode(false);
        setLocation((l) => {
          return {
            ...l,
            gradeCount: res.data.gradeCount,
            averageGrade: res.data.averageGrade,
          };
        });
        setAlert({
          text: t("locations:gradingSuccessful"),
          variant: "success",
        });
      })
      .catch((err) => {
        setAlert({
          text: t("locations:gradingError"),
          variant: "danger",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onDeleteClicked = (e) => {
    console.log("ON DELETE CLICKED");
    setLoading(true);
    axios
      .delete(`Grade/${myGrade.id}`)
      .then((res) => {
        setMyGrade({ gradedLocationId: location.id });
        setHasGraded(false);
        commentTextRef.current.value = "";
        setCurrentGrade(0);
        setLocation((l) => {
          return {
            ...l,
            gradeCount: res.data.gradeCount,
            averageGrade: res.data.averageGrade,
          };
        });
        setAlert({
          text: t("locations:gradeDeleteSuccesful"),
          variant: "success",
        });
        setLoading(false);
      })
      .catch((err) => {
        setAlert({
          text: t("locations:gradeDeleteError"),
          variant: "danger",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onCancelClicked = (e) => {
    console.log("ON CANCEL CLICKED");
    setEditMode(false);
    setCurrentGrade(myGrade.value);
  };

  return (
    <div className="grade-form mb-4">
      <Card className="grade-form-card shadow-sm">
        <Card.Header className="d-flex align-items-center justify-content-between ps-3 pe-2">
          <span>{t("locations:myGrade")}</span>
          <div>
            {hasGraded && editMode && !loading && (
              <Button variant="primary" size="sm" onClick={onDeleteClicked}>
                <FontAwesomeIcon icon={faTrashCan} />
              </Button>
            )}
            <span className="mx-2"></span>
            {hasGraded && editMode && !loading && (
              <Button variant="primary" size="sm" onClick={onCancelClicked}>
                <FontAwesomeIcon icon={faX} />
              </Button>
            )}
            <span className="mx-1"></span>
            <Button variant="primary" size="sm" onClick={onEditClicked}>
              {loading ? (
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
              ) : editMode ? (
                <FontAwesomeIcon icon={faSave} />
              ) : (
                <FontAwesomeIcon icon={faPen} />
              )}
            </Button>
          </div>
        </Card.Header>
        <Card.Body className="grade-form-body">
          <AuthorCard author={student} hoverEnabled={false} clickable={false} />
          {editMode ? (
            <FormControl
              as="textarea"
              placeholder={t("locations:enterComment")}
              className="grade-form-comment gfc-input"
              defaultValue={myGrade?.commentText}
              ref={commentTextRef}
              disabled={loading}
            />
          ) : (
            <p
              className="grade-form-comment gfc-text"
              style={{ textIndent: "1rem" }}
            >
              {myGrade?.commentText}
            </p>
          )}
          <div className="me-3 d-flex align-items-center justify-content-center">
            <Rating
              transition
              readonly={!editMode}
              initialValue={currentGrade * 20}
              ratingValue={currentGrade * 20}
              showTooltip={false}
              size={36}
              onClick={(rating) => {
                setCurrentGrade(rating / 20);
              }}
            />
          </div>
        </Card.Body>
        <Card.Footer>
          {myGrade?.publicationTime && (
            <p className="m-0 text-end">
              {parseDate(myGrade.publicationTime, i18n.language)}
            </p>
          )}
        </Card.Footer>
      </Card>
      {alert && (
        <Alert
          variant={alert.variant}
          dismissible
          onClose={() => setAlert(null)}
          className="mt-3"
          transition={Fade}
        >
          {alert.text}
        </Alert>
      )}
    </div>
  );
}

export default GradeForm;
