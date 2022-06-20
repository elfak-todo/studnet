import { useContext, useRef, useState } from "react";
import { Alert, Button, Fade, Form, Image, Spinner } from "react-bootstrap";
//import { useTranslation } from "react-i18next";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";

import defaultPic from "../../../images/defaultProfilePic.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import StudentContext from "../../studentManager/StudentManager.js";
import { useTranslation } from "react-i18next";

function EditImage() {
  const { t } = useTranslation(["students"]);

  const { student, setStudent } = useContext(StudentContext);

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const imageRef = useRef();

  const uploadImage = (e) => {
    e.preventDefault();

    if (imageRef.current.files.length === 0) {
      setAlert({
        text: t("noImagesSelected"),
        variant: "danger",
      });
      return;
    }

    setLoading(true);

    const image = new FormData();
    image.append("image", imageRef.current.files[0]);
    axios
      .put("Student/Image", image, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setStudent((student) => {
          return { ...student, imagePath: res.data };
        });
      })
      .catch((err) => {
        if (err.response?.status === 400) {
          if (err.response.data === "UnsupportedFileType") {
            setAlert({
              text: t("unsupportedFileType"),
              variant: "danger",
            });
          }
        }
        return Promise.reject(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <Form noValidate onSubmit={uploadImage}>
        <div className="add-image-div">
          <Image
            fluid
            src={student.imagePath === "/" ? defaultPic : student.imagePath}
            alt="profile-pic"
            className="edit-profile-img"
            roundedCircle
          ></Image>
          <div className="d-flex flex-direction-row">
            <Form.Control
              type="file"
              accept="image/png, image/jpeg"
              size="sm"
              ref={imageRef}
            />
            <div className="center-button mx-1">
              <Button variant="primary" type="submit" size="sm">
                {loading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />
                ) : (
                  <FontAwesomeIcon icon={faFileArrowUp} />
                )}
              </Button>
            </div>
          </div>
        </div>
      </Form>
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

export default EditImage;
