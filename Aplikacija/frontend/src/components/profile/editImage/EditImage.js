import { useContext, useRef, useState } from "react";
import { Button, Form, Image, Spinner } from "react-bootstrap";
//import { useTranslation } from "react-i18next";
import { faFileArrowUp } from "@fortawesome/free-solid-svg-icons";

import defaultPic from "../../../images/defaultProfilePic.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import StudentContext from "../../studentManager/StudentManager.js";

function EditImage() {
  //const { t } = useTranslation(["misc"]);
  const { student, setStudent } = useContext(StudentContext);

  const [loading, setLoading] = useState(false);

  const imageRef = useRef();

  const uploadImage = (e) => {
    e.preventDefault();

    if (imageRef.current.files.length > 0) {
      setLoading(true);

      const image = new FormData();
      image.append("image", imageRef.current.files[0]);
      console.log(imageRef.current.files[0]);
      axios
        .put("Student/Image", image, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          console.log(res);
          setStudent((student) => {
            return { ...student, imagePath: res.data };
          });
          setLoading(false);
        });
    }
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
              accept="image/*"
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
    </div>
  );
}

export default EditImage;
