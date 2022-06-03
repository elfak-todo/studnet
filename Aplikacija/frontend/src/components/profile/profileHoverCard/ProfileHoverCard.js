import { Container, Image, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import elfak from "../../../images/elfak.jpg";
import defaultPic from "../../../images/defaultProfilePic.jpg";
import "./ProfileHoverCard.style.css";
import { useTranslation } from "react-i18next";

function ProfileHoverCard({ studentProp }) {
  const {t} = useTranslation(["profile"]);

  const navigate = useNavigate();

  return (
    <Container className="profile-hover-cont">
      <div className="parent-pic-div">
        {/* TODO */}
        <Image src={elfak} alt="faculty-pic" className="bg-picture"></Image>
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
      {/* TODO */}
      <p className="mb-1"> Univerzitet u Nišu </p>
      <p> {studentProp.facultyName} </p>
      <Button
        className="mt-3"
        size="sm"
        onClick={(e) => navigate("/student/" + studentProp.id)}
      >
        {t("moreInfo")}
      </Button>
    </Container>
  );
}

export default ProfileHoverCard;
