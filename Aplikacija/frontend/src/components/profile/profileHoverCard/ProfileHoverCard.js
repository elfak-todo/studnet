import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useContext } from "react";
import { Container, Image, Button } from "react-bootstrap";

import defaultPic from "../../../images/defaultProfilePic.jpg";
import StudentContext from "../../studentManager/StudentManager";
import "./ProfileHoverCard.style.css";

function ProfileHoverCard({ studentProp }) {
  const { t } = useTranslation(["profile"]);

  const { student } = useContext(StudentContext);

  const navigate = useNavigate();

  return (
    <Container className="profile-hover-cont">
      <div className="parent-pic-div">
        <Image
          src={studentProp?.facultyImagePath}
          alt="faculty-pic"
          className="bg-picture"
        ></Image>
        <div className="child-pic-div">
          <Image
            src={
              studentProp?.imagePath === "/"
                ? defaultPic
                : studentProp?.imagePath
            }
            alt="profile-pic"
            className="profile-picture"
            roundedCircle
          ></Image>
        </div>
      </div>
      <h4 className="mt-5">
        {studentProp?.firstName + " " + studentProp?.lastName}
      </h4>
      <p className="mb-1"> {student.university} </p>
      <p> {studentProp.facultyName} </p>
      <Button
        className="mt-3"
        size="sm"
        onClick={() => navigate("/student/" + studentProp.id)}
      >
        {t("moreInfo")}
      </Button>
    </Container>
  );
}

export default ProfileHoverCard;
