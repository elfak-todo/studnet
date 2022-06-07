import React, { useContext, useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { useTranslation } from "react-i18next";

import "./AddLocation.style.css";
import AddLocationForm from "./addLocationForm/AddLocationForm";
import AddLocationMap from "./addLocationMap/AddLocationMap";
import StudentContext from "../studentManager/StudentManager";

function AddLocation({ initialLocation }) {
  const { t } = useTranslation(["locations"]);

  const [state, setState] = useState({ edit: false });
  const [location, setLocation] = useState(null);

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
  }, [initialLocation]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (!state.loading) {
      setState((s) => {
        return { ...s, loading: true };
      });
    }
  };

  return (
    location && (
      <Form noValidate onSubmit={submitHandler}>
        <div className="add-location-body">
          <AddLocationForm location={location} setLocation={setLocation} />
          <AddLocationMap location={location} setLocation={setLocation} />
        </div>
        <div className="d-flex justify-content-center my-3">
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
