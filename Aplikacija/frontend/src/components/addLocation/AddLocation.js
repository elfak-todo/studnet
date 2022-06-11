import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./AddLocation.style.css";
import AddLocationForm from "./addLocationForm/AddLocationForm";
import AddLocationMap from "./addLocationMap/AddLocationMap";
import StudentContext from "../studentManager/StudentManager";
import { faClockRotateLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function AddLocation({
  initialLocation,
  redirect = true,
  displayTitle = true,
  onLocationAdded,
}) {
  const { t } = useTranslation(["locations"]);
  const navigate = useNavigate();

  const [state, setState] = useState({ edit: false });
  const [location, setLocation] = useState(null);

  const imageRef = useRef();
  const imageGalleryRef = useRef();

  const { student } = useContext(StudentContext);

  useEffect(() => {
    if (initialLocation) {
      setLocation(initialLocation);
      setState({ edit: true });
    } else {
      setLocation({
        latitude: student.universityLatitude,
        longitude: student.universityLongitude,
      });
    }
  }, [initialLocation, student]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!state.loading) {
      setState((s) => {
        return { ...s, loading: true };
      });

      const formData = new FormData();
      formData.set("location", JSON.stringify(location));
      if (imageRef.current.files.length > 0) {
        formData.set("image", imageRef.current.files[0]);
      }

      const files = imageGalleryRef.current.files;
      for (let i = 0; i < files.length; i++) {
        formData.append("imageGallery", files[i]);
      }

      if (state.edit) {
        axios
          .patch(`Location/${location.id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (redirect) {
              navigate(`/location/${res.data.id}`);
            }
          });
      } else {
        axios
          .post("Location", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (onLocationAdded) {
              onLocationAdded(res.data);
            }
            if (redirect) {
              navigate(`/location/${res.data.id}`);
            }
          });
      }
    }
  };

  const resetHandler = (e) => {
    setLocation(initialLocation);
  };

  return (
    location && (
      <Form noValidate onSubmit={submitHandler}>
        <div className="add-location-body">
          <AddLocationForm
            location={location}
            setLocation={setLocation}
            state={state}
            imageRef={imageRef}
            imageGalleryRef={imageGalleryRef}
            displayTitle={displayTitle}
          />
          <AddLocationMap
            location={location}
            setLocation={setLocation}
            state={state}
          />
        </div>
        <div className="d-flex justify-content-center mt-3 mb-3">
          {state.edit && (
            <Button
              variant="primary"
              type="button"
              size="md"
              className="me-2"
              onClick={resetHandler}
            >
              <FontAwesomeIcon icon={faClockRotateLeft} />
            </Button>
          )}

          <Button variant="primary" type="submit" size="md">
            {state.loading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            {state.edit ? t("editLocation") : t("addLocation")}
          </Button>
        </div>
      </Form>
    )
  );
}

export default AddLocation;
